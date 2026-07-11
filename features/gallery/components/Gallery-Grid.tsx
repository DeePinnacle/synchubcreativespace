"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ICON_MAP } from "@/lib/icons";
import { GalleryLightbox } from "./Gallery-Lightbox";
// import type { GalleryImageItem } from "../types";
import { galleryPreviewImages as images } from "../data/placeholder-images"

// interface GalleryGridProps {
//   images: GalleryImageItem[];
// }

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleNavigate = (direction: "prev" | "next") => {
    setActiveIndex((current) => {
      if (current === null) return current;
      const lastIndex = images.length - 1;
      if (direction === "prev") return current === 0 ? lastIndex : current - 1;
      return current === lastIndex ? 0 : current + 1;
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image: ${image.caption ?? image.alt}`}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-[#121212] ring-1 ring-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50]"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : index * 0.06,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ICON_MAP.expand className="h-4 w-4" aria-hidden="true" />
            </span>

            {image.caption && (
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-xs font-medium text-[#f5f5f5] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:p-4 md:text-sm">
                {image.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={handleNavigate}
      />
    </>
  );
}