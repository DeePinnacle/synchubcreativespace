import Image from "next/image";
import { ICON_MAP } from "../icons";
import { SITE_CONFIG } from "../site-config";
import { EventCountdown } from "./event-countdown";
import { HeroCta } from "./hero-cta";
import { HeroReveal, HeroRevealItem } from "./hero-reveal";

export function HeroSection() {
  const CalendarIcon = ICON_MAP.calendar;
  const MapPinIcon = ICON_MAP.mapPin;

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-primary-dark">
      <Image
        src="/hero-img.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/90 via-black/60 to-black/85"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <HeroReveal>
          <HeroRevealItem>
            <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-medium text-neutral-200 backdrop-blur-sm">
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon size={15} className="text-primary" />
                {SITE_CONFIG.dateLabel}
              </span>
              <span aria-hidden="true" className="text-white/20">
                |
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon size={15} className="text-secondary" />
                {SITE_CONFIG.venue}
              </span>
            </div>
          </HeroRevealItem>

          <HeroRevealItem>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-7xl">
              Future Forward: Reimagining Africa&apos;s{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Creative Power
              </span>
            </h1>
          </HeroRevealItem>

          <HeroRevealItem>
            <p className="mx-auto mt-6 max-w-2xl font-sora text-base leading-relaxed text-neutral-300 sm:text-lg">
              A six-day journey at the Synchub Creative Centre, empowering 1
              million creatives to shape Africa&apos;s future.
            </p>
          </HeroRevealItem>

          <HeroRevealItem>
            <div className="mt-8">
              <HeroCta />
            </div>
          </HeroRevealItem>

          <HeroRevealItem>
            <div className="mt-14 flex flex-col items-center gap-4">
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-xs font-bold uppercase tracking-[0.15em] text-transparent">
                Doors open in
              </span>
              <EventCountdown targetDate={SITE_CONFIG.startDate} />
            </div>
          </HeroRevealItem>
        </HeroReveal>
      </div>
    </section>
  );
}