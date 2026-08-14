import Image from "next/image"
import type { CommunityEvent } from "@/lib/data/community"
import { Reveal } from "./reveal"

export function UpcomingTimeline({ events }: { events: CommunityEvent[] }) {
  return (
    <div className="relative mt-9 pl-8">
      <div
        className="absolute bottom-1.5 left-1.5 top-1.5 w-px opacity-35"
        style={{ background: "linear-gradient(180deg, #4caf50, #1e88e5)" }}
      />
      {events.map((event, i) => (
        <Reveal
          key={event.id}
          delay={i * 0.05}
          className="relative pb-8 last:pb-0"
        >
          <span
            className={
              "absolute -left-8 top-0.5 h-3.5 w-3.5 rounded-full border-2 bg-background " +
              (i === 0
                ? "border-[#4caf50] shadow-[0_0_0_5px_rgba(76,175,80,0.18)]"
                : "border-[#1e88e5]")
            }
          />
          <div className="flex flex-wrap items-start gap-4">
            <div className="h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={event.image}
                alt={event.title}
                width={88}
                height={88}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-[200px] flex-1">
              <p
                className={
                  "mb-1 font-mono" +
                  (event.status === "tba"
                    ? "text-[#e0b04c]"
                    : "text-muted-gray")
                }
              >
                {event.dateLabel}
              </p>
              <p className="mb-1.5 text-base font-semibold text-foreground">
                {event.time}
              </p>
              <p className="mb-1.5 text-base font-semibold text-foreground">
                {event.title}
              </p>
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