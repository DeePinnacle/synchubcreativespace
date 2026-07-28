"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ICON_MAP } from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useSubmitContact } from "@/features/contact/hooks/use-submit-contact";
import { INQUIRY_TYPES, contactFormSchema, type ContactFormValues, type InquiryType } from "@/features/contact/types";

const inputClasses =
  "border-white/[0.08] bg-[#181818] px-3.5 py-3 text-[14.5px] text-[#f5f5f5] placeholder:text-[#6b6b6b] transition-colors focus-visible:border-[#4caf50] focus-visible:bg-[#1f1f1f] focus-visible:ring-0 focus-visible:ring-offset-0";

const labelClasses = "font-mono text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]";

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isSuccess, isError, error, reset: resetMutation } = useSubmitContact();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "", inquiryType: "General" },
  });

  const inquiryType = watch("inquiryType");

  const ArrowRight = ICON_MAP.arrowRight;
  const Info = ICON_MAP.info;
  const CheckCircle = ICON_MAP.checkCircle;
  // NOTE: if `alertCircle` isn't already in your ICON_MAP, add it —
  // e.g. alertCircle: AlertCircle from "lucide-react" — per AGENT.md Rule 4.
  const AlertCircle = ICON_MAP.alertCircle;

  function onSubmit(values: ContactFormValues) {
    mutate(
      { ...values, honeypot: honeypotRef.current?.value ?? "" },
      { onSuccess: () => resetForm() }
    );
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
        {!isSuccess ? (
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
                  <Button
                    key={type}
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-pressed={isActive}
                    onClick={() => setValue("inquiryType", type as InquiryType, { shouldValidate: true })}
                    className={`h-auto rounded-full border px-3.5 py-2 font-mono text-[11.5px] transition-all ${
                      isActive
                        ? "border-transparent bg-gradient-to-r from-[#4caf50] to-[#1e88e5] font-semibold text-[#0a0a0a] hover:from-[#4caf50] hover:to-[#1e88e5] hover:text-[#0a0a0a]"
                        : "border-white/[0.08] bg-transparent text-[#c9c9c9] hover:border-[#4caf50]/40 hover:bg-transparent hover:text-[#f5f5f5]"
                    }`}
                  >
                    {type}
                  </Button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Honeypot — visually hidden from real users; bots tend to fill every field. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="companyWebsite">Leave this field blank</label>
                <Input
                  ref={honeypotRef}
                  id="companyWebsite"
                  name="companyWebsite"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <Field data-invalid={!!errors.name} className="flex-1 gap-2">
                  <FieldLabel htmlFor="name" className={labelClasses}>
                    Full name
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ada Okafor"
                    aria-invalid={!!errors.name}
                    className={inputClasses}
                    {...register("name")}
                  />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>

                <Field data-invalid={!!errors.email} className="flex-1 gap-2">
                  <FieldLabel htmlFor="email" className={labelClasses}>
                    Email address
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ada@studio.com"
                    aria-invalid={!!errors.email}
                    className={inputClasses}
                    {...register("email")}
                  />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>
              </div>

              <Field data-invalid={!!errors.message} className="gap-2">
                <FieldLabel htmlFor="message" className={labelClasses}>
                  Message
                </FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Tell us a bit about what you need..."
                  aria-invalid={!!errors.message}
                  className={`${inputClasses} min-h-[118px] resize-none leading-relaxed`}
                  {...register("message")}
                />
                {errors.message && <FieldError>{errors.message.message}</FieldError>}
              </Field>

              {isError && (
                <p className="flex items-center gap-2 text-[13px] text-[#e57373]">
                  <AlertCircle className="h-[14px] w-[14px] shrink-0" />
                  {error instanceof Error ? error.message : "Something went wrong. Please try again."}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 flex h-auto w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#4caf50] to-[#1e88e5] px-5 py-3.5 text-[14.5px] font-semibold text-[#0a0a0a] transition-[filter,transform] hover:from-[#4caf50] hover:to-[#1e88e5] hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:hover:brightness-100"
              >
                {isPending ? "Sending..." : "Send message"}
                <ArrowRight className="h-[15px] w-[15px]" />
              </Button>

              <p className="mt-4 flex items-center gap-2 text-xs text-[#8f8f8f]">
                <Info className="h-[13px] w-[13px] shrink-0" />
                We typically reply within 24 hours.
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
              Thanks for reaching out — the Synchub team will get back to you within 24 hours.
            </p>
            <Button
              type="button"
              variant="link"
              onClick={() => resetMutation()}
              className="h-auto p-0 font-mono text-[11.5px] text-[#4caf50] underline underline-offset-[3px]"
            >
              Send another message
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}