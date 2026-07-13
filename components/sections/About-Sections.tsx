"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Compass,
  HandHeart,
  Handshake,
  Laptop,
  Mail,
  MapPin,
  Palette,
  PenTool,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { GallerySection } from "@/features/gallery/components/Gallery-section"

// Module-level icon map — never redefined inline, per Rule 4.
const ICON_MAP = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  building: Building2,
  calendar: Calendar,
  compass: Compass,
  handHeart: HandHeart,
  handshake: Handshake,
  laptop: Laptop,
  mail: Mail,
  mapPin: MapPin,
  palette: Palette,
  penTool: PenTool,
  phone: Phone,
  sparkles: Sparkles,
  trendingUp: TrendingUp,
  users: Users,
} satisfies Record<string, LucideIcon>;

type IconKey = keyof typeof ICON_MAP;

/* ====================================================================== */
/*  Shared primitives                                                    */
/* ====================================================================== */

/** Ambient radial glow, drifting slowly. Respects reduced motion. */
function AmbientGlow({
  className,
  colorA = "rgba(76,175,80,0.16)",
  colorB = "rgba(30,136,229,0.12)",
}: {
  className?: string;
  colorA?: string;
  colorB?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
      style={{
        background: `radial-gradient(closest-side, ${colorA}, ${colorB}, transparent)`,
      }}
      animate={
        shouldReduceMotion
          ? undefined
          : { scale: [1, 1.08, 1], x: [0, 12, 0], y: [0, -10, 0] }
      }
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** A subtle mouse-follow spotlight for the whole page. */
function CursorSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { damping: 30, stiffness: 120 });
  const sy = useSpring(y, { damping: 30, stiffness: 120 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full"
      style={{
        translateX: sx,
        translateY: sy,
        x: "-50%",
        y: "-50%",
        background:
          "radial-gradient(circle, rgba(76,175,80,0.10), rgba(30,136,229,0.06) 45%, transparent 70%)",
      }}
    />
  );
}

/** Number that counts up from 0 once it scrolls into view. */
function CountUpStat({
  target,
  suffix = "",
  prefix = "",
  className,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(shouldReduceMotion ? target : 0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || hasRun.current) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        const duration = 1200;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Progress bar that fills from 0 with a shimmer sweep once in view. */
function AnimatedProgressBar({ percent }: { percent: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-border/60">
      <motion.div
        className="relative h-full overflow-hidden rounded-full bg-linear-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(percent, 2)}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          ease: "easeOut",
        }}
      >
        {!shouldReduceMotion && (
          <motion.span
            className="absolute inset-y-0 w-2/5 bg-linear-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ["-140%", "260%"] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/** Section heading with a gradient underline that draws in on reveal. */
function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <div
        className={`mb-6 flex items-center gap-3 ${center ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-linear-to-r from-primary to-secondary" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </span>
        {center && (
          <span className="h-px w-8 bg-linear-to-r from-secondary to-primary" />
        )}
      </div>

      <h2 className="relative mb-1 inline-block font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
        {title}
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-2 left-0 h-[3px] w-14 rounded-full bg-linear-to-r from-primary to-secondary"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: "easeOut",
            delay: 0.15,
          }}
          style={{ transformOrigin: "left" }}
        />
      </h2>

      {description && (
        <p
          className={`mt-5 text-base leading-relaxed text-muted-foreground ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** A card that tilts toward the cursor on hover (disabled for reduced motion). */
function TiltCard({
  children,
  className,
  soft,
}: {
  children: React.ReactNode;
  className?: string;
  soft?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { damping: 18, stiffness: 220 });
  const springY = useSpring(rotateY, { damping: 18, stiffness: 220 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * (soft ? 5 : 8));
    rotateX.set(py * (soft ? -5 : -8));
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 700 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className={`rounded-2xl border border-border/60 bg-card p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] transition-colors hover:border-primary/40 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function IconBadge({ icon, solid }: { icon: IconKey; solid?: boolean }) {
  const Icon = ICON_MAP[icon];
  return (
    <div
      className={
        solid
          ? "mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r from-primary to-secondary"
          : "mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r from-primary/15 to-secondary/15"
      }
    >
      <Icon className={solid ? "h-5 w-5 text-black" : "h-5 w-5 text-primary"} />
    </div>
  );
}

/** Scrolling marquee of quick event facts. */
function FactTicker() {
  const shouldReduceMotion = useReducedMotion();
  const facts = [
    "Nov 23\u201328, 2026",
    "Abuja, Nigeria",
    "Future Forward: Reimagining Africa's Creative Power",
    "1 Million Creatives Mission",
  ];
  const track = [...facts, ...facts];

  return (
    <div className="overflow-hidden border-y border-black/10 bg-black/[0.03]">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap py-2.5"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {track.map((fact, i) => (
          <span
            key={`${fact}-${i}`}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {fact}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Faint animated dot-grid texture, masked to fade at the edges. */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black_40%,transparent_80%)]"
    />
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ====================================================================== */
/*  Sections                                                             */
/* ====================================================================== */

function OurStorySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border/60 px-6 py-24 md:px-16">
      <DotGrid />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <SectionHeading eyebrow="Our story" title="Born in isolation, built for connection." />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              In the transformative year of 2020, amid the challenges posed
              by the COVID-19 pandemic, four visionaries from diverse
              professional and artistic backgrounds came together with a
              shared mission: to redefine creativity in Nigeria.
            </p>
            <p>
              The isolation of the pandemic underscored a vital need for
              spaces where creativity, innovation, and collaboration could
              thrive. Thus, Synchub Creative Centre was born.
            </p>
            <p>
              It is more than a venue — it&apos;s a dynamic, evolving
              ecosystem designed to nurture artistic expression, innovation,
              and community engagement. Synchub is a beacon for creators,
              fostering a legacy of resilience and creativity in a
              post-pandemic world.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* TODO: replace with final event/interior photography once shot list is delivered */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <Image
              src="/about/our-story.jpg"
              alt="Inside Synchub Creative Centre, welcoming creatives into the space"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
              <p className="text-sm font-medium text-[#f5f5f5]">
                Founded 2020 &middot; Abuja, Nigeria
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function JourneySoFarSection() {
  const stats = [
    { value: 1000, suffix: "+", label: "Creatives directly empowered" },
    { value: 3000, suffix: "+", label: "Indirect beneficiaries" },
    { value: 200, suffix: "+", label: "Events hosted" },
    { value: 30, suffix: "+", label: "Training modules developed" },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-card px-6 py-24 md:px-16">
      <AmbientGlow
        className="right-0 top-0 h-[360px] w-[600px] -translate-y-1/3 translate-x-1/4"
        colorA="rgba(30,136,229,0.16)"
        colorB="rgba(76,175,80,0.11)"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="mb-6 flex items-center gap-4">
            <IconBadge icon="calendar" solid />
            {/* TODO: replace with final event photography */}
            <div className="relative h-14 w-20 -rotate-2 overflow-hidden rounded-lg border border-border/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]">
              <Image
                src="/about/journey-thumb.jpg"
                alt="A past Synchub workshop in session"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
          <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight text-foreground">
            Our journey so far
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We&apos;ve hosted art exhibitions, trade fairs, cultural nights,
            workshops, and seminars, attracting thousands of attendees. Our
            space has become a hub for collaboration and innovation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            But this is just the beginning. With your support, we can expand
            our reach and impact even more creatives across Nigeria.
          </p>
        </motion.div>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border/60 bg-background/60 p-5 text-center shadow-[0_20px_40px_-25px_rgba(0,0,0,0.6)] transition-colors hover:border-secondary/40"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="bg-linear-to-r from-primary to-secondary bg-clip-text font-display text-2xl font-bold text-transparent md:text-3xl">
                <CountUpStat target={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-wide text-muted-foreground">
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

const SPACE_PHOTOS = [
  { src: "/about/space-1.jpg", alt: "The Synchub mural wall and entrance" },
  { src: "/about/space-2.jpg", alt: "Gallery corner with framed artwork" },
  { src: "/about/space-3.jpg", alt: "Lounge seating built from reclaimed pallets" },
  { src: "/about/space-4.jpg", alt: "Workshop tables set up for a painting class" },
  { src: "/about/space-5.jpg", alt: "Open-air seating area" },
  { src: "/about/space-6.jpg", alt: "Creative studio with instruments and easels" },
] as const;

<GallerySection />

const OBJECTIVES = [
  {
    icon: "compass",
    title: "Expand creative opportunities",
    description:
      "Provide a cutting-edge platform for creators to develop, collaborate, and showcase their work.",
  },
  {
    icon: "users",
    title: "Foster talent development",
    description:
      "Offer skill acquisition programs and mentorship to enable individuals to realize their creative potential.",
  },
  {
    icon: "trendingUp",
    title: "Drive economic impact",
    description:
      "Increase employment opportunities and support startups, contributing to Nigeria's creative economy.",
  },
  {
    icon: "handshake",
    title: "Build a thriving community",
    description:
      "Establish a vibrant network of creatives, entrepreneurs, and organizations for meaningful collaborations.",
  },
] satisfies { icon: IconKey; title: string; description: string }[];

function ObjectivesSection() {
  return (
    <section className="border-t border-border/60 px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <SectionHeading
            eyebrow="What we're building toward"
            title="Our objectives"
            description="We're on a mission to transform Nigeria's creative landscape through four key objectives."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2"
        >
          {OBJECTIVES.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <TiltCard>
                <IconBadge icon={item.icon} />
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const APPROACH_PILLARS = [
  {
    icon: "users",
    title: "Education & skills development",
    description:
      "Training in various creative fields to provide industry-relevant skills.",
  },
  {
    icon: "palette",
    title: "Art & design",
    description: "Fostering visual expression and design innovation.",
  },
  {
    icon: "sparkles",
    title: "Global impact",
    description:
      "Showcasing African creativity globally and building sustainable creative economies.",
  },
  {
    icon: "trendingUp",
    title: "Market opportunities",
    description:
      "Platforms to showcase work, foster collaborations, and connect creatives with opportunities.",
  },
  {
    icon: "handshake",
    title: "Community building",
    description: "Creating networks that empower and inspire.",
  },
] satisfies { icon: IconKey; title: string; description: string }[];

function ApproachPillarsSection() {
  return (
    <section className="border-t border-border/60 bg-card px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <SectionHeading
            eyebrow="Our approach"
            title="Five pillars, one mission"
            description="Every program at Synchub sits under one of these pillars — from first spark to finished, sellable work."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {APPROACH_PILLARS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <motion.div key={item.title} variants={fadeUp}>
                <TiltCard soft className="bg-background">
                  <Icon className="mb-4 h-6 w-6 text-primary" />
                  <h3 className="mb-2 font-display text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const PROJECT_GOALS = [
  {
    icon: "building",
    title: "Facility expansion & infrastructure",
    items: [
      "Remodel and expand existing spaces",
      "Create new work-stations, a podcast studio, performing stage, and photography studio",
      "Upgrade the facility to a state-of-the-art learning environment",
    ],
  },
  {
    icon: "laptop",
    title: "Equipment & technical enhancements",
    items: [
      "Acquire modern media and audio equipment",
      "Upgrade office equipment to support creative activities",
      "Implement advanced technology infrastructure for training",
    ],
  },
  {
    icon: "penTool",
    title: "Innovative program development",
    items: [
      "Launch new workshops and events",
      "Organize fashion showcases, open mic nights, and creative competitions",
      "Partner with industry leaders for high-quality training",
    ],
  },
  {
    icon: "handHeart",
    title: "Community engagement & sustainability",
    items: [
      "Foster relationships with NGOs, businesses, and government agencies",
      "Host affordable or free community events",
      "Ensure inclusivity and accessibility for all creatives",
    ],
  },
] satisfies { icon: IconKey; title: string; items: string[] }[];

function ProjectGoalsSection() {
  return (
    <section className="border-t border-border/60 px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <SectionHeading
            eyebrow="Where the growth goes"
            title="Project goals"
            description="Our ambitious plans to transform Nigeria's creative landscape."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-5 md:grid-cols-2"
        >
          {PROJECT_GOALS.map((goal) => (
            <motion.div key={goal.title} variants={fadeUp}>
              <TiltCard>
                <IconBadge icon={goal.icon} solid />
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">
                  {goal.title}
                </h3>
                <ul className="space-y-2.5">
                  {goal.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-linear-to-r from-primary to-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const REVENUE_STREAMS = [
  {
    icon: "laptop",
    title: "Workshops & seminars",
    description: "Revenue from ticketed training sessions.",
  },
  {
    icon: "calendar",
    title: "Event hosting",
    description: "Renting spaces for corporate and social events.",
  },
  {
    icon: "handshake",
    title: "Sponsorships & partnerships",
    description: "Collaborations with brands and organizations.",
  },
  {
    icon: "users",
    title: "Membership subscriptions",
    description: "Offering exclusive perks for members.",
  },
] satisfies { icon: IconKey; title: string; description: string }[];

function RevenueModelSection() {
  return (
    <section className="border-t border-border/60 bg-card px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading
            eyebrow="Sustainability"
            title="Our revenue model"
            description="Synchub operates on a multi-stream revenue model, ensuring financial sustainability through:"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {REVENUE_STREAMS.map((stream) => {
            const Icon = ICON_MAP[stream.icon];
            return (
              <motion.div
                key={stream.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border/60 bg-background p-6 transition-colors hover:border-primary/40"
              >
                <Icon className="mb-4 h-5 w-5 text-primary" />
                <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {stream.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {stream.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const PROGRESS_METRICS = [
  {
    label: "Creatives reached",
    current: 4000,
    target: 1_000_000,
    targetDisplay: "1,000,000",
    percent: 0.4,
  },
  {
    label: "Funding secured",
    current: 18_000_000,
    target: 569_500_000,
    prefix: "\u20a6",
    targetDisplay: "\u20a6569,500,000",
    percent: 3,
  },
  {
    label: "Programs launched",
    current: 10,
    target: 50,
    targetDisplay: "50",
    percent: 15,
  },
];

function ProgressSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 px-6 py-24 md:px-16">
      <DotGrid />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-12">
          <SectionHeading
            eyebrow="The road to one million"
            title="Our progress"
            description="We're on our way to reaching 1 million creatives, but we need your support to get there."
            center
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="space-y-8"
        >
          {PROGRESS_METRICS.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp}>
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-medium text-foreground">
                  {metric.label}
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  <span className="text-foreground">
                    <CountUpStat
                      target={metric.current}
                      prefix={metric.prefix ?? ""}
                    />
                  </span>{" "}
                  / {metric.targetDisplay}{" "}
                  <span className="text-primary">
                    ({metric.percent}% of goal)
                  </span>
                </span>
              </div>
              <AnimatedProgressBar percent={metric.percent} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const SUPPORT_PATHS = [
  {
    icon: "handHeart",
    title: "For supporters",
    description:
      "Contribute to our mission through donations, sponsorships, or by volunteering your expertise.",
    href: "/support-us",
    cta: "Support the mission",
  },
  {
    icon: "handshake",
    title: "For partners",
    description:
      "Collaborate with us to support Africa's creative economy and connect with emerging talent.",
    href: "/sponsorship",
    cta: "Explore sponsorship",
  },
  {
    icon: "palette",
    title: "For creatives",
    description:
      "Join our community to access resources, training, mentorship, and opportunities to showcase your talent.",
    href: "/creatives",
    cta: "Meet the creatives",
  },
] satisfies {
  icon: IconKey;
  title: string;
  description: string;
  href: string;
  cta: string;
}[];

function SupportMissionSection() {
  const ArrowIcon = ICON_MAP.arrowUpRight;
  const MailIcon = ICON_MAP.mail;
  const PhoneIcon = ICON_MAP.phone;
  const MapPinIcon = ICON_MAP.mapPin;

  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-card px-6 py-24 md:px-16">
      <AmbientGlow className="left-1/2 bottom-0 h-[420px] w-[720px] -translate-x-1/2 translate-y-1/3" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <SectionHeading
            eyebrow="Get involved"
            title="Support our mission"
            description="Join us in empowering 1 million creatives across Nigeria. Your support makes a difference."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-3"
          >
            {SUPPORT_PATHS.map((path) => {
              const Icon = ICON_MAP[path.icon];
              return (
                <motion.div key={path.title} variants={fadeUp}>
                  <TiltCard soft className="flex h-full flex-col bg-background">
                    <Icon className="mb-4 h-6 w-6 text-primary" />
                    <h3 className="mb-2 font-display text-base font-bold text-foreground">
                      {path.title}
                    </h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {path.description}
                    </p>
                    <Link
                      href={path.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-80"
                    >
                      {path.cta}
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="rounded-2xl border border-border/60 bg-background p-7"
          >
            <h3 className="mb-5 font-display text-lg font-bold text-foreground">
              Contact information
            </h3>
            <ul className="space-y-5 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  1st Floor Kojo Motors Building, Mabushi,
                  <br />
                  Abuja, Nigeria
                </span>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:thesynchub@gmail.com"
                  className="hover:text-foreground"
                >
                  thesynchub@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <a href="tel:+2348172388080" className="hover:text-foreground">
                    +234 817 238 8080
                  </a>
                  <br />
                  <a href="tel:+2349083696032" className="hover:text-foreground">
                    +234 908 369 6032
                  </a>
                </span>
              </li>
            </ul>

            <Button
              asChild
              className="mt-7 w-full rounded-full bg-linear-to-r from-primary to-secondary text-sm font-semibold text-black hover:opacity-90"
            >
              <Link href="/contact">
                Get in touch
                <ArrowIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/*  Export — mounted by the server-rendered app/about/page.tsx           */
/* ====================================================================== */

export function AboutSections() {
  return (
    <>
      <CursorSpotlight />
      <FactTicker />
      <OurStorySection />
      <JourneySoFarSection />
      <GallerySection />
      <ObjectivesSection />
      <ApproachPillarsSection />
      <ProjectGoalsSection />
      <RevenueModelSection />
      <ProgressSection />
      <SupportMissionSection />
    </>
  );
}