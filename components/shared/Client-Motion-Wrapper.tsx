"use client";

import React from "react";
import { motion } from "motion/react";

interface WrapperProps {
  children: React.ReactNode;
  transitionType?: "fadeUp" | "scaleUp" | "fadeIn";
  delay?: number;
  className?: string;
}

export function ClientMotionWrapper({
  children,
  transitionType = "fadeUp",
  delay = 0,
  className = "",
}: Readonly<WrapperProps>) {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      variants={variants[transitionType]}
      className={className}
    >
      {children}
    </motion.div>
  );
}