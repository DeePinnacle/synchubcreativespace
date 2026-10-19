"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ICON_MAP } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitVendorApplication } from "@/features/vendor/hooks/use-submit-vendor-application";
import {
  VENDOR_CATEGORIES,
  VENDOR_INTERESTS,
  vendorFormSchema,
  type EventDayOption,
  type VendorFormValues,
} from "@/features/vendor/types";

const inputClasses =
  "border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]";

const labelClasses = "text-sm font-medium text-neutral-200";

const optionClasses =
  "flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 text-xs text-neutral-300 transition-colors hover:border-neutral-700";

const checkboxClasses =
  "border-neutral-700 data-[state=checked]:bg-[#4caf50] data-[state=checked]:text-black";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Africa/Lagos",
});

function OptionCheckbox({
  id,
  label,
  detail,
  checked,
  onChange,
}: Readonly<{
  id: string;
  label: string;
  detail?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}>) {
  return (
    <label htmlFor={id} className={optionClasses}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        className={checkboxClasses}
      />
      <span className="flex flex-col">
        <span>{label}</span>
        {detail ? <span className="text-[11px] text-neutral-500">{detail}</span> : null}
      </span>
    </label>
  );
}

export function VendorRegistrationForm({
  eventDays,
}: Readonly<{ eventDays: EventDayOption[] }>) {
  const shouldReduceMotion = useReducedMotion();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isSuccess, isError, error } = useSubmitVendorApplication();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      phone: "",
      email: "",
      description: "",
      website: "",
      interests: [],
      days: [],
    },
  });

  const ArrowLeft = ICON_MAP.arrowLeft;
  const Sparkles = ICON_MAP.sparkles;
  const CheckCircle = ICON_MAP.checkCircle;
  const AlertCircle = ICON_MAP.alertCircle;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: fadeUp,
        transition: { duration: 0.5 },
      };

  function onSubmit(values: VendorFormValues) {
    mutate({ ...values, honeypot: honeypotRef.current?.value ?? "" });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 lg:grid lg:grid-cols-12">
      {/* Left Column: Visual Image Showcase */}
      <div className="relative hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:overflow-hidden lg:bg-[#121212] lg:p-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/vendor.jpeg"
            alt="Synchub Creative Market Vendor Booth"
            fill
            className="object-cover opacity-45 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute -left-20 -top-20 size-80 rounded-full bg-[#4caf50]/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-[#1e88e5]/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <Link
            href="/vendor"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to vendor info
          </Link>
        </div>

        <div className="relative z-10 my-auto py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs font-medium text-[#4caf50] backdrop-blur-md">
            <Sparkles className="size-3" aria-hidden="true" /> Creative Week 2026
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white xl:text-5xl">
            Launch your brand. <br />
            <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
              Join the ecosystem.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
            Showcase your products and services directly to thousands of creatives, investors, and
            attendees at Synchub Creative Centre.
          </p>
        </div>

        <div className="relative z-10 border-t border-neutral-800/80 pt-6">
          <p className="text-xs text-neutral-500">
            Synchub Creative Centre, Abuja &bull; 23–28 November 2026
          </p>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:col-span-7 lg:px-16 lg:py-20">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6 lg:hidden">
            <Link
              href="/vendor"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to vendor info
            </Link>
          </div>

          <motion.div {...motionProps}>
            <p className="font-mono text-xs uppercase tracking-widest text-[#4caf50]">
              Vendor registration
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Apply for a spot
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Tell us about what you make. We review applications on a rolling basis and follow up
              by email.
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              {...motionProps}
              role="status"
              className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-[#121212] p-8 text-center shadow-2xl"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-[#4caf50]/10 text-[#4caf50]">
                <CheckCircle className="size-8" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white">
                Application received
              </h2>
              <p className="max-w-md text-sm text-neutral-400">
                Thanks for applying. The Synchub team reviews applications on a rolling basis and
                will follow up by email.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-4 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800"
              >
                <Link href="/vendor">Return to vendor info</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.form
              {...motionProps}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 space-y-6 rounded-2xl border border-neutral-800/80 bg-[#121212] p-6 shadow-2xl md:p-8"
            >
              {/* Honeypot — hidden from real users; bots tend to fill every field. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="companyUrl">Leave this field blank</label>
                <Input
                  ref={honeypotRef}
                  id="companyUrl"
                  name="companyUrl"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Field data-invalid={!!errors.businessName} className="gap-2">
                <FieldLabel htmlFor="business-name" className={labelClasses}>
                  Business or brand name
                </FieldLabel>
                <Input
                  id="business-name"
                  placeholder="e.g. Adaeze Prints"
                  aria-invalid={!!errors.businessName}
                  className={inputClasses}
                  {...register("businessName")}
                />
                {errors.businessName && <FieldError>{errors.businessName.message}</FieldError>}
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field data-invalid={!!errors.contactName} className="gap-2">
                  <FieldLabel htmlFor="contact-name" className={labelClasses}>
                    Contact name
                  </FieldLabel>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={!!errors.contactName}
                    className={inputClasses}
                    {...register("contactName")}
                  />
                  {errors.contactName && <FieldError>{errors.contactName.message}</FieldError>}
                </Field>

                <Field data-invalid={!!errors.phone} className="gap-2">
                  <FieldLabel htmlFor="phone" className={labelClasses}>
                    Phone number
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="080..."
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    className={inputClasses}
                    {...register("phone")}
                  />
                  {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                </Field>
              </div>

              <Field data-invalid={!!errors.email} className="gap-2">
                <FieldLabel htmlFor="email" className={labelClasses}>
                  Email address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={inputClasses}
                  {...register("email")}
                />
                {errors.email && <FieldError>{errors.email.message}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.category} className="gap-2">
                <FieldLabel htmlFor="category" className={labelClasses}>
                  Category
                </FieldLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="category"
                        aria-invalid={!!errors.category}
                        className="border-neutral-800 bg-neutral-900 text-white"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="border-neutral-800 bg-[#181818] text-neutral-200">
                        {VENDOR_CATEGORIES.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-neutral-800 focus:text-white"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && <FieldError>{errors.category.message}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.description} className="gap-2">
                <FieldLabel htmlFor="description" className={labelClasses}>
                  What do you make or offer?
                </FieldLabel>
                <Textarea
                  id="description"
                  placeholder="A couple of sentences is enough..."
                  rows={3}
                  aria-invalid={!!errors.description}
                  className={inputClasses}
                  {...register("description")}
                />
                {errors.description && <FieldError>{errors.description.message}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.website} className="gap-2">
                <FieldLabel htmlFor="website" className={labelClasses}>
                  Website or Instagram <span className="text-neutral-500">(optional)</span>
                </FieldLabel>
                <Input
                  id="website"
                  placeholder="instagram.com/yourbrand"
                  aria-invalid={!!errors.website}
                  className={inputClasses}
                  {...register("website")}
                />
                {errors.website && <FieldError>{errors.website.message}</FieldError>}
              </Field>

              <FieldSet data-invalid={!!errors.interests} className="gap-3">
                <FieldLegend className={labelClasses}>
                  What are you hoping to do at the event?
                </FieldLegend>
                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {VENDOR_INTERESTS.map((option) => (
                        <OptionCheckbox
                          key={option.value}
                          id={`interest-${option.value}`}
                          label={option.label}
                          checked={field.value.includes(option.value)}
                          onChange={(checked) =>
                            field.onChange(
                              checked
                                ? [...field.value, option.value]
                                : field.value.filter((value) => value !== option.value)
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                />
                {errors.interests && <FieldError>{errors.interests.message}</FieldError>}
              </FieldSet>

              <FieldSet data-invalid={!!errors.days} className="gap-3">
                <FieldLegend className={labelClasses}>Which days will you be there?</FieldLegend>
                {eventDays.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    Event days aren&apos;t available yet. Please check back shortly.
                  </p>
                ) : (
                  <Controller
                    name="days"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {eventDays.map((day) => (
                          <OptionCheckbox
                            key={day.id}
                            id={`day-${day.id}`}
                            label={day.title}
                            detail={dayFormatter.format(new Date(day.date))}
                            checked={field.value.includes(day.id)}
                            onChange={(checked) =>
                              field.onChange(
                                checked
                                  ? [...field.value, day.id]
                                  : field.value.filter((value) => value !== day.id)
                              )
                            }
                          />
                        ))}
                      </div>
                    )}
                  />
                )}
                {errors.days && <FieldError>{errors.days.message}</FieldError>}
              </FieldSet>

              {isError && (
                <p role="alert" className="flex items-center gap-2 text-[13px] text-[#e57373]">
                  <AlertCircle className="size-[14px] shrink-0" aria-hidden="true" />
                  {error instanceof Error ? error.message : "Something went wrong. Please try again."}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isPending || eventDays.length === 0}
                className="w-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isPending ? "Submitting..." : "Submit application"}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}