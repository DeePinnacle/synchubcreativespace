"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { ICON_MAP } from "@/lib/icons"

interface EventGalleryProps {
  images: string[]
  alt: string
}

export function EventGallery({ images, alt }: Readonly<EventGalleryProps>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  const CloseIcon = ICON_MAP.close
  const PrevIcon = ICON_MAP.chevronLeft
  const NextIcon = ICON_MAP.chevronRight
  const ExpandIcon = ICON_MAP.expand

  function showPrev() {
    setOpenIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    )
  }

  function showNext() {
    setOpenIndex((current) => (current === null ? null : (current + 1) % images.length))
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo ${index + 1} of ${alt}`}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={`/${src}`}
              alt={`${alt} — photo ${index + 1}`}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
              <ExpandIcon
                className="h-5 w-5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                strokeWidth={2}
              />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpenIndex(null)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setOpenIndex(null)
              }}
              aria-label="Close gallery"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <CloseIcon className="h-5 w-5" strokeWidth={2} />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showPrev()
                }}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <PrevIcon className="h-6 w-6" strokeWidth={2} />
              </button>
            )}

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative h-[70vh] w-full max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={`/${images[openIndex]}`}
                alt={`${alt} — photo ${openIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showNext()
                }}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <NextIcon className="h-6 w-6" strokeWidth={2} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}