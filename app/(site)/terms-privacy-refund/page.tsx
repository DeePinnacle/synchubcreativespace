// app/(site)/terms-privacy-refund/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { LegalTabs } from "@/components/sections/legal-tabs";
import { legalPolicies } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms, Privacy & Refund Policy — Synchub Creative Week 2026",
  description:
    "Terms of service, privacy policy, and refund policy for Synchub Creative Week 2026.",
};

export default function TermsPrivacyRefundPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(30,136,229,0.10),transparent_60%)]"
      />

      <section className="relative mx-auto max-w-3xl px-6 pt-24 pb-12 text-center sm:pt-32">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9e9e9e]">
          Legal
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#f5f5f5] sm:text-5xl">
          Terms, Privacy &amp; Refund Policy
        </h1>
      </section>

      <section className="relative px-6 pb-24">
        <Suspense fallback={null}>
          <LegalTabs policies={legalPolicies} />
        </Suspense>
      </section>
    </main>
  );
}