"use client"

import { useEffect, useState, JSX } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ArrowUp } from "lucide-react"

const SCROLL_THRESHOLD = 400

export function BackToTop(): JSX.Element {
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = (): void => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = (): void => {
    if (shouldReduceMotion) {
      window.scrollTo({ top: 0 })
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          className={[
            "fixed bottom-6 right-6 z-9998 flex h-11 w-11 items-center justify-center",
            "rounded-full border shadow-lg transition-colors duration-200",
            /* Dark mode */
            "border-gray-800 bg-[#111111] text-gray-400 hover:border-blue-600/60 hover:bg-blue-950/40 hover:text-blue-400",
            /* Light mode */
            "dark:border-gray-800 dark:bg-[#111111] dark:text-gray-400 dark:hover:border-blue-600/60 dark:hover:bg-blue-950/40 dark:hover:text-blue-400",
            "border-gray-200 bg-white text-gray-500 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600",
          ].join(" ")}
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}