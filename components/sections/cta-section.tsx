// components/sections/cta-section.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react"; // Rule 2: imported from motion/react, never framer-motion
import { Button } from "@/components/ui/button";

interface StatItem {
  value: string;
  label: string;
}

const IMPACT_STATS: StatItem[] = [
  { value: "1000+", label: "Creatives Directly Empowered" },
  { value: "3000+", label: "Indirect Beneficiaries" },
  { value: "200+", label: "Events Hosted" },
  { value: "30+ ", label: "Training Modules Developed" },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-off-white py-24 text-muted-gray">
      {/* Soft atmospheric gradient ambient glows behind content */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#4caf50] rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-[#1e88e5] rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Extracted Impact Section from Screenshot 2026-07-06 115643.png */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-muted-gray">
              Impact and Achievements
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-[#4caf50] to-[#1e88e5] mx-auto mb-6 rounded-full" />
            <p className="text-base sm:text-lg text-muted-gray leading-relaxed">
              Since our inception, we&apos;ve made significant strides in empowering Nigeria&apos;s creative community.
            </p>
          </motion.div>

          {/* Grid layout for the 4 core metrics */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {IMPACT_STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4"
              >
                <span className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-muted-gray max-w-[150px]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <hr className="border-[#1a1a1a] max-w-5xl mx-auto my-12" />

        {/* Actionable Event Pitch Segment */}
        <div className="max-w-4xl mx-auto text-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-muted-gray border border-[#1a1a1a] p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
          >
            {/* Embedded subtle wave/glow highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/5 to-[#1e88e5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h3 className="text-off-white text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Ready to Shape the Future?
            </h3>
            <p className="text-[#9e9e9e] max-w-2xl mx-auto mb-8 text-sm sm:text-base">
              Join us for Synchub Creative Week 2026 in Abuja. Secure your pass to access masterclasses, exhibitions, and premium networking, or position your brand at the center of Africa&apos;s creative movement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="w-full sm:w-auto font-semibold px-8 py-6 rounded-lg shadow-lg transform transition active:scale-95 bg-gradient-to-r from-[#4caf50] to-[#1e88e5] hover:opacity-95 text-white border-0"
              >
                <Link href="/tickets">Get Event Tickets</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto font-semibold px-8 py-6 rounded-lg transition active:scale-95 bg-transparent border-[#212121] text-[#e0e0e0] hover:bg-[#1a1a1a] hover:text-[#f5f5f5]"
              >
                <Link href="/sponsorship">Become a Sponsor</Link>
              </Button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}