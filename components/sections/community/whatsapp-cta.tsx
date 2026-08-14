import Link from "next/link"
import { ICON_MAP } from "@/lib/icons"

const WhatsAppIcon = ICON_MAP.whatsapp

// TODO: swap in the real WhatsApp community invite link before launch.
const WHATSAPP_INVITE_URL = "https://chat.whatsapp.com/REPLACE_ME"

export function WhatsAppCta() {
  return (
    <section id="whatsapp" className="py-10 md:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-3xl border border-border bg-card p-9 md:p-14">
          <div
            className="pointer-events-none absolute inset-[-30%_-10%]"
            style={{
              background:
                "radial-gradient(420px 260px at 90% 20%, rgba(76,175,80,0.18), transparent 65%), radial-gradient(420px 260px at 10% 90%, rgba(30,136,229,0.18), transparent 65%)",
            }}
          />
          <div className="relative max-w-[520px]">
            <h3 className="mb-2.5 text-2xl font-bold tracking-tight text-foreground">
              Don&apos;t wait for the next event to show up
            </h3>
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">
              Join the Synchub WhatsApp community for first access to
              tickets, workshop drops, and the day-to-day of Abuja&apos;s
              creative scene.
            </p>
          </div>
          <Link
            href={WHATSAPP_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 text-[15px] font-semibold text-[#062910] shadow-[0_10px_26px_-10px_rgba(37,211,102,0.5)] transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-[19px] w-[19px]" />
            Join WhatsApp group
          </Link>
        </div>
      </div>
    </section>
  )
}