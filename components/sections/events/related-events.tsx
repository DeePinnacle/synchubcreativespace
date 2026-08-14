import { EVENT_DAYS } from "@/lib/data/events"
import { EventDayCard } from "@/components/sections/events/event-day-card"

interface RelatedEventsProps {
  currentSlug: string
  limit?: number
}

export function RelatedEvents({ currentSlug, limit = 3 }: Readonly<RelatedEventsProps>) {
  const others = EVENT_DAYS.filter((day) => day.slug !== currentSlug).slice(0, limit)

  if (others.length === 0) return null

  return (
    <section className="border-t border-slate-100 pt-14">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-linear-to-r from-primary to-secondary" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-gray">
          More events this week
        </h3>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((day, index) => (
          <EventDayCard key={day.slug} day={day} index={index} />
        ))}
      </div>
    </section>
  )
}