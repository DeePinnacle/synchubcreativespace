import Link from "next/link"
import { ICON_MAP } from "@/lib/icons"

const WhatsAppIcon = ICON_MAP.whatsapp
const ArrowRightIcon = ICON_MAP.arrowRight

export function CommunityHero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-[-20%_-10%]"
        style={{
          background:
            "radial-gradient(480px 320px at 15% 20%, rgba(76,175,80,0.18), transparent 60%), radial-gradient(520px 360px at 85% 30%, rgba(30,136,229,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[760px] px-6">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5]" />
          Synchub Community
        </div>
        <h1 className="mb-5 text-4xl text-muted-gray font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Creative Week is one week.
          <br />
          The{" "}
          <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
            community
          </span>{" "}
          runs all year.
        </h1>
        <p className="mb-8 max-w-[560px] text-base text-muted-gray leading-relaxed text-muted-foreground md:text-lg">
          Workshops, mixers, and open sessions that keep Abuja&apos;s
          creative community connected between festivals — part of the 1
          Million Creatives mission.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Link
            href="#whatsapp"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-6 py-3.5 text-sm font-semibold text-[#08110a] shadow-[0_8px_24px_-8px_rgba(76,175,80,0.35)] transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Join the WhatsApp community
          </Link>
          <Link
            href="#upcoming"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20"
          >
            See upcoming events
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}