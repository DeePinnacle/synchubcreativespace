// TARGET PATH: app/(site)/sponsorship/success/page.tsx
//
// Section 7, Sponsorship flow, step 4 callback destination — this is the
// callbackUrl passed to Paystack in create-sponsorship-order.ts
// (`${appUrl}/sponsorship/success?reference={orderId}`).
//
// Rule 2 / Rule 6: pure Server Component, no client JS. This page only
// DISPLAYS whatever SponsorshipOrder.paymentStatus currently is — it never
// writes to it. The actual PAID transition only ever happens in
// app/api/webhooks/paystack/route.ts once Paystack's signature is verified.
// If the person lands here before the webhook has landed (common with bank
// transfer/USSD, which aren't instant), they'll see the "processing" state
// below rather than a false confirmation — that's intentional, not a bug.
//
// Rule 10: white-background page, matching the checkout page it follows —
// needs the same Section 13 changelog entry already owed for
// sponsorship/checkout.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Sponsorship Payment Status — Synchub Creative Week 2026",
};

export default async function SponsorshipSuccessPage({
  searchParams,
}: {
  // Honest about the real shape here: a duplicated query param (which is
  // exactly what happens below) parses as string[], not string, regardless
  // of what a narrower type might promise.
  searchParams: Promise<{ reference?: string | string[] }>;
}) {
  const { reference: rawReference } = await searchParams;

  // Paystack's hosted checkout appends its own `?reference=...&trxref=...`
  // onto whatever callbackUrl we gave it — and since our callbackUrl in
  // create-sponsorship-order.ts already had `?reference=<orderId>` baked
  // in, the final redirect URL ends up with `reference` appearing twice
  // (both copies identical, since we used the order id as the Paystack
  // reference too). Next.js parses a repeated query param as an array, so
  // this collapses it back to a single string before it ever reaches
  // Prisma.
  const reference = Array.isArray(rawReference) ? rawReference[0] : rawReference;

  if (!reference) {
    notFound();
  }

  // `reference` is the SponsorshipOrder id — see the `reference: order.id`
  // line in create-sponsorship-order.ts's initializeTransaction call.
  const order = await prisma.sponsorshipOrder.findUnique({
    where: { id: reference },
    include: { tier: true, sponsor: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-white">
      <GradientBackdrop />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <StatusIcon status={order.paymentStatus} />

        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {statusHeading(order.paymentStatus)}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {statusMessage(order.paymentStatus, order.tier.name)}
        </p>

        <div className="mt-8 w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-left text-sm">
          <Row label="Company" value={order.sponsor.companyName} />
          <Row label="Tier" value={order.tier.name} />
          <Row label="Reference" value={order.id} mono />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sponsorship"
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Back to sponsorship packages
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-linear-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Contact the team
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatusIcon({ status }: { status: "PENDING" | "PAID" | "FAILED" | "REFUNDED" }) {
  if (status === "PAID") {
    return (
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
      </span>
    );
  }
  if (status === "FAILED") {
    return (
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
        <XCircle className="h-8 w-8" strokeWidth={2} />
      </span>
    );
  }
  // PENDING and REFUNDED both read as "not currently confirmed" here —
  // REFUNDED is not a realistic state to land on immediately after
  // checkout, but the union type includes it, so it's handled rather than
  // left to fall through silently.
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
      <Clock3 className="h-8 w-8" strokeWidth={2} />
    </span>
  );
}

function statusHeading(status: "PENDING" | "PAID" | "FAILED" | "REFUNDED") {
  switch (status) {
    case "PAID":
      return "Sponsorship confirmed";
    case "FAILED":
      return "Payment didn't go through";
    default:
      return "Confirming your payment…";
  }
}

function statusMessage(status: "PENDING" | "PAID" | "FAILED" | "REFUNDED", tierName: string) {
  switch (status) {
    case "PAID":
      return `Thank you for partnering with us as a ${tierName} sponsor. A confirmation email is on its way, and your logo will appear on the Partners Wall shortly.`;
    case "FAILED":
      return "We couldn't confirm this payment. No sponsorship has been created — you can head back and try again, or reach out if you think this is a mistake.";
    default:
      return "This can take a few minutes, especially for bank transfer or USSD payments. Refresh this page shortly, or check back later — we'll email you as soon as it's confirmed.";
  }
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-slate-500">{label}</span>
      <span className={mono ? "truncate font-mono text-xs text-slate-700" : "font-medium text-slate-900"}>
        {value}
      </span>
    </div>
  );
}

function GradientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(76,175,80,0.14),rgba(30,136,229,0.10),transparent)] blur-3xl" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[360px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(30,136,229,0.10),transparent)] blur-3xl" />
    </div>
  );
}