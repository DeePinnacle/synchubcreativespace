import Link from "next/link";
import { ICON_MAP } from "@/lib/icons";
import { GalleryGrid } from "./Gallery-Grid";

export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-muted-gray py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.12)_0%,rgba(30,136,229,0.08)_45%,transparent_75%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-start gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent">
              Explore the Space
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#f5f5f5] md:text-5xl">
              Six Days, Captured
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[#9e9e9e] md:text-base">
              A glimpse inside the Synchub Creative Centre — where culture,
              business, film, tech, wellness, and celebration share one stage.
            </p>
          </div>

          <Link
            href="/gallery"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-[#f5f5f5] transition-colors hover:border-transparent hover:bg-gradient-to-r hover:from-[#4caf50] hover:to-[#1e88e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50]"
          >
            View Full Gallery
            <ICON_MAP.arrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <GalleryGrid />
      </div>
    </section>
  );
}