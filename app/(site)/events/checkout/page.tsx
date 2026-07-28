import type { Metadata } from "next";
import { CheckoutSections } from "@/components/sections/Checkout-Sections";

export const metadata: Metadata = {
  title: "Checkout — Synchub Creative Week 2026",
  description:
    "Review your selected tickets for Synchub Creative Week 2026 and complete your purchase.",
};

// Server Component per Rule 2 — all interactivity (cart reads, form state)
// is isolated to the "use client" leaf below.
export default function CheckoutPage() {
  return <CheckoutSections />;
}