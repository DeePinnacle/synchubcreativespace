import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { RegistrationForm } from "@/features/event-registration/components/registration-form";

export const metadata: Metadata = {
  title: "Register — Synchub Creative Week 2026",
  description: "Reserve your free place at Synchub Creative Week, 23–28 November 2026, Abuja.",
};

export const dynamic = "force-dynamic";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const { days: daysParam } = await searchParams;

  const eventDays = await prisma.eventDay.findMany({ orderBy: { date: "asc" } });
  const days = eventDays.map((d) => ({
    id: d.id,
    title: d.title,
    date: d.date.toISOString(),
  }));

  // ?days=1,3 preselects Day 1 and Day 3 (by position), so schedule pages can deep-link here.
  const defaultDayIds = (daysParam ?? "")
    .split(",")
    .map((n) => days[Number(n) - 1]?.id)
    .filter((id): id is string => Boolean(id));

  return (
    <main className="relative bg-[#0a0a0a] mx-auto my-4 max-w-4xl px-5 py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-80 max-w-xl rounded-full bg-gradient-to-r from-[#4caf50]/20 to-[#1e88e5]/20 blur-3xl"
      />
      <p className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text font-mono text-xs uppercase tracking-[0.14em] text-transparent">
        Nov 23–28, 2026 · Abuja
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-[#f5f5f5] sm:text-5xl">
        Reserve your place
      </h1>
      <p className="mb-8 mt-3 text-[#9e9e9e]">
        Free to attend. Pick the days you&apos;ll be there and we&apos;ll take it from there.
      </p>

      {days.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-[#121212] p-6 text-[#9e9e9e]">
          Registration opens soon. Please check back shortly.
        </p>
      ) : (
        <RegistrationForm days={days} defaultDayIds={defaultDayIds} />
      )}
    </main>
  );
}