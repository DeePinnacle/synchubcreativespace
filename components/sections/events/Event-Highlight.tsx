"use client"

import { motion } from "motion/react"
import { EVENT_DAYS, type EventDayHighlight } from "@/lib/data/events"
import { EventDayCard } from "@/components/sections/events/event-day-card"

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
    <section id="events" className="relative overflow-hidden bg-off-white py-20 sm:py-28">
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
          <span className="h-px w-8 bg-linear-to-r from-primary to-secondary" />
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