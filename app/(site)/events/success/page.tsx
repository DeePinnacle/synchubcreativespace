// TARGET PATH: app/(site)/tickets/success/page.tsx
// (placed under app/tickets/success here only because I don't have your
// (site) route group locally — move it into the group when you drop it in)

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock3 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Order Confirmation — Synchub Creative Week 2026",
};

// Server Component per Rule 2. Section 8 verification rule: this page shows
// an on-screen "processing/confirmed" state only — it reads whatever the
// webhook has already written to the DB and never itself flips any record
// to PAID. New page, so it follows Rule 10's dark canvas by default (unlike
// the existing white-background checkout page it follows on from).
export default async function TicketSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string | string[] }>;
}) {
const { reference: rawReference } = await searchParams;

const reference = Array.isArray(rawReference)
  ? rawReference[0]
  : rawReference;

const order = reference
  ? await prisma.ticketOrder.findUnique({
      where: { id: reference },
    })
  : null;

  const isPaid = order?.paymentStatus === "PAID";

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-[#121212] p-8 text-center shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]">
        {isPaid ? (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary">
              <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={1.75} />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-off-white">
              You&apos;re all set!
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-gray">
              Your payment was successful. We&apos;ll send your e-tickets to{" "}
              <span className="text-off-white">{order?.buyerEmail}</span> shortly.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Clock3 className="h-7 w-7 text-muted-gray" strokeWidth={1.75} />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-off-white">
              Processing your payment
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-gray">
              This can take a few seconds. Refresh this page shortly — it
              will update automatically once we&apos;ve confirmed your
              payment.
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}