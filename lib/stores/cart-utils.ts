import type { EventDay } from "@/lib/stores/cart-store"

/**
 * Converts "Day 01" / "Day 1" -> the cart store's "Day 1"–"Day 6" literal
 * type. Extracted out of Event-Highlight.tsx so it has one home now that
 * it's shared between the homepage event card and the Event Detail page's
 * hero actions.
 */
export function toCartDay(dayLabel: string): EventDay {
  const match = dayLabel.match(/\d+/)
  const num = match ? Number(match[0]) : 1
  return `Day ${num}` as EventDay
}