"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { contactFormRateLimit } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email/send-contact-notification";
import {
  contactFormSchema,
  INQUIRY_TYPE_TO_ENUM,
  type SubmitContactPayload,
  type SubmitContactResult,
} from "@/features/contact/types";

export async function submitContactMessage(
  input: SubmitContactPayload
): Promise<SubmitContactResult> {
  // Honeypot: real users never see or fill this field. If it's populated,
  // pretend success so bots don't learn to work around the check.
  if (input.honeypot) {
    return { ok: true };
  }

  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details and try again." };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const { success: withinLimit } = await contactFormRateLimit.limit(ip);
  if (!withinLimit) {
    return {
      ok: false,
      error: "Too many messages sent recently. Please try again in a few minutes.",
    };
  }

  const { name, email, message, inquiryType } = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        inquiryType: INQUIRY_TYPE_TO_ENUM[inquiryType],
      },
    });
  } catch (error) {
    console.error("[contact] failed to save message", error);
    return { ok: false, error: "Something went wrong on our end. Please try again." };
  }

  try {
    await sendContactNotification({ name, email, message, inquiryType });
  } catch (error) {
    // The message is already saved — don't fail the user's submission
    // just because the notification email didn't go out.
    console.error("[contact] failed to send notification email", error);
  }

  return { ok: true };
}