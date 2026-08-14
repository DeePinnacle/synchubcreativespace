import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SponsorshipCheckoutSections } from "@/components/sections/sponsorships/sponsorship-checkout-sections";
import { getSponsorshipTier } from "@/lib/data/sponsorship-tiers";

export const metadata: Metadata = {
  title: "Sponsorship Checkout — Synchub Creative Week 2026",
  description:
    "Confirm your sponsorship tier for Synchub Creative Week 2026 and complete payment.",
};

// Server Component per Rule 2 — tier lookup happens here so an invalid or
// missing ?tier= query param 404s before any client JS loads. Rule 5: the
// selected tier stays URL-driven so /sponsorship/checkout?tier=HEADLINE is
// shareable and survives refresh, unlike the ticket cart's Zustand-only
// state. All interactivity (form state, payment method selection) is
// isolated to the "use client" leaf below.
export default async function SponsorshipCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier: tierParam } = await searchParams;
  const tier = getSponsorshipTier(tierParam);

  if (!tier) {
    notFound();
  }

  return <SponsorshipCheckoutSections tierId={tier.id} />;
}