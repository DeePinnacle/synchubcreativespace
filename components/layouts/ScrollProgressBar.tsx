"use client"

import { JSX, useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

export function ScrollProgressBar(): JSX.Element {
  const [progress, setProgress] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (docHeight <= 0) {
        setProgress(0)
        return
      }

      const percentage = Math.min((scrollTop / docHeight) * 100, 100)
      setProgress(percentage)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (shouldReduceMotion) {
    return (
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed left-0 top-0 z-[9999] h-[2px] bg-blue-600"
        style={{ width: `${progress}%` }}
      />
    )
  }

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed left-0 top-0 z-9999 h-0.5 origin-left bg-linear-to-r from-blue-600 via-blue-500 to-blue-400"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.05, ease: "linear" }}
    />
  )
}