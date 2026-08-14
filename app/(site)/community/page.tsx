import type { Metadata } from "next"
import {
  flagshipEvent,
  upcomingEvents,
  pastEvents,
  sortByDateAsc,
  sortByDateDesc,
} from "@/lib/data/community"
import { CommunityHero } from "@/components/sections/community/community-hero"
import { FlagshipEventCard } from "@/components/sections/community/flagship-event-card"
import { UpcomingTimeline } from "@/components/sections/community/upcoming-timeline"
import { PastEventsGrid } from "@/components/sections/community/past-events-grid"
import { WhatsAppCta } from "@/components/sections/community/whatsapp-cta"
import TeamSection from "@/components/sections/Team-section"
// TODO: import the existing Meet the Team section once its file path is confirmed.
// import { TeamSection } from "@/components/sections/team-section"

export const metadata: Metadata = {
  title: "Community | Synchub Creative Week 2026",
  description:
    "Workshops, mixers, and open sessions that keep Abuja's creative community connected between Synchub Creative Week festivals.",
}

export default function CommunityPage() {
  const sortedUpcoming = sortByDateAsc(upcomingEvents)
  const sortedPast = sortByDateDesc(pastEvents)

  return (
    <>
      <CommunityHero />

      <section id="upcoming" className="py-20">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-[#4caf50]">
                On the calendar
              </span>
              <h2 className="mb-2 text-2xl text-muted-gray font-semibold tracking-tight text-foreground md:text-3xl">
                Upcoming events
              </h2>
              <p className="max-w-[440px] text-muted-gray">
                Starting with the nearest date. Creative Week is the
                flagship, everything else keeps the community warm in
                between.
              </p>
            </div>
          </div>

          <FlagshipEventCard event={flagshipEvent} />
          <UpcomingTimeline events={sortedUpcoming} />
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-6">
        <div className="my-11 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5]" />
            Today
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <section className="py-20">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-10">
            <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-[#4caf50]">
              Where we&apos;ve been
            </span>
            <h2 className="mb-2 text-4xl font-semibold tracking-tight text-foreground md:text-3xl">
              Past events
            </h2>
            <p className="max-w-[440px] text-muted-foreground">
              Most recent first. A running log of the community&apos;s year.
            </p>
          </div>
          <PastEventsGrid events={sortedPast} />
        </div>
      </section>
    <TeamSection />
      <WhatsAppCta />
    </>
  )
}