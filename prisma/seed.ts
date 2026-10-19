// TARGET PATH: prisma/seed.ts
//
// Seeds SponsorshipTier rows (so create-sponsorship-order.ts has tiers to
// resolve) and the six EventDay rows (so /event-registration has days to show).
//
// SponsorshipTier: upsert-by-name via findFirst, since SponsorshipTier.name has
// no @unique in schema.prisma. Re-run to keep amounts/benefits in sync.
// EventDay: create-if-missing by date. Existing rows are never overwritten,
// so titles you edit later in the DB survive a re-seed.
//
// Run with: npx tsx prisma/seed.ts
//
// A standalone tsx script does NOT auto-load .env, so `dotenv/config` below
// must stay at the very top (npm install -D dotenv if missing).
import "dotenv/config";

import { PrismaClient, type SponsorshipTierName } from "../lib/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type TierSeed = {
  name: SponsorshipTierName;
  amount: number | null;
  benefits: string | null;
};

const TIERS: TierSeed[] = [
  {
    name: "HEADLINE",
    amount: 10_000_000,
    benefits:
      "Category exclusivity and top-tier visibility; headline logo placement across all media platforms; full activation booth for all 6 days; keynote speaking slot during the Grand Showcase & Awards; 10 VIP access passes; custom targeted influencer campaign and PR distribution.",
  },
  {
    name: "GOLD",
    amount: 5_000_000,
    benefits:
      "Co-branded sessions, panels, or workshop tracks; premium booth access for 4 high-traffic days; dedicated press mentions and media highlights; 6 VIP access passes with networking lounge access; strategic social media campaign integration.",
  },
  {
    name: "SILVER",
    amount: 3_000_000,
    benefits:
      "Shared brand visibility across physical & digital collateral; dedicated exhibition booth for 2 key event days; 3 VIP event passes; official acknowledgment in event communications.",
  },
  {
    name: "COMMUNITY",
    amount: 1_000_000,
    benefits:
      "Logo placement on digital flyers and marketing assets; official brand mention in post-event video/website ecosystem; exclusive invitation to the private Sponsor Mixer event.",
  },
  {
    // Inert for now — SponsorshipOrder.tierId is a required FK, so a CUSTOM
    // tier row must exist before the custom-package flow can create orders.
    name: "CUSTOM",
    amount: null,
    benefits: "Bespoke package — negotiated directly with the Synchub partnerships team.",
  },
];

// Stored at midday UTC so the date reads correctly in any timezone.
const EVENT_DAYS = [
  { date: "2026-11-23T12:00:00Z", title: "Cultural Day" },
  { date: "2026-11-24T12:00:00Z", title: "Business Growth" },
  { date: "2026-11-25T12:00:00Z", title: "Film Makers Wednesday" },
  { date: "2026-11-26T12:00:00Z", title: "Tech & Innovation" },
  { date: "2026-11-27T12:00:00Z", title: "Community & Wellness" },
  { date: "2026-11-28T12:00:00Z", title: "Grand Showcase & Awards" },
];

async function seedTiers() {
  for (const tier of TIERS) {
    const existing = await prisma.sponsorshipTier.findFirst({ where: { name: tier.name } });

    if (existing) {
      await prisma.sponsorshipTier.update({
        where: { id: existing.id },
        data: { amount: tier.amount, benefits: tier.benefits },
      });
      console.log(`Updated tier ${tier.name}`);
    } else {
      await prisma.sponsorshipTier.create({
        data: { name: tier.name, amount: tier.amount, benefits: tier.benefits },
      });
      console.log(`Created tier ${tier.name}`);
    }
  }
}

async function seedEventDays() {
  for (const day of EVENT_DAYS) {
    const date = new Date(day.date);
    const existing = await prisma.eventDay.findFirst({ where: { date } });

    if (existing) {
      console.log(`Skipped day (exists): ${day.title}`);
      continue;
    }
    await prisma.eventDay.create({ data: { date, title: day.title } });
    console.log(`Created day: ${day.title}`);
  }
}

async function main() {
  await seedTiers();
  await seedEventDays();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });