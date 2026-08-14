import Link from "next/link"
import { ICON_MAP } from "@/lib/icons"
import type { EventDayHighlight } from "@/lib/data/events"

interface EventDayPaginationProps {
  previous: EventDayHighlight
  next: EventDayHighlight
}

export function EventDayPagination({ previous, next }: Readonly<EventDayPaginationProps>) {
  const PrevIcon = ICON_MAP.chevronLeft
  const NextIcon = ICON_MAP.chevronRight

  return (
    <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-8 sm:grid-cols-2">
      <Link
        href={`/events/details/${previous.slug}`}
        className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
      >
        <PrevIcon
          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-x-0.5"
          strokeWidth={2}
        />
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Previous — {previous.dayLabel}
          </p>
          <p className="truncate text-sm font-semibold text-slate-900">{previous.title}</p>
        </div>
      </Link>

      <Link
        href={`/events/details/${next.slug}`}
        className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 text-right transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
      >
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Next — {next.dayLabel}
          </p>
          <p className="truncate text-sm font-semibold text-slate-900">{next.title}</p>
        </div>
        <NextIcon
          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </Link>
    </div>
  )
}