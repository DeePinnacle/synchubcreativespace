import type { Metadata } from "next";
import { Suspense } from "react";
import { getGalleryImages } from "@/features/gallery/data/get-gallery-images";
import { GalleryExperience } from "@/features/gallery/components/Gallery-Experience";

export const metadata: Metadata = {
  title: "Gallery | Synchub Creative Centre",
  description:
    "Explore the space — real photography from Synchub Creative Centre's studios, workshops, and events in Abuja, Nigeria.",
};

// Server Component: fetches gallery data and hands it to the client-side
// bento grid / lightbox. No interactivity of its own (Rule 2).
export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="relative overflow-hidden bg-background px-6 py-24 md:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(76,175,80,0.14),rgba(30,136,229,0.1),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-primary to-secondary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Explore the space
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            Gallery
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Real photography from inside Synchub Creative Centre — the
            studios, workshops, and events that make up the 1 Million
            Creatives mission.
          </p>
        </div>

        <Suspense fallback={<GallerySkeleton />}>
          <GalleryExperience images={images} />
        </Suspense>
      </div>
    </main>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border/60 bg-card"
        />
      ))}
    </div>
  );
}