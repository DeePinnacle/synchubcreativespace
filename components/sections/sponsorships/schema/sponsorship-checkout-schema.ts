import { z } from "zod";

// Mirrors the PaymentMethod enum (Section 6) minus INVOICE — sponsorship
// checkout is direct-payment only for all four tiers per current scope, same
// as tickets. This is the source of truth for valid payment method ids;
// sponsorship-checkout-sections.tsx's PAYMENT_METHODS (UI list with
// label/icon) is checked against it via `satisfies` so the two can't drift.
export const SPONSORSHIP_PAYMENT_METHODS = ["CARD", "BANK_TRANSFER", "USSD"] as const;

const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

// Mirrors the Sponsor model fields this form collects (Section 6):
// companyName, contactPerson, email, logoUrl. companyLogo is kept optional
// for now — ASSUMPTION: not blocking checkout on a logo upload since the
// backend upload/storage isn't wired yet either. Flip to required once
// features/sponsorship/actions/create-sponsorship-order.ts exists, if a logo
// should be mandatory before payment.
export const sponsorshipCheckoutSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Enter your company name")
    .max(120, "Company name is too long"),
  contactPerson: z
    .string()
    .trim()
    .min(2, "Enter a contact person")
    .max(120, "Name is too long"),
  companyEmail: z
    .string()
    .trim()
    .email("Enter a valid email address"),
  companyLogo: z
    .custom<FileList | undefined>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_LOGO_SIZE_BYTES,
      "Logo must be under 5MB",
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_LOGO_TYPES.includes(files[0].type),
      "Logo must be a PNG, JPG, or SVG file",
    ),
  paymentMethod: z.enum(SPONSORSHIP_PAYMENT_METHODS),
});

export type SponsorshipCheckoutFormValues = z.infer<typeof sponsorshipCheckoutSchema>;