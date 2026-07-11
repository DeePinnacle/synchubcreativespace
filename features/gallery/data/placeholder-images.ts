// features/gallery/data/placeholder-images.ts
//
// TEMPORARY placeholder data standing in for real event photography.
// Per AGENT.md Section 10 ("Imagery"), production images must be real
// Synchub event photography — never stock photos.
//
// This array is shaped to match the `GalleryImage` Prisma model 1:1
// (id / url→src / caption) so swapping it out later is a drop-in change:
// replace this file's export with a query in
// `features/gallery/hooks/use-gallery-images.ts` (e.g. a server action /
// route handler reading `prisma.galleryImage.findMany()`) — the
// `GallerySection` and `GalleryGrid` components below do not need to change.

import type { GalleryImageItem } from "../types";

export const galleryPreviewImages: GalleryImageItem[] = [
  {
    id: "preview-1",
    src: "/Gallery-1.jpeg",
    alt: "Performers on stage during Cultural Day at Synchub Creative Week",
    caption: "Cultural Day — Opening Performance",
  },
  {
    id: "preview-2",
    src: "/Gallery-2.jpeg",
    alt: "Panel discussion during the Business Growth track",
    caption: "Business Growth — Founders Panel",
  },
  {
    id: "preview-3",
    src: "/Gallery-3.jpeg",
    alt: "Audience watching a screening on Film Makers Wednesday",
    caption: "Film Makers Wednesday — Screening Night",
  },
  {
    id: "preview-4",
    src: "/Gallery-4.jpeg",
    alt: "Attendees exploring a tech demo booth",
    caption: "Tech & Innovation — Demo Floor",
  },
  {
    id: "preview-5",
    src: "/Gallery-5.jpeg",
    alt: "Community wellness session at the Creative Centre",
    caption: "Community & Wellness — Morning Session",
  },
  {
    id: "preview-6",
    src: "/Gallery-6.jpeg",
    alt: "Award recipients on stage at the Grand Showcase",
    caption: "Grand Showcase & Awards — Closing Night",
  },
];