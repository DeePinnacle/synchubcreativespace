import Image from "next/image"
import type { CommunityEvent } from "@/lib/data/community"
import { Reveal } from "./reveal"

export function PastEventsGrid({ events }: { events: CommunityEvent[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, i) => (
        <Reveal key={event.id} delay={i * 0.04}>
          <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/20">
            <div className="relative h-[280px]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/60" />
              <span className="absolute bottom-2.5 left-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[11px] text-foreground backdrop-blur-sm">
                {event.tag}
              </span>
            </div>
            <div className="p-4 pb-5">
              <div
                className={
                  "mb-1.5 font-mono" +
                  (event.status === "tba"
                    ? "text-[#e0b04c]"
                    : "text-muted-foreground")
                }
              >
                {event.dateLabel}
              </div>
              <h4 className="mb-2 font-semibold text-muted-gray">
                {event.title}
              </h4>
              <p className="leading-relaxed text-muted-gray">
                {event.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}