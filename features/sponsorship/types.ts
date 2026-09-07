// TARGET PATH: features/sponsorship/types.ts

import { z } from "zod";
import {
  SPONSORSHIP_PAYMENT_METHODS,
} from "@/components/sections/sponsorships/schema/sponsorship-checkout-schema";

// Input to the server action — deliberately NOT the same shape as
// SponsorshipCheckoutFormValues (features/sponsorship's schema companion).
// `companyLogo` is dropped here: logo upload/storage isn't wired yet (see
// the ASSUMPTION note in sponsorship-checkout-schema.ts), so the action has
// nothing to do with a File even if one is present on the form. `tierId`
// is added because the action needs to know which tier to resolve — the
// form itself never collects it (it comes from the ?tier= URL param).
export const createSponsorshipOrderSchema = z.object({
  tierId: z.string().trim().min(1, "Missing sponsorship tier"),
  companyName: z.string().trim().min(2, "Enter your company name").max(120, "Company name is too long"),
  contactPerson: z.string().trim().min(2, "Enter a contact person").max(120, "Name is too long"),
  companyEmail: z.string().trim().email("Enter a valid email address"),
  paymentMethod: z.enum(SPONSORSHIP_PAYMENT_METHODS),
});

export type CreateSponsorshipOrderInput = z.infer<typeof createSponsorshipOrderSchema>;

// Mirrors the SponsorshipTierName Prisma enum. Kept as a local string union
// (not imported from @/lib/generated/client) so this file stays safe to
// import from "use client" hooks without pulling generated Prisma types
// into the client bundle — same convention as TicketTypeName in
// features/tickets/types.ts.
export type SponsorshipTierEnumName = "HEADLINE" | "GOLD" | "SILVER" | "COMMUNITY";

/**
 * Maps the static lib/data/sponsorship-tiers.ts `id` (e.g. "headline") to
 * the Prisma SponsorshipTierName enum value. Unlike inferTicketType, this
 * is an exact lookup, not a fuzzy keyword match — the static ids were
 * authored to correspond 1:1 with the enum, so an unknown id means the
 * ?tier= param is stale/invalid and should hard-fail rather than silently
 * fall back to a default tier.
 */
export function inferSponsorshipTierName(tierId: string): SponsorshipTierEnumName {
  switch (tierId) {
    case "headline":
      return "HEADLINE";
    case "gold":
      return "GOLD";
    case "silver":
      return "SILVER";
    case "community":
      return "COMMUNITY";
    default:
      throw new Error(`Unknown sponsorship tier id: "${tierId}"`);
  }
}

/**
 * ASSUMPTION — flagged per Deen's call: not in AGENT.md, only implied by
 * the "only one Headline slot" copy already in
 * sponsorship-checkout-sections.tsx's exclusivity notice. If that copy
 * turns out to be just marketing language rather than a real one-slot
 * rule, delete this and the guard in create-sponsorship-order.ts that
 * reads it.
 */
export const EXCLUSIVE_TIER_NAMES: readonly SponsorshipTierEnumName[] = ["HEADLINE"];