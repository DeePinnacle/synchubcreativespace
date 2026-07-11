"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ICON_MAP } from "@/lib/icons";
import type { GalleryImageItem } from "../types";

interface GalleryLightboxProps {
  images: GalleryImageItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const prefersReducedMotion = useReducedMotion();
  const isOpen = activeIndex !== null;
  const activeImage = isOpen ? images[activeIndex] : null;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate("prev");
      if (event.key === "ArrowRight") onNavigate("next");
    },
    [isOpen, onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption ?? activeImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm px-4 py-6 md:px-10 md:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={onClose}
            className="absolute right-4 top-4 md:right-6 md:top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[#f5f5f5] ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50]"
          >
            <ICON_MAP.close className="h-5 w-5" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("prev");
                }}
                className="absolute left-2 md:left-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-[#f5f5f5] ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50]"
              >
                <ICON_MAP.chevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("next");
                }}
                className="absolute right-2 md:right-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-[#f5f5f5] ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50]"
              >
                <ICON_MAP.chevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}

          <motion.div
            key={activeImage.id}
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full max-h-[70vh] overflow-hidden rounded-2xl bg-[#121212] ring-1 ring-white/10">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
            {activeImage.caption && (
              <p className="mt-4 text-center text-sm md:text-base text-[#e0e0e0]">
                {activeImage.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}