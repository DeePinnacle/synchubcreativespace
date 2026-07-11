import { ICON_MAP } from "@/lib/icons";
import { WaveBg } from "@/components/shared/Wave-Bg";
import { ContactForm } from "@/features/contact/components/Contact-Form";

const CONTACT_DETAILS = [
  {
    key: "mail",
    label: "Email",
    value: "hello@synchubcreativeweek.com",
    href: "mailto:hello@synchubcreativeweek.com",
  },
  {
    key: "phone",
    label: "Phone / WhatsApp",
    value: "+234 (0) 000 000 0000",
    href: "tel:+2340000000000",
  },
  {
    key: "mapPin",
    label: "Venue",
    value: "Synchub Creative Centre, Abuja",
    href: undefined,
  },
] as const;

const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", href: "#" },
  { key: "xTwitter", label: "X / Twitter", href: "#" },
  { key: "whatsapp", label: "WhatsApp", href: "#" },
] as const;


export function ContactSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-28 md:py-36">
      <WaveBg className="pointer-events-none absolute -top-10 left-0 z-0 h-[640px] w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-32 z-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(30,136,229,0.16),_transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-160px] right-16 z-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(76,175,80,0.10),_transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-[0.95fr_1.05fr] md:gap-20">
        {/* Left: intro + details */}
        <div>
          <span className="text-muted-gray mb-6 inline-flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.18em] text-[#8f8f8f] before:h-px before:w-[22px] before:bg-gradient-to-r before:from-[#4caf50] before:to-[#1e88e5]">
            Contact
          </span>
          <h1 className="text-muted-gray mb-5 max-w-[11ch] font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            Let&apos;s start a{" "}
            <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
              conversation.
            </span>
          </h1>
          <p className="mb-11 max-w-[44ch] text-base leading-relaxed text-muted-gray">
            Whether you&apos;re buying a ticket, backing the mission as a sponsor, or covering the
            week as press — the Synchub team reads every message.
          </p>

          <dl className="flex flex-col border-t border-white/[0.08]">
            {CONTACT_DETAILS.map((detail) => {
              const Icon = ICON_MAP[detail.key];
              return (
                <div
                  key={detail.key}
                  className="group flex items-center gap-4 border-b border-white/[0.08] py-5 transition-[padding] duration-200 hover:pl-2.5"
                >
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-muted-gray">
                    <Icon className="h-[17px] w-[17px] text-off-white transition-colors group-hover:text-[#4caf50]" />
                  </div>
                  <div>
                    <dt className="mb-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-gray">
                      {detail.label}
                    </dt>
                    <dd className="text-[15px] font-medium text-muted-gray">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="hover:underline hover:decoration-[#4caf50] hover:underline-offset-2"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-5">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-muted-gray px-3.5 py-2 font-mono text-xs text-[#8f8f8f]">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4caf50] opacity-40" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#4caf50]" />
              </span>
              avg. reply time — under 24hrs
            </span>

            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICON_MAP[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/[0.08] bg-muted-gray transition-transform hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-[#4caf50] hover:to-[#1e88e5]"
                  >
                    <Icon className="h-4 w-4 text-off-white group-hover:text-[#0a0a0a]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: interactive form (client leaf) */}
        <ContactForm />
      </div>
    </section>
  );
}