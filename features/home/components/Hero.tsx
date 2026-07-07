// features/home/components/hero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] flex flex-col justify-between items-center overflow-hidden pt-36">
      
      {/* 1. Ambient Lighting Scenery */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Green Ambient Radial Bloom Left-Center */}
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#4caf50]/10 blur-[120px]" />
        {/* Soft Blue Ambient Radial Bloom Right-Center */}
        <div className="absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#1e88e5]/10 blur-[140px]" />
      </div>

      {/* 2. Embedded Creative Grayscale Background Imagery */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-0 flex justify-between pointer-events-none opacity-25 mix-blend-luminosity">
        {/* Left Aspect Imagery Graphic */}
        <div className="relative w-1/3 h-full hidden md:block">
          <Image
            src="/images/hero-creatives-left.jpg" // Swap with verified internal visual assets
            alt="Creatives collaborating at Synchub Centre"
            fill
            className="object-cover object-left-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
        
        {/* Right Aspect Imagery Graphic */}
        <div className="relative w-1/3 h-full hidden md:block">
          <Image
            src="/images/hero-creatives-right.jpg" // Swap with verified internal visual assets
            alt="Young developers building platforms"
            fill
            className="object-cover object-right-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
      </div>

      {/* 3. Core Typography Layout Blocks */}
      <div className="relative z-10 max-w-5xl px-6 text-center flex flex-col items-center justify-center flex-grow">
        
        {/* Context Event Meta-Tag Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#9e9e9e] mb-6"
        >
          23–28 November 2026 <span className="text-white/30 mx-2">|</span> Synchub Creative Centre, Abuja
        </motion.div>

        {/* Exact Core Header Display Phrase */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-8"
        >
          Future Forward: <span className="text-[#4caf50]">Reimagining</span> Africa&apos;s{" "}
          <span className="text-[#4caf50]">Creative Power</span>
        </motion.h1>

        {/* Explanatory Narrative Block */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#e0e0e0] max-w-2xl font-light leading-relaxed mb-10"
        >
          A six-day journey at the Synchub Creative Centre, empowering 1 Million Creatives to shape Africa&apos;s future.
        </motion.p>

        {/* Dual Interactive Button Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/tickets"
            className="flex items-center justify-center w-full sm:w-auto px-8 h-14 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 active:scale-95 bg-gradient-to-r from-[#4caf50] to-[#1e88e5] shadow-[0_4px_25px_rgba(76,175,80,0.25)] hover:brightness-110"
          >
            Get Tickets
          </Link>
          
          <Link
            href="/sponsorship"
            className="flex items-center justify-center w-full sm:w-auto px-8 h-14 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 border border-white/20 hover:border-white/40 active:scale-95 bg-white/5 backdrop-blur-sm hover:bg-white/10"
          >
            Explore Sponsorship
          </Link>
        </motion.div>
      </div>

      {/* 4. Horizontal Partners Wall Banner */}
      <div className="relative z-10 w-full bg-white/[0.03] backdrop-blur-md border-t border-white/5 py-6 mt-12 overflow-hidden flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4">
          Our Partners
        </span>
        
        {/* Infinite Row Loop container */}
        <div className="w-full max-w-6xl px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale contrast-200 brightness-150">
          {/* Static placeholders structured to fit layout signatures */}
          <div className="text-sm font-bold tracking-wider">Programmer</div>
          <div className="text-sm font-black italic tracking-tight">Synchub</div>
          <div className="text-sm font-medium">Coitorate</div>
          <div className="text-sm font-mono uppercase">Beegrammer</div>
          <div className="text-sm font-black italic tracking-tight">Synchub</div>
        </div>
      </div>
    </section>
  );
}