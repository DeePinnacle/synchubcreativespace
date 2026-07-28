import type { GalleryImageDTO } from "../types";

/**
 * TODO: replace the body of this function with a real query once
 * `GalleryImage.category` is migrated in prisma/schema.prisma:
 *
 *   const rows = await prisma.galleryImage.findMany({
 *     orderBy: { createdAt: "desc" },
 *   });
 *   return rows.map(toGalleryImageDTO);
 *
 * The signature and return shape are intentionally final already — nothing
 * calling getGalleryImages() should need to change when this swap happens.
 *
 * Photos are placeholders — see /public/gallery/README (or ask the team)
 * for the real event/venue photography shot list.
 */
export async function getGalleryImages(): Promise<GalleryImageDTO[]> {
  return PLACEHOLDER_GALLERY_IMAGES;
}

const PLACEHOLDER_GALLERY_IMAGES: GalleryImageDTO[] = [
  {
    id: "venue-01",
    url: "/gallery/venue-01.jpg",
    caption: "The Synchub mural wall and entrance",
    category: "venue",
    featured: true,
  },
  {
    id: "workshops-01",
    url: "/gallery/workshops-01.jpg",
    caption: "A painting workshop in session",
    category: "workshops",
  },
  {
    id: "events-01",
    url: "/gallery/events-01.jpg",
    caption: "Fashion showcase on the main stage",
    category: "events",
    featured: true,
  },
  {
    id: "venue-02",
    url: "/gallery/venue-02.jpg",
    caption: "Gallery corner with framed artwork",
    category: "venue",
  },
  {
    id: "community-01",
    url: "/gallery/community-01.jpg",
    caption: "Attendees at a cultural night",
    category: "community",
  },
  {
    id: "workshops-02",
    url: "/gallery/workshops-02.jpg",
    caption: "Hands-on skills training",
    category: "workshops",
  },
  {
    id: "events-02",
    url: "/gallery/events-02.jpg",
    caption: "Open mic night on the performing stage",
    category: "events",
  },
  {
    id: "venue-03",
    url: "/gallery/venue-03.jpg",
    caption: "Lounge seating built from reclaimed pallets",
    category: "venue",
  },
  {
    id: "community-02",
    url: "/gallery/community-02.jpg",
    caption: "Creatives networking after a showcase",
    category: "community",
    featured: true,
  },
  {
    id: "events-03",
    url: "/gallery/events-03.jpg",
    caption: "DJ set closing out the trade fair",
    category: "events",
  },
  {
    id: "workshops-03",
    url: "/gallery/workshops-03.jpg",
    caption: "Photography studio equipment demo",
    category: "workshops",
  },
  {
    id: "venue-04",
    url: "/gallery/venue-04.jpg",
    caption: "Open-air seating area",
    category: "venue",
  },
];