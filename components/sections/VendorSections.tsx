"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Shirt,
  Palette,
  UtensilsCrossed,
  Cpu,
  Camera,
  Hammer,
  MapPin,
  Users,
  Megaphone,
  Sparkles,
  CalendarDays,
  Truck,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function VendorPhoto({
  src,
  alt,
  caption,
  className = "",
  bleed = false,
}: Readonly<{
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
  bleed?: boolean;
}>) {
  const frame = bleed ? "" : "rounded-2xl border border-white/10 bg-[#121212]";

  return (
    <div className={`group overflow-hidden ${frame} ${className}`}>
      <div className="relative h-full w-full">
        {src ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              priority // Preload the hero photo so it renders instantly
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#4caf50]/10 to-[#1e88e5]/10">
            <Camera className="size-6 text-gray-400" aria-hidden="true" />
            {caption ? (
              <span className="px-4 text-center text-xs text-gray-400">
                {caption}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

const ICON_MAP: Record<string, LucideIcon> = {
  fashion: Shirt,
  art: Palette,
  food: UtensilsCrossed,
  tech: Cpu,
  media: Camera,
  craft: Hammer,
  location: MapPin,
  audience: Users,
  exposure: Megaphone,
  story: Sparkles,
  dates: CalendarDays,
  logistics: Truck,
  review: ClipboardCheck,
  guidelines: ShieldCheck,
};

const CATEGORIES = [
  { icon: "fashion", label: "Fashion & Style" },
  { icon: "art", label: "Visual Art & Design" },
  { icon: "food", label: "Food & Beverage" },
  { icon: "tech", label: "Tech & Digital" },
  { icon: "media", label: "Photography & Media" },
  { icon: "craft", label: "Craft & Handmade" },
] as const satisfies ReadonlyArray<{
  icon: keyof typeof ICON_MAP;
  label: string;
}>;

const DUTIES = [
  "Bring your own stall and setup materials",
  "Show up across the selected event days",
  "Adhere strictly to venue & safety guidelines",
  "Pass a brief portfolio review by Synchub",
];

const BENEFITS = [
  {
    title: "Direct Access",
    description: "Connect with thousands of creatives, buyers, and press.",
  },
  {
    title: "Prime Location",
    description: "A dedicated booth space at Synchub Creative Centre.",
  },
  {
    title: "Brand Exposure",
    description: "Featured highlights across social media & event material.",
  },
  {
    title: "Creative Mission",
    description: "Be part of our goal to reach 1,000,000 creatives.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function VendorSections() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-60px" },
          variants: fadeUp,
          transition: { duration: 0.6, delay },
        };

  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#4caf50]/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] w-full overflow-hidden isolate px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <VendorPhoto
          bleed
          src="/vendor.jpeg"
          alt="Vendors set up on the Creative Week floor"
          className="absolute inset-0 -z-20 h-full w-full"
        />

        {/* Glow ambient background */}
        <div className="pointer-events-none absolute top-1/4 -left-32 -z-10 h-96 w-96 rounded-full bg-[#4caf50]/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-96 w-96 rounded-full bg-[#1e88e5]/20 blur-[120px]" />

        <div className="mx-auto max-w-4xl">
          <motion.p
            {...motionProps()}
            className="font-mono text-xs uppercase tracking-widest text-off-white"
          >
            Vendor Applications Open
          </motion.p>
          <motion.h1
            {...motionProps(0.05)}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Bring Your Work to <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
              Creative Week.
            </span>
          </motion.h1>
          <motion.p
            {...motionProps(0.1)}
            className="mt-6 max-w-2xl text-lg text-off-white sm:text-xl font-light leading-relaxed"
          >
            Synchub Creative Week opens its floor to a limited group of
            creators, brands, and service providers seeking a premier space in
            front of an active audience at Synchub Creative Centre, Abuja.
          </motion.p>
          <motion.div
            {...motionProps(0.15)}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-8 text-white shadow-lg transition-transform hover:scale-[1.02] hover:opacity-95"
            >
              <Link href="/vendor/register">Register as a Vendor</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Category Section - Horizontal Pill Grid */}
      <section className="px-6 py-20 lg:py-28 bg-[#0a0a0a] border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            {...motionProps()}
            className="font-display text-3xl font-semibold text-white sm:text-4xl"
          >
            Who This Is For
          </motion.h2>
          <motion.p
            {...motionProps(0.05)}
            className="mt-3 text-gray-400 max-w-xl"
          >
            If what you make or offer fits one of these categories, there&apos;s
            a place for you on our vendor floor.
          </motion.p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((category, index) => {
              const Icon = ICON_MAP[category.icon];
              return (
                <motion.div
                  key={category.label}
                  {...motionProps(index * 0.05)}
                  className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#121212] p-5 transition-all duration-300 hover:border-[#4caf50]/50 hover:bg-[#181818]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4caf50]/10 to-[#1e88e5]/10 text-[#4caf50] transition-colors group-hover:text-white group-hover:from-[#4caf50] group-hover:to-[#1e88e5]">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <span className="text-base font-medium text-white">
                    {category.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature & Benefits Section - Split Layout */}
      <section className="px-6 py-20 lg:py-28 bg-[#0d0d0d]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Images */}
          <motion.div
            {...motionProps()}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <VendorPhoto
              src="/cultural-day.jpeg"
              alt="Vendor floor stall"
              className="aspect-[3/4] w-full"
            />
            <VendorPhoto
              src="/cultural-day.jpeg"
              alt="Attendees interacting with vendor"
              className="aspect-[3/4] w-full mt-8"
            />
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-6 space-y-12">
            <div>
              <motion.h2
                {...motionProps()}
                className="font-display text-3xl font-semibold text-white sm:text-4xl"
              >
                What It Involves
              </motion.h2>
              <ul className="mt-6 space-y-3">
                {DUTIES.map((duty, idx) => (
                  <motion.li
                    key={duty}
                    {...motionProps(idx * 0.05)}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-[#4caf50] mt-0.5" />
                    <span>{duty}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-8">
              <motion.h2
                {...motionProps()}
                className="font-display text-3xl font-semibold text-white sm:text-4xl"
              >
                What You Get
              </motion.h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BENEFITS.map((benefit, idx) => (
                  <motion.div key={benefit.title} {...motionProps(idx * 0.05)}>
                    <h3 className="font-medium text-white text-lg">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="px-6 py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            {...motionProps()}
            className="text-center font-display text-3xl font-semibold text-white sm:text-4xl"
          >
            From Past Editions
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                alt: "Fashion vendor display",
                caption: "Fashion & Style Stall",
              },
              { alt: "Art display stall", caption: "Art & Craft Booth" },
              {
                alt: "Food stall experience",
                caption: "Food & Beverage Corner",
              },
            ].map((photo, index) => (
              <motion.div key={photo.alt} {...motionProps(index * 0.05)}>
                <VendorPhoto
                  src="/cultural-day.jpeg"
                  alt={photo.alt}
                  caption={photo.caption}
                  className="aspect-[4/5] w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Summary */}
      <section className="px-6 py-12 bg-[#0a0a0a]">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#121212] p-8 md:p-10">
          <dl className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gray-400">
                When
              </dt>
              <dd className="mt-2 text-lg font-medium text-white">
                23–28 November 2026
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gray-400">
                Where
              </dt>
              <dd className="mt-2 text-lg font-medium text-white">
                Synchub Centre, Abuja
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gray-400">
                Selection Process
              </dt>
              <dd className="mt-2 text-lg font-medium text-white">
                Rolling Applications
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative px-6 py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1e88e5]/10 to-transparent" />

        <motion.div
          {...motionProps()}
          className="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-10 text-center shadow-2xl md:p-16"
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to Join Us?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-400">
            Spaces are limited and selected on a rolling basis. Submit your
            vendor application to reserve your place.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-8 text-white transition-transform hover:scale-[1.02]"
            >
              <Link href="/vendor/register">Register as a Vendor</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
