"use client";

import { useCountdown } from "../hooks/use-countdown";

interface EventCountdownProps {
  targetDate: string;
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

export function EventCountdown({ targetDate }: EventCountdownProps) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div
      className="flex items-center gap-2.5 sm:gap-4"
      role="timer"
      aria-live="polite"
      aria-label="Countdown to Synchub Creative Week 2026"
    >
      {UNITS.map((unit, i) => {
        const value = timeLeft ? timeLeft[unit.key] : 0;
        return (
          <div key={unit.key} className="flex items-center gap-2.5 sm:gap-4">
            <div className="flex flex-col items-center">
              <span className="w-14 rounded-xl border border-white/10 bg-[#141414] py-2.5 text-center text-xl font-bold tabular-nums text-white shadow-[0_0_20px_-8px_rgba(30,136,229,0.35)] sm:w-[72px] sm:py-3 sm:text-3xl">
                {String(value).padStart(2, "0")}
              </span>
              <span className="mt-1.5 text-white text-[10px] font-semibold uppercase tracking-wider text-transparent sm:text-[11px]">
                {unit.label}
              </span>
            </div>
            {i < UNITS.length - 1 && (
              <span
                aria-hidden="true"
                className="pb-5 text-base font-semibold text-white/25 sm:text-xl"
              >
                :
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}