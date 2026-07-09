"use client";

// components/sections/testimonials-section.tsx
//
// Purely presentational — no data layer, no server action, no Prisma type.
// Lives in components/sections/ per AGENT.md Rule 1. If this ever grows a
// live data dependency (e.g. testimonials pulled from a CMS/admin table),
// move it into features/testimonials/components/ at that point.
//
// "use client" is required here (and only here) because of the
// scroll-triggered reveal animation — per Rule 2 this stays an isolated
// leaf, not a whole-page client boundary.

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Quote, Star, ChevronDown } from "lucide-react";

// Rule 4: static ICON_MAP at module level, never inline/in-body.
const ICON_MAP = {
  quote: Quote,
  star: Star,
  chevron: ChevronDown,
} as const;

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number; // 1-5
}

// First 2 per column (6 total) show by default; the rest reveal on toggle.
const VISIBLE_ROWS_COLLAPSED = 2;

const TESTIMONIALS: Testimonial[] = [
  {
    id: "amara-chukwu",
    quote:
      "Six days in Abuja and I walked out with three new collaborators and a co-founder I actually trust. Creative Week puts you in the same room as the people who can change your trajectory.",
    name: "Amara Chukwu",
    role: "Product Designer",
    rating: 5,
  },
  {
    id: "tobi-adeyemi",
    quote:
      "The masterclasses alone justified the ticket. Watching a creative director build a campaign live, then take ours apart in critique — that doesn't happen anywhere else in Abuja.",
    name: "Tobi Adeyemi",
    role: "Freelance Illustrator",
    rating: 5,
  },
  {
    id: "ngozi-okoye",
    quote:
      "We signed on as a Silver partner expecting foot traffic. We left with four client relationships and a waitlist for next year's stage.",
    name: "Ngozi Okoye",
    role: "Sponsorship Partner",
    rating: 5,
  },
  {
    id: "femi-balogun",
    quote:
      "Everyone talks about the panels, but it's the hallway conversations between sessions where the real work happens. I left with more follow-up meetings booked than business cards.",
    name: "Femi Balogun",
    role: "UX Designer",
    rating: 5,
  },
  {
    id: "halima-yusuf",
    quote:
      "1 Million Creatives isn't a banner slogan here — the workshops genuinely move people building without formal training. I watched someone go from sketchbook to sold-out booth in six days.",
    name: "Halima Yusuf",
    role: "Founder, Studio Halima",
    rating: 5,
  },
  {
    id: "chidi-nwosu",
    quote:
      "Synchub gave our brand a stage in front of exactly the audience we needed — no cold outreach, no chasing. Just the right room, at the right time.",
    name: "Chidi Nwosu",
    role: "Brand Strategist",
    rating: 5,
  },
  {
    id: "yewande-bassey",
    quote:
      "The way sessions were paced, I never felt rushed between talks and studio time. Best-organized creative event I've been to in Nigeria this year.",
    name: "Yewande Bassey",
    role: "Event Producer",
    rating: 5,
  },
  {
    id: "kunle-ajayi",
    quote:
      "I came for the panels and stayed for the network. Every session ended with an introduction I actually needed.",
    name: "Kunle Ajayi",
    role: "Motion Designer",
    rating: 5,
  },
  {
    id: "ifeoma-nnamdi",
    quote: "Our Gold sponsorship paid for itself before the closing keynote even started.",
    name: "Ifeoma Nnamdi",
    role: "Marketing Lead, Gold Sponsor",
    rating: 5,
  },
];

// Deterministic 3-column split so the masonry offset is stable across renders.
const COLUMNS: Testimonial[][] = [[], [], []];
TESTIMONIALS.forEach((t, i) => COLUMNS[i % 3].push(t));

const columnOffset = ["md:mt-0", "md:mt-11", "md:mt-3"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex shrink-0 gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <ICON_MAP.star
          key={i}
          className="h-3.5 w-3.5"
          strokeWidth={0}
          style={{ fill: "url(#synchub-star-gradient)" }}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      layout
      custom={index}
      initial="hidden"
      animate="visible"
      exit="hidden"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      className="relative rounded-2xl border border-white/[0.07] bg-muted-gray p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] sm:p-7"
    >
      <ICON_MAP.quote
        className="mb-4 h-6 w-6"
        strokeWidth={0}
        style={{ fill: "url(#synchub-star-gradient)" }}
      />
      <p className="mb-6 text-[15px] leading-relaxed text-[#e6e6e6]">{testimonial.quote}</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4caf50] to-[#1e88e5]">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1a1a1a] text-[13px] font-semibold text-[#f5f5f5]">
              {initials(testimonial.name)}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-[#f5f5f5]">{testimonial.name}</p>
            <p className="text-[12.5px] leading-tight text-[#9e9e9e]">{testimonial.role}</p>
          </div>
        </div>
        <StarRow rating={testimonial.rating} />
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-off-white px-6 py-24 sm:py-32">
      {/* Shared gradient def, referenced by quote marks and stars above */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="synchub-star-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4caf50" />
            <stop offset="100%" stopColor="#1e88e5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Soft ambient glow — subtle, per Rule 10 (low-opacity, not neon) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[900px] -translate-x-1/2 blur-[10px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(76,175,80,0.14), rgba(30,136,229,0.10) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-muted-gray px-[18px] py-2 text-[13px] font-medium text-[#f5f5f5]">
          <ICON_MAP.quote className="h-3.5 w-3.5" strokeWidth={0} style={{ fill: "url(#synchub-star-gradient)" }} />
          Voices from Creative Week
        </div>

        <h2 className="mb-5 text-[32px] text-muted-gray font-semibold leading-[1.15] tracking-tight sm:text-[44px]">
          Built for creatives,
          <br />
          <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
            proven by the room.
          </span>
        </h2>

        <p className="mx-auto mb-16 max-w-xl text-[17px] leading-relaxed text-muted-gray">
          Six days, one city, and a lot of people who left with more than a lanyard. Here&apos;s
          what stayed with them.
        </p>

        <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {COLUMNS.map((col, colIndex) => {
            const visibleCount = isExpanded ? col.length : VISIBLE_ROWS_COLLAPSED;
            return (
              <div key={colIndex} className={`flex flex-col gap-6 ${columnOffset[colIndex]}`}>
                <AnimatePresence initial={false}>
                  {col.slice(0, visibleCount).map((t, i) => (
                    <TestimonialCard key={t.id} testimonial={t} index={colIndex * 2 + i} />
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-14">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-muted-gray bg-clip-padding px-[26px] py-3 text-sm font-semibold text-[#f5f5f5] [background-image:linear-gradient(#121212,#121212),linear-gradient(90deg,#4caf50,#1e88e5)] [background-origin:border-box] [background-clip:padding-box,border-box]"
          >
            {isExpanded ? "Show less" : "Read more stories"}
            <ICON_MAP.chevron
              className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              strokeWidth={2}
              style={{ stroke: "url(#synchub-star-gradient)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}