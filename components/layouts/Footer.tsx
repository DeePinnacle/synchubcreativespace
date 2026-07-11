"use client";

// components/shared/footer.tsx
//
// Purely presentational — no data layer, no server actions, no Prisma-backed
// types — so it lives in components/shared/ alongside header.tsx and
// wave-bg.tsx, per AGENT.md Section 3 Rule 1 / Section 4.
//
// If any part of this ever needs live data (e.g. a real newsletter signup
// backed by a server action), that piece moves into features/newsletter/
// at that point — it should not stay here just because it started here.

import Link from "next/link";
import { useState, type FormEvent, type ComponentType } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

// ---------------------------------------------------------------------------
// Icons — static module-level ICON_MAP (Rule 4). Merge into lib/icons.ts if
// this ends up shared across other components; kept local here for now since
// nothing else needs these specific glyphs yet.
// ---------------------------------------------------------------------------

type AnyIcon = ComponentType<{ className?: string }>;

const ICON_MAP: Record<"mail" | "mapPin" | "phone" | "arrowRight", AnyIcon> = {
  mail: Mail,
  mapPin: MapPin,
  phone: Phone,
  arrowRight: ArrowRight,
};

const SOCIAL_LINKS: { name: string; href: string; icon: AnyIcon }[] = [
  { name: "Instagram", href: "https://instagram.com/synchubcreativecentre", icon: FaInstagram },
  { name: "X (Twitter)", href: "https://x.com/synchubcreative", icon: FaXTwitter },
  { name: "Facebook", href: "https://facebook.com/synchubcreativecentre", icon: FaFacebookF },
  { name: "LinkedIn", href: "https://linkedin.com/company/synchub-creative-centre", icon: FaLinkedinIn },
  { name: "YouTube", href: "https://youtube.com/@synchubcreative", icon: FaYoutube },
  { name: "WhatsApp", href: "https://wa.me/2340000000000", icon: FaWhatsapp },
];

// ---------------------------------------------------------------------------
// Nav data — mirrors the Sitemap in AGENT.md Section 5. Admin routes are
// intentionally excluded: never publicly linked, per Section 9.
// ---------------------------------------------------------------------------

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "About / Our Story", href: "/about" },
      { label: "Event Schedule", href: "/schedule" },
      { label: "Meet the Creatives", href: "/creatives" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Tickets & Registration", href: "/tickets" },
      { label: "Sponsorship Packages", href: "/sponsorship" },
      { label: "Partners Wall", href: "/partners" },
      { label: "1M Creatives / Support Us", href: "/support-us" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Terms, Privacy & Refund Policy", href: "/terms-privacy-refund" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Motion — respects prefers-reduced-motion per project convention.
// ---------------------------------------------------------------------------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ---------------------------------------------------------------------------
// Newsletter — visual only for now. No mutation, no server action: wire this
// up to features/newsletter/actions/subscribe.ts once that data layer lands,
// per Rule 1 (this component moves out of components/shared the moment it
// needs one).
// ---------------------------------------------------------------------------

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    // TODO: replace with a real TanStack Query mutation → server action
    // once features/newsletter exists (Rule 7 — mutation pattern).
    setStatus("submitted");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#9e9e9e] outline-none transition-colors focus:border-[#4caf50]/60 focus:ring-1 focus:ring-[#4caf50]/40"
      />
      <button
        type="submit"
        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {status === "submitted" ? "Subscribed" : "Notify me"}
        <ICON_MAP.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0a]">
      {/* Gradient hairline + ambient glow — Design System Section 10 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4caf50] to-[#1e88e5]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#4caf50]/10 to-[#1e88e5]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <motion.div
            variants={fadeUp}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="space-y-5"
          >
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#4caf50] to-[#1e88e5] text-sm font-bold text-[#0a0a0a]"
              >
                &#8734;
              </span>
              <span className="text-lg font-bold tracking-tight text-[#f5f5f5]">
                Synchub{" "}
                <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
                  Creative Week
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-[#9e9e9e]">
              Six days of culture, business, film, tech and community — reimagining
              Africa&apos;s creative power. Part of the 1 Million Creatives mission
              and the permanent digital home of the Synchub Creative Centre.
            </p>

            <ul className="space-y-2.5 text-sm text-[#9e9e9e]">
              <li className="flex items-start gap-2.5">
                <ICON_MAP.mapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4caf50]" />
                Synchub Creative Centre, Abuja, Nigeria
              </li>
              <li className="flex items-center gap-2.5">
                <ICON_MAP.mail className="h-4 w-4 shrink-0 text-[#4caf50]" />
                <a
                  href="mailto:hello@synchubcreativeweek.com"
                  className="transition-colors hover:text-[#f5f5f5]"
                >
                  hello@synchubcreativeweek.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ICON_MAP.phone className="h-4 w-4 shrink-0 text-[#4caf50]" />
                <a href="tel:+2340000000000" className="transition-colors hover:text-[#f5f5f5]">
                  +234 000 000 0000
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#e0e0e0] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-[#4caf50] hover:to-[#1e88e5] hover:text-[#0a0a0a]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column, colIndex) => (
            <motion.div
              key={column.title}
              variants={fadeUp}
              initial={shouldReduceMotion ? undefined : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              custom={colIndex + 1}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f5f5]">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9e9e9e] transition-colors hover:text-[#f5f5f5]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          custom={4}
          className="mt-14 flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-[#f5f5f5]">Get event updates first</p>
            <p className="mt-1 text-sm text-[#9e9e9e]">
              Schedule drops, ticket tiers, and sponsor announcements — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-[#9e9e9e] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Synchub Creative Centre. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms-privacy-refund" className="transition-colors hover:text-[#f5f5f5]">
              Terms, Privacy &amp; Refund
            </Link>
            <span className="hidden text-white/10 sm:inline">&bull;</span>
            <p className="hidden sm:inline">23&ndash;28 Nov 2026 &middot; Abuja</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;