import { prisma } from "@/lib/prisma";
import type { EventDayOption } from "@/features/vendor/types";

export async function getEventDayOptions(): Promise<EventDayOption[]> {
  const days = await prisma.eventDay.findMany({
    orderBy: { date: "asc" },
    select: { id: true, title: true, date: true },
  });

  return days.map((day) => ({
    id: day.id,
    title: day.title,
    date: day.date.toISOString(),
  }));
}