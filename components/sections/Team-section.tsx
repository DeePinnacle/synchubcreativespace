"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Mail } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";

type AnyIcon = LucideIcon | IconType;

// Static ICON_MAP at module level — see lib/icons.ts in the full project.
const SOCIAL_ICON_MAP: Record<
  "instagram" | "x" | "linkedin" | "whatsapp",
  AnyIcon
> = {
  instagram: FaInstagram,
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email: string;
  socials: Partial<Record<keyof typeof SOCIAL_ICON_MAP, string>>;
};

const TEAM: TeamMember[] = [
  {
    id: "founder",
    name: "Mr. Maxwell",
    role: "Founder & Creative Director",
    bio: "Sets the vision for Synchub Creative Centre and the 1 Million Creatives mission — the person Creative Week ultimately answers to.",
    photoUrl: "/tech.jpeg",
    email: "amara@synchubcreatives.com",
    socials: {
      instagram: "@amarachukwu",
      x: "@amarachukwu",
      linkedin: "amara-chukwu",
    },
  },
  {
    id: "program-director",
    name: "Tobi Adewale",
    role: "Program Director",
    bio: "Owns the six-day schedule end to end — from Cultural Day through the Grand Showcase & Awards.",
    photoUrl: "/dancing.jpeg",
    email: "tobi@synchubcreatives.com",
    socials: {
      instagram: "@tobiadewale",
      linkedin: "tobi-adewale",
      whatsapp: "+2348012345678",
    },
  },
  {
    id: "partnerships-lead",
    name: "Zainab Bello",
    role: "Partnerships & Sponsorship Lead",
    bio: "First point of contact for every sponsor tier, from Headline to Community — and the Partners Wall's biggest advocate.",
    photoUrl: "/content.jpeg",
    email: "zainab@synchubcreatives.com",
    socials: { linkedin: "zainab-bello", x: "@zainabbello" },
  },
  {
    id: "creative-producer",
    name: "Emeka Nwosu",
    role: "Creative Producer",
    bio: "Runs Film Makers Wednesday and Tech & Innovation Day, and shapes what actually lands on stage.",
    photoUrl: "/mr-sensei.jpeg",
    email: "emeka@synchubcreatives.com",
    socials: { instagram: "@emekanwosu", x: "@emekanwosu" },
  },
  {
    id: "community-manager",
    name: "Fatima Yusuf",
    role: "Community & Wellness Manager",
    bio: "Leads Community & Wellness Day and keeps the 1M Creatives mission connected to the people it's meant to serve.",
    photoUrl: "/dancing-2.jpeg",
    email: "fatima@synchubcreatives.com",
    socials: { instagram: "@fatimayusuf", whatsapp: "+2348098765432" },
  },
  {
    id: "operations-lead",
    name: "Chidi Okafor",
    role: "Operations Lead",
    bio: "Keeps ticketing, check-in, and the Admin Dashboard running so the other five can focus on the programme.",
    photoUrl: "/space.jpeg",
    email: "chidi@synchubcreatives.com",
    socials: { linkedin: "chidi-okafor", x: "@chidiokafor" },
  },
];

function SocialRow({
  socials,
  email,
}: Readonly<{
  socials: TeamMember["socials"];
  email: string;
}>) {
  const entries = Object.entries(socials) as [
    keyof typeof SOCIAL_ICON_MAP,
    string,
  ][];

  return (
    <div className="mt-5 flex items-center gap-3 border-t border-white/6 pt-4">
      <Link
        href={`mailto:${email}`}
        aria-label={`Email ${email}`}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#9e9e9e] transition-colors hover:border-transparent hover:text-[#f5f5f5]"
        style={{ background: "transparent" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #4caf50, #1e88e5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <Mail className="h-3.5 w-3.5" />
      </Link>

      {entries.map(([key, handle]) => {
        const Icon = SOCIAL_ICON_MAP[key];
        return (
          <Link
            key={key}
            href={
              key === "whatsapp"
                ? `https://wa.me/${handle.replace(/\D/g, "")}`
                : "#"
            }
            aria-label={`${key} — ${handle}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#9e9e9e] transition-colors hover:border-transparent hover:text-[#f5f5f5]"
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #4caf50, #1e88e5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon className="h-3.5 w-3.5" />
          </Link>
        );
      })}
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="relative bg-off-white px-6 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 -top-50 h-125 w-225 -translate-x-1/2 blur-[10px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(76,175,80,0.14), rgba(30,136,229,0.10) 45%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-muted-gray bg-white/3 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-gray">
            From the Synchub Floor
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-muted-gray sm:text-5xl">
            Meet the Team
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#9e9e9e]">
            The studios, the stage, and the six days of programming are run
            year-round by these great minds at Synchub Creative Centre — reach out
            directly, every card below is a real inbox.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.08,
                ease: "easeOut",
              }}
              className="group overflow-hidden rounded-2xl border border-white/6 bg-muted-gray shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors hover:border-white/12"
            >
              <div
                className="relative h-60 w-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(76,175,80,0.2), rgba(30,136,229,0.2))",
                }}
              >
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-primary-dark/80 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-base font-semibold text-[#f5f5f5]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#9e9e9e]">{member.role}</p>

                <p className="mt-4 text-sm leading-relaxed text-[#9e9e9e]">
                  {member.bio}
                </p>

                <SocialRow socials={member.socials} email={member.email} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
