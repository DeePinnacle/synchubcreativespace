"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";

const ICON_MAP = {
  arrowRight: ArrowRight,
  mapPin: MapPin,
} as const;

const STATS = [
  { value: "1M+", label: "Creatives to empower" },
  { value: "5", label: "Year mission" },
  { value: "6", label: "Days of Creative Week" },
] as const;

export function AboutSection() {
  const ArrowRightIcon = ICON_MAP.arrowRight;
  const MapPinIcon = ICON_MAP.mapPin;
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden px-6 py-24 bg-off-white md:px-16">
      {/* Ambient glow, per Section 10 depth & atmosphere guidance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(76,175,80,0.16),rgba(30,136,229,0.12),transparent)] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        {/* Left: story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-linear-to-r from-primary to-secondary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-gray">
              Who we are
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mb-6 font-display text-4xl font-extrabold leading-[1.1] text-muted-gray md:text-[2.75rem]"
          >
            Where Nigeria&apos;s{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              creative future
            </span>{" "}
            takes shape.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mb-4 text-base leading-relaxed text-muted-gray"
          >
            Synchub Creative Centre is a visionary creative hub in the heart of
            Abuja, Nigeria — built to merge art, lifestyle, and skill
            acquisition under one roof. Our mission is to empower{" "}
            <span className="font-medium bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              1,000,000 creatives within five years
            </span>
            , giving them the space, training, and platform to turn raw talent
            into sustainable careers.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mb-10 text-base leading-relaxed text-muted-gray"
          >
            From fully-equipped studios and hands-on workshops to mentorship and
            curated showcases, every corner of Synchub is designed to move an
            idea from first spark to finished work — and put it in front of the
            people who need to see it. Creative Week is where that mission comes
            alive: six days of masterclasses, exhibitions, and industry
            connections putting Africa&apos;s creative power on the world stage.
          </motion.p>

          <motion.dl
            variants={fadeUp}
            className="mb-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="bg-linear-to-r from-primary to-secondary bg-clip-text font-display text-2xl font-bold text-transparent md:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-gray">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className="inline-block"
          >
            <Button
              asChild
              className="rounded-full h-14 bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              <Link href="/about">
                Read more about Synchub
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: visual */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: "easeOut",
          }}
          className="relative order-first"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <Image
              src="/about.jpeg"
              alt="Creatives at work inside Synchub Creative Centre"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/30" />

            {/* Wave motif — brand accent per Section 10 */}
            <svg
              className="absolute inset-0 h-full w-full opacity-70"
              viewBox="0 0 400 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="aboutWaveGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#4caf50" />
                  <stop offset="100%" stopColor="#1e88e5" />
                </linearGradient>
              </defs>
              <motion.path
                d="M-20,380 C100,300 180,440 300,340 C380,270 420,320 460,260"
                stroke="url(#aboutWaveGradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
            </svg>

            {/* Floating info card */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md"
            >
              <div>
                <p className="text-sm font-medium text-[#f5f5f5]">
                  Synchub Creative Centre
                </p>
                <p className="mt-0.5 flex items-center gap-1 font-mono text-[11px] text-[#9e9e9e]">
                  <MapPinIcon className="h-3 w-3" />
                  Abuja, Nigeria
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary">
                <ArrowRightIcon className="h-4 w-4 -rotate-45 text-black" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
