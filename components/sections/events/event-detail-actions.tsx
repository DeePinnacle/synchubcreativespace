"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Ticket as TicketIcon, Check } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { toCartDay } from "@/lib/stores/cart-utils";
import type { EventDayHighlight } from "@/lib/data/events";
import { useRouter } from "next/navigation"

interface EventDetailActionsProps {
  day: EventDayHighlight;
}

export function EventDetailActions({ day }: Readonly<EventDetailActionsProps>) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter()

  function handleAddToCart() {
    addItem({
      day: toCartDay(day.dayLabel),
      date: day.isoDate,
      title: day.title,
      price: day.price,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleGetTicket() {
    addItem({
      day: toCartDay(day.dayLabel),
      date: day.isoDate,
      title: day.title,
      price: day.price,
    });
    router.push("/events/checkout");
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleGetTicket}
        aria-label={`Buy ticket for ${day.title} now`}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_-4px_rgba(30,136,229,0.45)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          backgroundImage: "linear-gradient(90deg, #4caf50, #1e88e5)",
        }}
      >
        <TicketIcon className="h-3.5 w-3.5" strokeWidth={2} />
        Get ticket
      </button>

      <button
        type="button"
        onClick={handleAddToCart}
        aria-label={`Add ${day.title} to cart`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
      >
        {added ? (
          <>
            <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            Add to cart
          </>
        )}
      </button>
    </div>
  );
}
