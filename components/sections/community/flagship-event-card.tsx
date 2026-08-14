import Image from "next/image"
import Link from "next/link"
import type { CommunityEvent } from "@/lib/data/community"

export function FlagshipEventCard({ event }: { event: CommunityEvent }) {
  return (
    <div className="relative mb-7 grid overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:grid-cols-[1.1fr_1fr]">
      <div className="relative h-[550px] md:min-h-70">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card" />
      </div>
      <div className="flex flex-col justify-center p-7 md:p-10">
        <span className="mb-4 w-max rounded-full border border-[#4caf50]/25 bg-[#4caf50]/10 px-3 py-1.5 font-mono tracking-wide text-[#8fd992]">
          ★ {event.tag}
        </span>
        <h3 className="mb-2.5 text-2xl font-bold tracking-tight text-muted-gray">
          {event.title}
        </h3>
        <div className="mb-3.5 font-mono text-muted-gray">
          {event.dateLabel}
        </div>
        <p className="mb-5 leading-relaxed text-muted-gray">
          {event.description}
        </p>
        <Link
          href="/events"
          className="inline-flex w-max items-center gap-2 rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-5 py-2.5 text-sm font-semibold text-[#08110a] transition-transform hover:-translate-y-0.5"
        >
          Get tickets
        </Link>
      </div>
    </div>
  )
}