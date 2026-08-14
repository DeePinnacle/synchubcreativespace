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
    url: "/Gallery-7.jpeg",
    caption: "The Synchub mural wall and entrance",
    category: "venue",
    featured: true,
  },
  {
    id: "workshops-01",
    url: "/Gallery-8.jpeg",
    caption: "A painting workshop in session",
    category: "workshops",
  },
  {
    id: "events-01",
    url: "/Gallery-9.jpeg",
    caption: "Fashion showcase on the main stage",
    category: "events",
    featured: true,
  },
  {
    id: "venue-02",
    url: "/Gallery-10.jpeg",
    caption: "Gallery corner with framed artwork",
    category: "venue",
  },
  {
    id: "community-01",
    url: "/Gallery-3.jpeg",
    caption: "Attendees at a cultural night",
    category: "community",
  },
  {
    id: "workshops-02",
    url: "/Gallery-5.jpeg",
    caption: "Hands-on skills training",
    category: "workshops",
  },
  {
    id: "events-02",
    url: "/Gallery-7.jpeg",
    caption: "Open mic night on the performing stage",
    category: "events",
  },
  {
    id: "venue-03",
    url: "/cultural-day.jpeg",
    caption: "Lounge seating built from reclaimed pallets",
    category: "venue",
  },
  {
    id: "community-02",
    url: "/Gallery-5.jpeg",
    caption: "Creatives networking after a showcase",
    category: "community",
    featured: true,
  },
  {
    id: "events-03",
    url: "/Gallery-12.jpeg",
    caption: "DJ set closing out the trade fair",
    category: "events",
  },
  {
    id: "workshops-03",
    url: "/Gallery-13.jpeg",
    caption: "Photography studio equipment demo",
    category: "workshops",
  },
  {
    id: "venue-04",
    url: "/community.jpeg",
    caption: "Open-air seating area",
    category: "venue",
  },
];