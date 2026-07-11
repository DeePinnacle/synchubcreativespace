"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ICON_MAP } from "@/lib/icons";

const INQUIRY_TYPES = ["General", "Sponsorship", "Press", "Tickets"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

const inputClasses =
  "w-full rounded-[10px] border border-white/[0.08] bg-[#181818] px-3.5 py-3 text-[14.5px] text-[#f5f5f5] outline-none placeholder:text-[#6b6b6b] transition-colors focus:border-[#4caf50] focus:bg-[#1f1f1f]";

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("General");
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const ArrowRight = ICON_MAP.arrowRight;
  const Info = ICON_MAP.info;
  const CheckCircle = ICON_MAP.checkCircle;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // UI-only for now — wire to a server action + TanStack Query
    // mutation later (AGENT.md Rule 7), never a different pattern.
    setSubmitted(true);
  }

  return (
    <div className="relative rounded-[20px] border border-white/[0.08] bg-muted-gray p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] md:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-1px] rounded-[20px] p-px"
        style={{
          background:
            "linear-gradient(150deg, rgba(76,175,80,0.35), rgba(30,136,229,0.05) 40%, transparent 65%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={false}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="mb-1.5 font-display text-lg text-off-white font-semibold">Send us a message</h2>
            <p className="mb-7 text-[13.5px] text-[#8f8f8f]">
              Pick the reason you&apos;re reaching out — it helps route your message to the right
              team.
            </p>

            <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Inquiry type">
              {INQUIRY_TYPES.map((type) => {
                const isActive = type === inquiryType;
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setInquiryType(type)}
                    className={`rounded-full border px-3.5 py-2 font-mono text-[11.5px] transition-all ${
                      isActive
                        ? "border-transparent bg-gradient-to-r from-[#4caf50] to-[#1e88e5] font-semibold text-[#0a0a0a]"
                        : "border-white/[0.08] text-[#c9c9c9] hover:border-[#4caf50]/40 hover:text-[#f5f5f5]"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <Field label="Full name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ada Okafor"
                    required
                    className={inputClasses}
                  />
                </Field>
                <Field label="Email address" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ada@studio.com"
                    required
                    className={inputClasses}
                  />
                </Field>
              </div>
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us a bit about what you need..."
                  required
                  className={`${inputClasses} min-h-[118px] resize-none leading-relaxed`}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-5 py-3.5 text-[14.5px] font-semibold text-[#0a0a0a] transition-[filter,transform] hover:brightness-110 active:scale-[0.99]"
              >
                Send message
                <ArrowRight className="h-[15px] w-[15px]" />
              </button>

              <p className="mt-4 flex items-center gap-2 text-xs text-[#8f8f8f]">
                <Info className="h-[13px] w-[13px] shrink-0" />
                UI preview only — this form isn&apos;t wired to a server action yet.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start gap-3.5 py-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[rgba(76,175,80,0.16)] to-[rgba(30,136,229,0.16)]">
              <CheckCircle className="h-5 w-5 text-[#4caf50]" />
            </div>
            <h3 className="font-display text-lg font-semibold">Message received</h3>
            <p className="text-[13.5px] leading-relaxed text-[#8f8f8f]">
              This is a UI-only confirmation state. Once the server action lands, this will trigger
              a real submission and email notification per Section 8 of the spec.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="font-mono text-[11.5px] text-[#4caf50] underline underline-offset-[3px]"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}