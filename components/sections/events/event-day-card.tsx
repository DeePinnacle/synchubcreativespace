"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import {
  ArrowRight,
  ShoppingCart,
  Ticket as TicketIcon,
  Check,
} from "lucide-react"
import { useCartStore } from "@/lib/stores/cart-store"
import { ICON_MAP } from "@/lib/icons"
import { toCartDay } from "@/lib/stores/cart-utils"
import type { EventDayHighlight } from "@/lib/data/events"
import { Button } from "@/components/ui/button"

export interface EventDayCardProps {
  day: EventDayHighlight
  index: number
  onAddToCart?: (slug: string) => void
  onGetTicket?: (slug: string) => void
}

export function EventDayCard({ day, index, onAddToCart, onGetTicket }: Readonly<EventDayCardProps>) {
  const [added, setAdded] = useState(false)
  const Icon = ICON_MAP[day.icon]
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  function handleAddToCart() {
    addItem({
      day: toCartDay(day.dayLabel),
      date: day.isoDate,
      title: day.title,
      price: day.price,
    })

    setAdded(true)
    onAddToCart?.(day.slug)
    window.setTimeout(() => setAdded(false), 1800)
  }

  function handleGetTicket() {
    addItem({
      day: toCartDay(day.dayLabel),
      date: day.isoDate,
      title: day.title,
      price: day.price,
    })

    onGetTicket?.(day.slug)
    router.push("/events/checkout")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl bg-linear-to-br from-primary to-secondary p-[1.5px] transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(30,136,229,0.45)]"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white">
        {/* image / themed placeholder */}
        <div className="relative h-52 w-full overflow-hidden">
          {day.imageUrl ? (
            <Image
              src={`/${day.imageUrl}`}
              alt={day.title}
              fill
              priority
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 scale-100 bg-linear-to-br from-[#173d1c] via-[#14262f] to-[#0d2338] transition-transform duration-500 ease-out group-hover:scale-110"
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

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

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
            href={`/events/details/${day.slug}`}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-transparent transition-all duration-200 hover:gap-2.5"
            style={{
              backgroundImage: "linear-gradient(90deg, #4caf50, #1e88e5)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            View event details
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>

          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
            <Button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${day.title} to cart`}
              className="h-12 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
                  Add to cart
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleGetTicket}
              aria-label={`Buy ticket for ${day.title} now`}
              className="h-12 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_-4px_rgba(30,136,229,0.45)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundImage: "linear-gradient(90deg, #4caf50, #1e88e5)",
              }}
            >
              <TicketIcon className="h-3.5 w-3.5" strokeWidth={2} />
              Get ticket
            </Button>
          </div>
        </div>
      </article>
    </motion.div>
  )
}