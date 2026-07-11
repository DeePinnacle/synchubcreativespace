"use client";

import { motion, useReducedMotion } from "motion/react";

interface WaveBgProps {
  className?: string;
}

/**
 * Flowing wave motif — the brand's signature accent texture.
 * Rendered as a single low-opacity green-to-blue gradient stroke
 * against the black canvas (AGENT.md Section 10), not a solid shape.
 * Draws itself in on mount, then drifts gently. Respects reduced motion.
 */
export function WaveBg({ className }: WaveBgProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1240 640"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4caf50" />
          <stop offset="100%" stopColor="#1e88e5" />
        </linearGradient>
      </defs>
      <motion.path
        d="M -40 120 C 220 60, 340 220, 560 160 S 900 40, 1180 140 S 1300 260, 1280 340"
        stroke="url(#waveGradient)"
        strokeWidth={1.4}
        fill="none"
        style={{ filter: "drop-shadow(0 0 8px rgba(76,175,80,0.15))" }}
        initial={shouldReduceMotion ? { opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.55 }
            : { pathLength: 1, opacity: 0.55, y: [0, 10, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.4 }
            : {
                pathLength: { duration: 2.4, ease: "easeOut" },
                opacity: { duration: 1 },
                y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2.4 },
              }
        }
      />
    </svg>
  );
}