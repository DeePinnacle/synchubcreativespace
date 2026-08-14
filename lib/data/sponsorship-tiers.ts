import { Award, Building2, ShieldCheck, Users, type LucideIcon } from "lucide-react";

// Static sponsorship tier content — not Prisma-backed. Per AGENT.md, static/
// non-Prisma data lives in lib/data/, not features/. Prisma's
// SponsorshipTier model (Section 6) is the source of truth for
// tierId/amount/paymentStatus once orders exist; this file is the
// presentation-layer content (copy, icon, color) shared by the tier card
// grid and the checkout page. Keep `id` values in sync wherever a tier is
// referenced by string (e.g. the ?tier= checkout query param).
export interface SponsorshipTier {
  id: string;
  name: string;
  priceNGN: string;
  priceUSD: string;
  tagline: string;
  icon: LucideIcon;
  color: string;
  benefits: string[];
  detailedDescription: string;
}

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    id: "headline",
    name: "Headline Partner",
    priceNGN: "₦10,000,000",
    priceUSD: "$7,320",
    tagline: "Ultimate brand ownership and top-tier ecosystem influence.",
    icon: ShieldCheck,
    color: "#4caf50",
    benefits: [
      "Category exclusivity and top-tier visibility",
      "Headline logo placement across all media platforms",
      "Full activation booth for all 6 days of the event",
      "Keynote speaking slot during the Grand Showcase & Awards",
      "10 VIP access passes with full executive benefits",
      "Custom targeted influencer campaign and PR distribution",
    ],
    detailedDescription:
      "As the Headline Partner, your brand becomes synonymous with Synchub Creative Week 2026. This tier offers unprecedented brand alignment, category exclusivity, and massive media real estate across all pre-event, live, and post-event touchpoints. Work directly with our production team to craft a custom influencer and media strategy that maximizes your organization's ROI.",
  },
  {
    id: "gold",
    name: "Gold Partner",
    priceNGN: "₦5,000,000",
    priceUSD: "$3,660",
    tagline: "High-impact industry positioning and session integration.",
    icon: Award,
    color: "#1e88e5",
    benefits: [
      "Co-branded sessions, panels, or workshop tracks",
      "Premium booth access for 4 high-traffic days",
      "Dedicated press mentions and media highlights",
      "6 VIP access passes with networking lounge access",
      "Strategic social media campaign integration",
    ],
    detailedDescription:
      "The Gold Partnership is built for organizations looking to position themselves as key thought leaders. You will have the unique opportunity to co-curate specific panel tracks or workshops matching your industry focus, establishing direct engagement with Abuja's top creative tech talent and decision makers.",
  },
  {
    id: "silver",
    name: "Silver Partner",
    priceNGN: "₦3,000,000",
    priceUSD: "$1,869",
    tagline: "Excellent brand presence and physical footprint.",
    icon: Building2,
    color: "#a855f7",
    benefits: [
      "Shared brand visibility across physical & digital collateral",
      "Dedicated exhibition booth for 2 key event days",
      "3 VIP event passes for your core executive team",
      "Official acknowledgment in event communications",
    ],
    detailedDescription:
      "Silver Partners gain a solid, tangible presence throughout the 6-day summit. With an exhibition booth on high-traffic days, your team can interact directly with hundreds of prospective clients, hires, and creative collaborators.",
  },
  {
    id: "community",
    name: "Community Supporter",
    priceNGN: "₦1,000,000",
    priceUSD: "$732",
    tagline: "Grassroots support for Africa's emerging creative powerhouse.",
    icon: Users,
    color: "#06b6d4",
    benefits: [
      "Logo placement on digital flyers and marketing assets",
      "Official brand mention in post-event video website ecosystem",
      "Exclusive invitation to the private Sponsor Mixer event",
    ],
    detailedDescription:
      "Perfect for fast-growing startups, creative agencies, and regional brands looking to support the '1 Million Creatives' mission. This tier gives you clean digital visibility and vital networking access during our high-level closed-door networking sessions.",
  },
];

export function getSponsorshipTier(id: string | undefined): SponsorshipTier | undefined {
  return SPONSORSHIP_TIERS.find((tier) => tier.id === id);
}