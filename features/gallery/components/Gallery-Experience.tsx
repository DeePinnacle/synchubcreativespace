"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  PenTool,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  GALLERY_CATEGORIES,
  type GalleryCategoryFilter,
  type GalleryImageDTO,
} from "../types";

// Module-level icon map, per Rule 4 — never redefined inline.
const ICON_MAP = {
  all: LayoutGrid,
  venue: Building2,
  workshops: PenTool,
  events: Calendar,
  community: Users,
  close: X,
  prev: ChevronLeft,
  next: ChevronRight,
} satisfies Record<string, LucideIcon>;

const CATEGORY_LABELS: Record<GalleryCategoryFilter, string> = {
  all: "All",
  venue: "Venue",
  workshops: "Workshops",
  events: "Events",
  community: "Community",
};

// Cycled bento span pattern. Applied at every breakpoint (not gated to
// lg:) so the grid shows real variety on tablet/mobile too, not just on
// wide desktop viewports.
const BENTO_PATTERN = [
  "col-span-2 row-span-2", // feature
  "col-span-1 row-span-1",
  "col-span-1 row-span-2", // tall
  "col-span-1 row-span-1",
  "col-span-2 row-span-1", // wide
  "col-span-1 row-span-1",
] as const;

export function GalleryExperience({ images }: { images: GalleryImageDTO[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const activeCategory = (searchParams.get("category") ??
    "all") as GalleryCategoryFilter;
  const activePhotoId = searchParams.get("photo");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? images
        : images.filter((img) => img.category === activeCategory),
    [images, activeCategory],
  );

  const activeIndex = filtered.findIndex((img) => img.id === activePhotoId);
  const activePhoto = activeIndex >= 0 ? filtered[activeIndex] : null;

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const openPhoto = (id: string) => setParam("photo", id);
  const closePhoto = () => setParam("photo", null);

  const goToOffset = useCallback(
    (offset: number) => {
      if (activeIndex < 0) return;
      const nextIndex =
        (activeIndex + offset + filtered.length) % filtered.length;
      setParam("photo", filtered[nextIndex].id);
    },
    [activeIndex, filtered, setParam],
  );

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (!activePhoto) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePhoto();
      if (e.key === "ArrowRight") goToOffset(1);
      if (e.key === "ArrowLeft") goToOffset(-1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePhoto, goToOffset]);

  return (
    <>
      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((category) => {
          const Icon = ICON_MAP[category];
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() =>
                setParam("category", category === "all" ? null : category)
              }
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-transparent bg-linear-to-r from-primary to-secondary text-black"
                  : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {CATEGORY_LABELS[category]}
            </button>
          );
        })}
      </div>

      {/* Bento grid */}
      <motion.div
        layout
        className="grid auto-rows-[160px] grid-cols-2 gap-4 [grid-auto-flow:dense] sm:auto-rows-[200px] md:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((photo, i) => {
            const span = BENTO_PATTERN[i % BENTO_PATTERN.length];
            return (
              <motion.button
                key={photo.id}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                onClick={() => openPhoto(photo.id)}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 to-secondary/10 text-left shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)] transition-colors hover:border-primary/40 ${span}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.caption ?? "Synchub Creative Centre"}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {photo.caption && (
                  <p className="absolute bottom-3 left-3 right-3 translate-y-2 text-sm font-medium text-[#f5f5f5] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {photo.caption}
                  </p>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No photos in this category yet.
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closePhoto}
          >
            <button
              type="button"
              onClick={closePhoto}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[#f5f5f5] transition-colors hover:bg-black/60"
            >
              <ICON_MAP.close className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToOffset(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[#f5f5f5] transition-colors hover:bg-black/60 md:left-6"
            >
              <ICON_MAP.prev className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToOffset(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[#f5f5f5] transition-colors hover:bg-black/60 md:right-6"
            >
              <ICON_MAP.next className="h-5 w-5" />
            </button>

            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-6 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-primary/10 to-secondary/10"
            >
              <Image
                src={activePhoto.url}
                alt={activePhoto.caption ?? "Synchub Creative Centre"}
                fill
                sizes="90vw"
                className="object-contain"
              />
              {activePhoto.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-6 py-5">
                  <p className="text-sm font-medium text-[#f5f5f5]">
                    {activePhoto.caption}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-[#9e9e9e]">
                    {CATEGORY_LABELS[activePhoto.category]} &middot;{" "}
                    {activeIndex + 1} / {filtered.length}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}