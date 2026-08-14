// app/(site)/faq/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { faqCategories, faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ — Synchub Creative Week 2026",
  description:
    "Answers to common questions about tickets, sponsorship, and event logistics for Synchub Creative Week 2026.",
};

export default function FaqPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      {/* Soft green/blue ambient glow — consistent with Section 10 atmosphere guidance */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(76,175,80,0.12),transparent_60%)]"
      />

      <section className="relative mx-auto max-w-4xl px-6 pt-24 pb-8 text-center sm:pt-32">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9e9e9e]">
          Need to know
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#f5f5f5] sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#9e9e9e]">
          Everything about tickets, sponsorship, and getting to Synchub Creative Week 2026.
          Can&apos;t find your answer?{" "}
          <a href="/contact" className="text-[#f5f5f5] underline underline-offset-4">
            Contact us
          </a>
          .
        </p>
      </section>

      <section className="relative px-6 pb-24">
        {/* useSearchParams requires a Suspense boundary for the static-render path */}
        <Suspense fallback={null}>
          <FaqAccordion categories={faqCategories} items={faqItems} />
        </Suspense>
      </section>
    </main>
  );
}