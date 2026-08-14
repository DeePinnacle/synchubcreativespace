import type { EventIconKey } from "@/lib/icons"

/**
 * Local static data source for the six Synchub Creative Week 2026 event
 * days. This backs the homepage Event Highlights section and (once built)
 * the per-day Event Detail page at /schedule/[slug].
 *
 * TODO: this is a stand-in for the real data layer. Per AGENT.md Section 12,
 * `EventDay` needs a `slug` column added to the Prisma schema before this
 * can be swapped for a live query — at that point this file's shape should
 * map 1:1 onto the Prisma `EventDay` model (Section 6) plus the slug field,
 * and the read path moves into `features/schedule/` (Rule 1 — it becomes a
 * real data dependency at that point, no longer a static section).
 */
export interface EventDayHighlight {
  slug: string
  dayLabel: string
  date: string
  /** ISO date string (matches EventDay.date shape from Prisma) — used for the cart, `date` above stays as the display string. */
  isoDate: string
  title: string
  description: string
  icon: EventIconKey
  imageUrl?: string
  /** Per-day ticket price in Naira. TODO: placeholder — final pricing is TBD per AGENT.md Section 12. */
  price: number
  /** Longer copy for the Event Detail page (/schedule/[slug]) — the card description above stays short for the homepage grid. */
  detailedDescription: string
  /** Additional gallery images for the Event Detail page, same convention as imageUrl (filename only, resolved against `/`). TODO: placeholder paths — swap for real event photography per AGENT.md Section 10 (no stock photos). */
  moreImages: string[]
}

