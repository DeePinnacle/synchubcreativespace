// features/gallery/types.ts

export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

// TODO: once `GalleryImage.category` lands in prisma/schema.prisma, this
// union should mirror the Prisma enum exactly (e.g. import type { GalleryCategory }
// from "@prisma/client") instead of being hand-maintained here.
export type GalleryCategory = "venue" | "workshops" | "events" | "community";

export type GalleryImageDTO = {
  id: string;
  url: string;
  caption: string | null;
  category: GalleryCategory;
  /** Used to vary the bento layout — not a persisted field. */
  featured?: boolean;
};

export const GALLERY_CATEGORIES = [
  "all",
  "venue",
  "workshops",
  "events",
  "community",
] as const satisfies readonly ["all", ...GalleryCategory[]];

export type GalleryCategoryFilter = (typeof GALLERY_CATEGORIES)[number];