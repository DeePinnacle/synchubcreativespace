"use server";

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/client";
import { sendRegistrationNotification } from "@/lib/email/send-registration-notiications";
import {
  registrationSchema,
  type RegistrationInput,
  type RegistrationResult,
} from "../types";

type Source = Prisma.RegistrationCreateInput["heardFrom"];

export async function createRegistration(
  input: RegistrationInput,
): Promise<RegistrationResult> {
  // 1. Honeypot — pretend success so bots learn nothing, but log it for us.
  if (input.hpContactRef && input.hpContactRef.trim().length > 0) {
    console.warn("Registration honeypot tripped, nothing saved");
    return { ok: true, data: { name: "", days: [], updated: false } };
  }

  // 2. Validation
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and try again." };
  }
  const { name, email, phone, heardFrom, accessibilityNeeds } = parsed.data;
  const dayIds = [...new Set(parsed.data.dayIds)];

  // 3. Rate limit (5 per 10 min per IP), same window as the contact form
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "rl:registration",
  });
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return { ok: false, error: "Too many attempts. Please try again in a few minutes." };
  }

  // 4. Every selected day must be a real EventDay
  const days = await prisma.eventDay.findMany({
    where: { id: { in: dayIds } },
    orderBy: { date: "asc" },
  });
  if (days.length !== dayIds.length) {
    return { ok: false, error: "One of the selected days is no longer available." };
  }

  // 5. Save. Same email re-registering updates their days instead of duplicating.
  const existing = await prisma.registration.findUnique({
    where: { email },
    select: { id: true },
  });
  const connect = days.map((d) => ({ id: d.id }));
  const data = {
    name,
    phone,
    heardFrom: heardFrom as Source,
    accessibilityNeeds: accessibilityNeeds || null,
  };

  await prisma.registration.upsert({
    where: { email },
    create: { ...data, email, days: { connect } },
    update: { ...data, days: { set: connect } },
  });

  // 6. Notify Synchub. A failed email never fails the registration — it's already saved.
  try {
    await sendRegistrationNotification({
      name,
      email,
      phone,
      heardFrom,
      accessibilityNeeds,
      days: days.map((d) => ({ title: d.title, date: d.date })),
      updated: Boolean(existing),
    });
  } catch (err) {
    console.error("Registration notification email failed:", err);
  }

  return {
    ok: true,
    data: {
      name,
      updated: Boolean(existing),
      days: days.map((d) => ({
        id: d.id,
        title: d.title,
        date: d.date.toISOString(),
      })),
    },
  };
}