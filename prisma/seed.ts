// TARGET PATH: prisma/seed.ts
//
// Seeds SponsorshipTier rows so features/sponsorship/actions/create-sponsorship-order.ts
// has something to resolve — that action throws rather than inventing a
// tier row on the fly (see its comments), so this needs to run before the
// sponsorship checkout path works end-to-end.
//
// Amounts match lib/data/sponsorship-tiers.ts's priceNGN exactly (parsed
// down to a plain number, no currency formatting). If that file's pricing
// ever changes, re-run this seed to keep the DB in sync — it's an
// upsert-by-name, not a one-time insert.
//
// NOTE: SponsorshipTierName has no @unique constraint on SponsorshipTier.name
// in schema.prisma, so this can't use a real Prisma `upsert` (which needs a
// unique `where`). Same limitation as the Sponsor.email lookup in
// create-sponsorship-order.ts — this does findFirst-then-create/update
// instead. Worth adding `@unique` to SponsorshipTier.name in a future
// migration; then this file (and that Sponsor lookup) could be simplified.
//
// Run with: npx tsx prisma/seed.ts
// (or wire into package.json: "prisma": { "seed": "tsx prisma/seed.ts" })
//
// IMPORTANT: unlike `next dev`, a standalone script run via `tsx` does NOT
// auto-load your .env file — so DATABASE_URL is undefined unless something
// loads it first. The import right below (`dotenv/config`) does that. If
// you see ECONNREFUSED when running this, it means .env didn't load —
// confirm `dotenv` is installed (`npm install -D dotenv`) and that this
// import stays at the very top of the file, before anything else runs.
import "dotenv/config";

import { PrismaClient, type SponsorshipTierName } from "../lib/generated/client";
import  { PrismaPg } from "@prisma/adapter-pg"


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type TierSeed = {
  name: SponsorshipTierName;
  amount: number | null;
  benefits: string | null;
};

// benefits here is a flattened reference copy for admin/reporting use only
// (schema field is a plain String, not an array) — lib/data/sponsorship-tiers.ts
// remains the actual source of truth for what renders on the tier cards and
// checkout page.
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
    // Inert for now — the "Request a Custom Package" flow (AGENT.md Section
    // 7, sponsorship step 2/4) isn't built yet, but SponsorshipOrder.tierId
    // is a required FK, so a CUSTOM tier row needs to exist before that
    // flow can create any orders. Safe to seed ahead of time.
    name: "CUSTOM",
    amount: null,
    benefits: "Bespoke package — negotiated directly with the Synchub partnerships team.",
  },
];

async function main() {
  for (const tier of TIERS) {
    const existing = await prisma.sponsorshipTier.findFirst({ where: { name: tier.name } });

    if (existing) {
      await prisma.sponsorshipTier.update({
        where: { id: existing.id },
        data: { amount: tier.amount, benefits: tier.benefits },
      });
      console.log(`Updated ${tier.name}`);
    } else {
      await prisma.sponsorshipTier.create({
        data: { name: tier.name, amount: tier.amount, benefits: tier.benefits },
      });
      console.log(`Created ${tier.name}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });