import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { EVENT_DAYS, getEventDayBySlug } from "@/lib/data/events"
import { ICON_MAP } from "@/lib/icons"
import { EventDetailActions } from "@/components/sections/events/event-detail-actions"
import { EventGallery } from "@/components/sections/events/event-gallery"
import { EventDayPagination } from "@/components/sections/events/event-day-pagination"
import { RelatedEvents } from "@/components/sections/events/related-events"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>
}

// Static list of six days — safe to pre-render all of them at build time.
export function generateStaticParams() {
  return EVENT_DAYS.map((day) => ({ slug: day.slug }))
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const day = getEventDayBySlug(slug)

  if (!day) return {}

  return {
    title: `${day.title} — Synchub Creative Week 2026`,
    description: day.description,
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const day = getEventDayBySlug(slug)

  if (!day) {
    notFound()
  }

  const index = EVENT_DAYS.findIndex((d) => d.slug === slug)
  // Wraps around at the ends (Day 6 -> Day 1) so the pagination is always
  // usable for browsing the full week in either direction.
  const previous = EVENT_DAYS[(index - 1 + EVENT_DAYS.length) % EVENT_DAYS.length]
  const next = EVENT_DAYS[(index + 1) % EVENT_DAYS.length]

  const BackIcon = ICON_MAP.chevronLeft

  return (
    <div className="bg-off-white">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[340px] w-full overflow-hidden sm:h-[55vh]">
        {day.imageUrl ? (
          <Image
            src={`/${day.imageUrl}`}
            alt={day.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#173d1c] via-[#14262f] to-[#0d2338]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <BackIcon className="h-4 w-4" strokeWidth={2} />
            Back to schedule
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {day.dayLabel}
            </span>
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {day.date}
            </span>
          </div>

          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {day.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {day.detailedDescription || day.description}
            </p>
            <Link
  href="/event-registration"
  className="group relative my-5 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-6 text-base font-semibold text-white shadow-lg shadow-[#1e88e5]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#4caf50]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]"
>
  {/* light sweep on hover */}
  <span
    aria-hidden
    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
  />
  <span className="relative">Register for Event</span>
  <ArrowRight className="relative size-5 transition-transform duration-300 group-hover:translate-x-1" />
</Link>
            {day.moreImages.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-gray">
                  Gallery
                </h2>
                <div className="mt-4">
                  <EventGallery images={day.moreImages} alt={day.title} />
                </div>
              </div>
            )}
          </div>

          {/* <aside className="lg:col-span-1">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              {/* <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Ticket price
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                ₦{day.price.toLocaleString()}
              </p>

              <div className="mt-5">
                <EventDetailActions day={day} />
              </div> */}
              
            {/* </div> */}
          {/* </aside>  */}
        </div>

        <div className="mt-16">
          <EventDayPagination previous={previous} next={next} />
        </div>

        <div className="mt-16">
          <RelatedEvents currentSlug={day.slug} />
        </div>
      </div>
    </div>
  )
}