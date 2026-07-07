// Destination in the project: components/sections/event-highlights-section.tsx
// Depends on: motion/react (Framer Motion), lucide-react, next/image
// Usage: import { EventHighlightsSection } from "@/components/sections/event-highlights-section"
//        <EventHighlightsSection /> on app/(site)/page.tsx (Homepage)
//
// Notes:
// - This is a Client Component (interactivity: hover, add-to-cart state, scroll-triggered motion).
// - EVENT_DAYS below is placeholder content. No data layer is wired in yet (no useQuery, no
//   server action, no Prisma-backed type) so per Rule 1 this stays in components/sections/,
//   not features/schedule/ — move it once a real EventDay data dependency lands.
// - Card surface is intentionally white with a green-to-blue gradient border, as requested —
//   this is a deliberate accent departure from the site's default dark card surface
//   (Section 10's #121212/#1a1a1a hierarchy), scoped to just these cards. Everything else on
//   the section (the dark section background, header copy, ambient glow) is unchanged.
// - Each card now renders a real next/image when `imageUrl` is supplied. Until real event
//   photography (Section 10: "no stock photos") is available, cards fall back to a themed
//   gradient + icon placeholder so the layout never breaks on a missing asset.

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import {
  Palette,
  Briefcase,
  Clapperboard,
  Cpu,
  HeartPulse,
  Trophy,
  ArrowRight,
  ShoppingCart,
  Ticket as TicketIcon,
  Check,
  type LucideIcon,
} from "lucide-react"

// Rule 4: static ICON_MAP at module level, never inline / never inside component bodies.
const ICON_MAP: Record<string, LucideIcon> = {
  cultural: Palette,
  business: Briefcase,
  film: Clapperboard,
  tech: Cpu,
  wellness: HeartPulse,
  awards: Trophy,
}

export interface EventDayHighlight {
  slug: string
  dayLabel: string
  date: string
  title: string
  description: string
  icon: keyof typeof ICON_MAP
  imageUrl?: string
}

const EVENT_DAYS: EventDayHighlight[] = [
  {
    slug: "cultural-day",
    dayLabel: "Day 01",
    date: "Mon, Nov 23",
    title: "Cultural Day & Opening Ceremony",
    description:
      "Cultural exhibitions, art competitions, and the grand opening of Creative Week.",
    icon: "cultural",
  },
  {
    slug: "business-growth-workshop",
    dayLabel: "Day 02",
    date: "Tue, Nov 24",
    title: "Business Growth Workshop",
    description:
      "Brand clinics, fireside chats with business gurus, and media mischief workshops.",
    icon: "business",
  },
  {
    slug: "film-makers-wednesday",
    dayLabel: "Day 03",
    date: "Wed, Nov 25",
    title: "Film Makers Wednesday",
    description:
      "YouTube and Canva monetization workshops, podcast initiation, and short film showcases.",
    icon: "film",
  },
  {
    slug: "tech-innovation",
    dayLabel: "Day 04",
    date: "Thu, Nov 26",
    title: "Tech & Innovation",
    description: "Tech discussions, live demonstrations, and startup competitions.",
    icon: "tech",
  },
  {
    slug: "community-wellness",
    dayLabel: "Day 05",
    date: "Fri, Nov 27",
    title: "Community & Wellness",
    description: "Mind Spa art-therapy sessions and belt-it-out open mic nights.",
    icon: "wellness",
  },
  {
    slug: "grand-showcase-awards",
    dayLabel: "Day 06",
    date: "Sat, Nov 28",
    title: "Grand Showcase & Awards",
    description: "Awards night extravaganza and a glam runway spectacle.",
    icon: "awards",
  },
]

interface EventHighlightsSectionProps {
  days?: EventDayHighlight[]
  onAddToCart?: (slug: string) => void
  onGetTicket?: (slug: string) => void
}

export function EventHighlightsSection({
  days = EVENT_DAYS,
  onAddToCart,
  onGetTicket,
}: Readonly<EventHighlightsSectionProps>) {
  return (
    <section className="relative overflow-hidden bg-off-white py-20 sm:py-28">
      {/* Ambient glow, per Section 10 depth & atmosphere guidance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(76,175,80,0.16),rgba(30,136,229,0.12),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-secondary px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
            Nov 23 – 28, 2026 &middot; Synchub Creative Centre, Abuja
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-muted-gray sm:text-4xl">
            Synchub Creative Week 2026
          </h2>

          <p className="mt-4 text-balance text-base leading-relaxed text-muted-gray sm:text-lg">
            Six exhilarating days where art, technology, entrepreneurship, and youth
            culture collide — exhibitions, tech demos, pitch sessions, masterclasses,
            and a fashion showcase, live under one theme: Future Forward.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 flex items-center justify-center gap-3 sm:justify-start"
        >
          <span className="h-px w-8 bg-gradient-to-r from-[#4caf50] to-[#1e88e5]" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-gray">
            Event highlights by day
          </h3>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {days.map((day, index) => (
            <EventDayCard
              key={day.slug}
              day={day}
              index={index}
              onAddToCart={onAddToCart}
              onGetTicket={onGetTicket}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface EventDayCardProps {
  day: EventDayHighlight
  index: number
  onAddToCart?: (slug: string) => void
  onGetTicket?: (slug: string) => void
}

function EventDayCard({ day, index, onAddToCart, onGetTicket }: Readonly<EventDayCardProps>) {
  const [added, setAdded] = useState(false)
  const Icon = ICON_MAP[day.icon]

  function handleAddToCart() {
    setAdded(true)
    onAddToCart?.(day.slug)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl bg-gradient-to-br from-[#4caf50] to-[#1e88e5] p-[1.5px] transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(30,136,229,0.45)]"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white">
        {/* image / themed placeholder */}
        <div className="relative h-44 w-full overflow-hidden">
          {day.imageUrl ? (
            <Image
              src={day.imageUrl}
              alt={day.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 scale-100 bg-gradient-to-br from-[#173d1c] via-[#14262f] to-[#0d2338] transition-transform duration-500 ease-out group-hover:scale-110"
                aria-hidden="true"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(120% 120% at 15% 15%, rgba(76,175,80,0.28), transparent 55%), radial-gradient(120% 120% at 85% 85%, rgba(30,136,229,0.28), transparent 55%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon
                  className="h-12 w-12 text-white/25 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:text-white/35"
                  strokeWidth={1.5}
                />
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-[#e0e0e0] backdrop-blur-sm">
            {day.dayLabel}
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-[#e0e0e0] backdrop-blur-sm">
            {day.date}
          </span>
        </div>

        {/* content */}
        <div className="relative flex flex-1 flex-col p-5">
          <h4 className="text-base font-semibold leading-snug text-slate-900">
            {day.title}
          </h4>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
            {day.description}
          </p>

          <Link
            href={`/schedule/${day.slug}`}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-transparent transition-all duration-200 hover:gap-2.5"
            style={{
              backgroundImage: "linear-gradient(90deg, #4caf50, #1e88e5)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            View event details
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 text-[#1e88e5] transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>

          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${day.title} to cart`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#4caf50]" strokeWidth={2.5} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
                  Add to cart
                </>
              )}
            </button>

            <Link
              href={`/tickets?event=${day.slug}`}
              onClick={() => onGetTicket?.(day.slug)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_-4px_rgba(30,136,229,0.45)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundImage: "linear-gradient(90deg, #4caf50, #1e88e5)",
              }}
            >
              <TicketIcon className="h-3.5 w-3.5" strokeWidth={2} />
              Get ticket
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  )
}