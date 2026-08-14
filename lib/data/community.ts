// lib/data/community-events.ts
//
// Static placeholder data for the Community page (past/upcoming events).
// No `CommunityEvent` Prisma model exists yet — flagged as a schema gap in
// AGENT.md Section 12 Open Items, same category as VendorApplication.
// Per the "static data lives in lib/data/" convention (same treatment as
// lib/data/sponsorship-tiers.ts), this stays static until a real data layer
// is needed — at that point it moves into features/community/ per Rule 1.

export type CommunityEventStatus = "confirmed" | "tba"

export interface CommunityEvent {
  id: string
  title: string
  /** ISO date string, or null when status is "tba" */
  date: string | null
  dateLabel: string
  /** Display time, e.g. "6:00 PM". "TBA" when not yet confirmed. */
  time: string
  status: CommunityEventStatus
  tag: string
  description: string
  /** Path under /public — swap placeholders for real event photography before launch */
  image: string
}

export const flagshipEvent: CommunityEvent = {
  id: "creative-week-2026",
  title: "Synchub Creative Week 2026",
  date: "2026-11-23",
  dateLabel: "Nov 23–28, 2026 · Synchub Creative Centre, Abuja",
  // TODO: confirm daily opening time — six-day programme, doors time may vary by day
  time: "TBA",
  status: "confirmed",
  tag: "Flagship event",
  description:
    "Six days under one theme — Future Forward: Reimagining Africa's Creative Power. The week the whole community builds toward.",
  image: "/creativeweek.png",
}

export const upcomingEvents: CommunityEvent[] = [
  {
    id: "ai-made-me-do-it",
    title: "AI Made Me Do It",
    date: "2026-08-18",
    dateLabel: "Aug 18, 2026",
    time: "2:00pm - 6:00pm",
    status: "confirmed",
    tag: "Talk",
    description:
      "An honest look at how Nigerian creatives are actually using AI tools in their process — no hype, just the workflow.",
    image: "/Ai-made-me.webp",
  },
  {
    id: "gospel-open-mic",
    title: "Gospel Open Mic",
    date: null,
    dateLabel: "Date TBA · 2026",
    time: "TBA",
    status: "tba",
    tag: "Performance",
    description:
      "An open floor for gospel artists, spoken word, and worship-inspired performance.",
    image: "/gospel.jpeg",
  },
  {
    id: "art-therapy-next",
    title: "Art Therapy — next session",
    date: null,
    dateLabel: "Date TBA · 2026",
    time: "3:00pm - 6:00pm",
    status: "tba",
    tag: "Wellness",
    description:
      "The Art Therapy circle returns. Open session, all materials provided, no experience needed.",
    image: "/art-therapy.jpeg",
  },
]

export const pastEvents: CommunityEvent[] = [
  {
    id: "international-youth-day-2026",
    title: "International Youth Day",
    // TODO: confirm date — none was supplied, Aug 12 used as placeholder (official IYD date)
    date: "2026-08-12",
    dateLabel: "Aug 12, 2026",
    time: "TBA",
    status: "confirmed",
    tag: "Showcase",
    description:
      "Young creatives across Abuja showcased original work and traded ideas on where the industry goes next.",
    image: "/international-youth-day.jpeg",
  },
  {
    id: "art-therapy-jul-2026",
    title: "Art Therapy",
    date: "2026-07-25",
    dateLabel: "Jul 25, 2026",
    time: "TBA",
    status: "confirmed",
    tag: "Wellness",
    description:
      "A guided session using paint and movement to process stress — no art experience required.",
    image: "/art-therapy.jpeg",
  },
  {
    id: "founders-friday-2026",
    title: "Founders Friday",
    date: "2026-05-29",
    dateLabel: "May 29, 2026",
    time: "TBA",
    status: "confirmed",
    tag: "Founders",
    description:
      "Early-stage creative entrepreneurs pitched, workshopped, and traded notes over informal mentorship.",
    image: "/founder-friday.jpeg",
  },
  {
    id: "art-therapy-may-2026",
    title: "Art Therapy",
    date: "2026-05-23",
    dateLabel: "May 23, 2026",
    time: "TBA",
    status: "confirmed",
    tag: "Wellness",
    description:
      "The first Art Therapy circle — a small group session exploring colour as a stress outlet.",
    image: "/art-therapy.jpeg",
  },
  {
    id: "creators-workshop-2026",
    title: "Creators Workshop",
    date: "2026-05-02",
    dateLabel: "May 2, 2026",
    time: "TBA",
    status: "confirmed",
    tag: "Workshop",
    description:
      "A hands-on session on turning a creative hobby into a sustainable practice.",
    image: "/creators_workshop.jpeg",
  },
  {
    id: "creative-mixer-2026",
    title: "Creative Mixer 2026",
    date: null,
    dateLabel: "Date TBA",
    time: "TBA",
    status: "tba",
    tag: "Mixer",
    description:
      "An evening of unstructured networking for creatives, founders, and collaborators across disciplines.",
    image: "/creators_mixer.jpeg",
  },
]

// Sorted for display: nearest-first for upcoming, most-recent-first for past.
// Events with a null date (TBA) sort after dated ones within their list.
export function sortByDateAsc(events: CommunityEvent[]): CommunityEvent[] {
  return [...events].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

export function sortByDateDesc(events: CommunityEvent[]): CommunityEvent[] {
  return [...events].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}