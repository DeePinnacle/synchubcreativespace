import { z } from "zod";

export const INQUIRY_TYPES = ["General", "Sponsorship", "Press", "Tickets"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

// Maps the UI-facing labels above to the Prisma `ContactInquiryType` enum values.
export const INQUIRY_TYPE_TO_ENUM = {
  General: "GENERAL",
  Sponsorship: "SPONSORSHIP",
  Press: "PRESS",
  Tickets: "TICKETS",
} as const satisfies Record<InquiryType, string>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100, "That name looks too long."),
  email: z.email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (min. 10 characters).")
    .max(2000, "Keep it under 2000 characters."),
  inquiryType: z.enum(INQUIRY_TYPES),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Sent alongside the validated form values — never validated by the resolver
// on the client, only checked server-side in the action.
export type SubmitContactPayload = ContactFormValues & { honeypot?: string };

export type SubmitContactResult = { ok: true } | { ok: false; error: string };