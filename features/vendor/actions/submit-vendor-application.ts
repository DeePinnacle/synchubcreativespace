"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { vendorApplicationRateLimit } from "@/lib/rate-limit";
import { sendVendorNotification } from "@/lib/email/send-vendor-notification";
import {
  vendorFormSchema,
  VENDOR_CATEGORIES,
  VENDOR_EVENT_YEAR,
  VENDOR_INTERESTS,
  type SubmitVendorPayload,
  type SubmitVendorResult,
} from "@/features/vendor/types";

const ALREADY_APPLIED_MESSAGE =
  "You've already applied with this email for Creative Week 2026. We'll be in touch by email.";

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

export async function submitVendorApplication(
  input: SubmitVendorPayload
): Promise<SubmitVendorResult> {
  // Honeypot: real users never see or fill this field. If it's populated,
  // pretend success so bots don't learn to work around the check.
  if (input.honeypot) {
    return { ok: true };
  }

  const parsed = vendorFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Please check your details and try again.",
    };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const { success: withinLimit } = await vendorApplicationRateLimit.limit(ip);
  if (!withinLimit) {
    return {
      ok: false,
      error: "Too many applications sent recently. Please try again in a few minutes.",
    };
  }

  const { businessName, contactName, phone, email, category, description, website, interests, days } =
    parsed.data;
  const dayIds = [...new Set(days)];

  let savedDays: { title: string; date: Date }[];

  try {
    const existing = await prisma.vendorApplication.findUnique({
      where: { email_eventYear: { email, eventYear: VENDOR_EVENT_YEAR } },
      select: { id: true },
    });
    if (existing) {
      return { ok: false, error: ALREADY_APPLIED_MESSAGE };
    }

    const validDays = await prisma.eventDay.count({ where: { id: { in: dayIds } } });
    if (validDays !== dayIds.length) {
      return {
        ok: false,
        error: "One of the selected days is no longer available. Refresh the page and try again.",
      };
    }

    const application = await prisma.vendorApplication.create({
      data: {
        businessName,
        contactName,
        phone,
        email,
        category,
        description,
        website: website || null,
        interests: [...new Set(interests)],
        eventYear: VENDOR_EVENT_YEAR,
        days: { connect: dayIds.map((id) => ({ id })) },
      },
      include: {
        days: { orderBy: { date: "asc" }, select: { title: true, date: true } },
      },
    });
    savedDays = application.days;
  } catch (error) {
    // Two submissions racing past the findUnique check above.
    if (isUniqueViolation(error)) {
      return { ok: false, error: ALREADY_APPLIED_MESSAGE };
    }
    console.error("[vendor] failed to save application", error);
    return { ok: false, error: "Something went wrong on our end. Please try again." };
  }

  try {
    await sendVendorNotification({
      businessName,
      contactName,
      email,
      phone,
      category: VENDOR_CATEGORIES.find((c) => c.value === category)?.label ?? category,
      description,
      website: website || null,
      interests: interests.map((i) => VENDOR_INTERESTS.find((o) => o.value === i)?.label ?? i),
      days: savedDays,
    });
  } catch (error) {
    // The application is already saved — don't fail the user's submission
    // just because the notification email didn't go out.
    console.error("[vendor] failed to send notification email", error);
  }

  return { ok: true };
}