export const EVENT_DAYS: EventDayHighlight[] = [
  {
    slug: "cultural-day",
    dayLabel: "Day 01",
    date: "Mon, Nov 23",
    isoDate: "2026-11-23",
    title: "Cultural Day & Opening Ceremony",
    description:
      "Cultural exhibitions, art competitions, and the grand opening of Creative Week.",
    icon: "cultural",
    imageUrl: "cultural-day.jpeg",
    price: 15000,
    detailedDescription:
      "Creative Week opens with a full celebration of African creative heritage. The day kicks off with a curated exhibition of visual art, textile, and craft from artists across the continent, followed by a live art competition where creatives battle it out on canvas in real time. The Synchub Creative Centre grounds transform into a cultural showcase featuring traditional and contemporary performances, before the evening builds into the official opening ceremony — welcoming remarks from Synchub leadership, a theme reveal for 'Future Forward: Reimagining Africa's Creative Power,' and a preview of what's ahead across the six days.",
    moreImages: [
      "cultural-day.jpeg",
      "cultural-day-2.jpeg",
      "cultural-day-3.jpeg",
      "dancing-2.jpeg",
    ],
  },
  {
    slug: "business-growth-workshop",
    dayLabel: "Day 02",
    date: "Tue, Nov 24",
    isoDate: "2026-11-24",
    title: "Business Growth Workshop",
    description:
      "Brand clinics, fireside chats with business gurus, and media mischief workshops.",
    icon: "business",
    imageUrl: "business-talk.jpeg",
    price: 15000,
    detailedDescription:
      "Day two is built for creatives who want to run their craft like a business. Brand clinics pair attendees with experienced consultants for one-on-one feedback on positioning, pricing, and pitching. Fireside chats bring in established entrepreneurs and business leaders from Nigeria's creative economy to talk candidly about scaling from passion project to sustainable enterprise. The day closes with hands-on 'media mischief' workshops covering content strategy, personal branding, and getting noticed online — practical sessions designed to leave attendees with a plan, not just inspiration.",
    moreImages: [
      "business-talk.jpeg",
      "mr-sensei.jpeg",
      "Gallery-13.jpeg",
    ],
  },
  {
    slug: "film-makers-wednesday",
    dayLabel: "Day 03",
    date: "Wed, Nov 25",
    isoDate: "2026-11-25",
    title: "Film Makers Wednesday",
    description:
      "YouTube and Canva monetization workshops, podcast initiation, and short film showcases.",
    icon: "film",
    imageUrl: "film.jpeg",
    price: 15000,
    detailedDescription:
      "Film Makers Wednesday is dedicated to the storytellers — filmmakers, video editors, podcasters, and content creators. The day opens with monetization-focused workshops on YouTube and Canva, breaking down how to turn a channel or content practice into real income. A dedicated podcast initiation track walks first-time podcasters through setup, format, and distribution. The day builds to a short film showcase, screening work from emerging Nigerian and pan-African filmmakers, followed by a Q&A with the directors on their creative process and the business of independent filmmaking.",
    moreImages: [
      "space.jpeg",
      "Gallery-5.jpeg",
      "Gallery-12.jpeg",
    ],
  },
  {
    slug: "tech-innovation",
    dayLabel: "Day 04",
    date: "Thu, Nov 26",
    isoDate: "2026-11-26",
    title: "Tech & Innovation",
    description: "Tech discussions, live demonstrations, and startup competitions.",
    icon: "tech",
    imageUrl: "tech.jpeg",
    price: 15000,
    detailedDescription:
      "Tech & Innovation Day puts the spotlight on where creativity and technology intersect. Panel discussions bring together founders, engineers, and product builders to talk about AI's growing role in creative work, from generative tools to automated workflows. Live demonstrations give startups and tech-driven creative studios floor space to showcase what they've built. The day closes with a pitch competition, where early-stage founders present to a panel of judges and investors for a shot at funding, mentorship, and visibility within the Synchub ecosystem.",
    moreImages: [
      "Gallery-3.jpeg",
      "Gallery-4.jpeg",
      "Gallery-6.jpeg",
    ],
  },
  {
    slug: "community-wellness",
    dayLabel: "Day 05",
    date: "Fri, Nov 27",
    isoDate: "2026-11-27",
    title: "Community & Wellness",
    description: "Mind Spa art-therapy sessions and belt-it-out open mic nights.",
    icon: "wellness",
    imageUrl: "community.jpeg",
    price: 15000,
    detailedDescription:
      "Community & Wellness Day is a deliberate pause in the middle of a packed week — a reminder that sustainable creative careers need sustainable creatives. Mind Spa sessions use guided art therapy to help attendees process stress and reconnect with why they create, run by licensed practitioners in a calm, low-pressure setting. As the sun goes down, the mood shifts into the belt-it-out open mic night, an unfiltered stage for poets, singers, and spoken word artists to share their work in front of a supportive crowd — equal parts community-building and celebration.",
    moreImages: [
      "community.jpeg",
      "film.jpeg",
      "Gallery-12.jpeg",
    ],
  },
  {
    slug: "grand-showcase-awards",
    dayLabel: "Day 06",
    date: "Sat, Nov 28",
    isoDate: "2026-11-28",
    title: "Grand Showcase & Awards",
    description: "Awards night extravaganza and a glam runway spectacle.",
    icon: "awards",
    imageUrl: "award.jpeg",
    price: 25000,
    detailedDescription:
      "Creative Week closes with its biggest night — the Grand Showcase & Awards. The evening opens with a glam runway spectacle featuring emerging and established Nigerian fashion designers, styled and produced as a full production, not just a walk. From there the night moves into the awards extravaganza, recognizing standout creatives, businesses, and collaborators from across the week's programming and the wider Synchub 'One Million Creatives' community. Expect a red-carpet atmosphere, live performances, and a closing address setting the tone for the year ahead.",
    moreImages: [
      "award.jpeg",
      "Gallery-1.jpeg",
      "Gallery-7.jpeg",
      "Gallery-6.jpeg",
    ],
  },
]

/** Convenience lookup for the Event Detail page (/schedule/[slug]). */
export function getEventDayBySlug(slug: string): EventDayHighlight | undefined {
  return EVENT_DAYS.find((day) => day.slug === slug)
}