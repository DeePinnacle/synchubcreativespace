"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Landmark,
  ShieldCheck,
  Smartphone,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { getSponsorshipTier } from "@/lib/data/sponsorship-tiers";
import {
  sponsorshipCheckoutSchema,
  SPONSORSHIP_PAYMENT_METHODS,
  type SponsorshipCheckoutFormValues,
} from "@/components/sections/sponsorships/schema/sponsorship-checkout-schema";
import { useCreateSponsorshipOrder } from "@/features/sponsorship/hooks/use-create-sponsorship-order";

// Only Headline Partner is scarcity-limited per the tier copy ("Category
// exclusivity"). Derived here rather than added to the shared SponsorshipTier
// type so the card grid's data model stays untouched.
function isExclusiveTier(tierId: string) {
  return tierId === "headline";
}

// Rule 4: static ICON_MAP at module level, never inline. Mirrors the pattern
// in components/sections/Checkout-Sections.tsx (tickets) — duplicated here
// rather than shared, matching that file's precedent of a local map rather
// than lib/icons.ts. Worth consolidating into lib/icons.ts later if a third
// checkout-style flow needs the same three icons.
const ICON_MAP: Record<string, LucideIcon> = {
  card: CreditCard,
  bank: Landmark,
  ussd: Smartphone,
};

// Mirrors the PaymentMethod enum (Section 6) minus INVOICE — sponsorship is
// direct-payment only for all four tiers per current scope, same as tickets.
// `id` is checked against SPONSORSHIP_PAYMENT_METHODS (the schema's source
// of truth) via `satisfies`, so this UI list can't silently drift from what
// the Zod schema accepts.
const PAYMENT_METHODS = [
  {
    id: "CARD",
    label: "Card",
    description: "Debit or credit card",
    icon: "card",
  },
  {
    id: "BANK_TRANSFER",
    label: "Bank Transfer",
    description: "Direct bank transfer",
    icon: "bank",
  },
  {
    id: "USSD",
    label: "USSD",
    description: "Pay with a USSD code",
    icon: "ussd",
  },
] as const satisfies readonly {
  id: (typeof SPONSORSHIP_PAYMENT_METHODS)[number];
  label: string;
  description: string;
  icon: keyof typeof ICON_MAP;
}[];

// What happens after "Pay" for each method — the actual card/bank/USSD entry
// UI is rendered by the PSP itself (Paystack/Flutterwave hosted checkout,
// per Section 8), never on our site.
const PAYMENT_METHOD_HELP: Record<(typeof PAYMENT_METHODS)[number]["id"], string> = {
  CARD: "You'll be redirected to a secure payment page to enter your card details. We never see or store your card number.",
  BANK_TRANSFER:
    "You'll receive a one-time account number on the next screen — transfer the exact amount to confirm your sponsorship.",
  USSD: "You'll get a short USSD code to dial from your registered phone number to complete payment.",
};

export function SponsorshipCheckoutSections({ tierId }: Readonly<{ tierId: string }>) {
  const reduceMotion = useReducedMotion();
  const createSponsorshipOrder = useCreateSponsorshipOrder();

  const form = useForm<SponsorshipCheckoutFormValues>({
    resolver: zodResolver(sponsorshipCheckoutSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      companyEmail: "",
      paymentMethod: "CARD",
    },
  });

  // Looked up here rather than passed down from the Server Component parent:
  // SponsorshipTier.icon holds a React component reference, which cannot be
  // serialized across the server/client boundary as a prop (this is what
  // threw "Functions cannot be passed directly to Client Components").
  // page.tsx already validates tierId and 404s on a miss, so this is a
  // client-side re-lookup of the same static data, same pattern
  // SponsorshipSection.tsx already uses for the card grid.
  const tier = getSponsorshipTier(tierId);

  if (!tier) {
    // Defensive only — page.tsx's notFound() should already have caught an
    // invalid tierId before this ever renders. Guard sits below every hook
    // above (useReducedMotion, useForm) so hook call order stays identical
    // on every render — Rules of Hooks.
    return null;
  }

  const TierIcon = tier.icon;
  const exclusive = isExclusiveTier(tier.id);
  // Captured as a plain string here, outside the onSubmit closure below —
  // TypeScript's narrowing from the `if (!tier)` guard above doesn't carry
  // across a closure boundary, so referencing `tier.id` directly inside
  // onSubmit would still show as "possibly undefined" even though it can't
  // actually be. Capturing it into its own already-typed const sidesteps
  // that entirely.
  const resolvedTierId = tier.id;
  const paymentMethod = form.watch("paymentMethod");
  const companyLogoFiles = form.watch("companyLogo");
  const companyLogo = companyLogoFiles?.[0];

  // Logo upload isn't sent here — companyLogo stays client-only until
  // storage is wired (see the ASSUMPTION note in
  // sponsorship-checkout-schema.ts and create-sponsorship-order.ts).
  // showOnPartnersWall/PartnerLogo only flip after a verified webhook, per
  // Rule 6 — this submit only ever gets the user to Paystack's hosted page.
  async function onSubmit(values: SponsorshipCheckoutFormValues) {
    const { authorizationUrl } = await createSponsorshipOrder.mutateAsync({
      tierId: resolvedTierId,
      companyName: values.companyName,
      contactPerson: values.contactPerson,
      companyEmail: values.companyEmail,
      paymentMethod: values.paymentMethod,
    });

    window.location.href = authorizationUrl;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <GradientBackdrop />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Link
          href="/sponsorship"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sponsorship packages
        </Link>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-6"
        >
          <span className="inline-flex items-center rounded-full border border-secondary/40 px-4 py-1.5 text-xs font-medium tracking-wide text-secondary">
            Synchub Creative Week 2026
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sponsorship Checkout
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Confirm your details to lock in the {tier.name} package.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
          {/* Company details + payment method */}
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Company details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              We&apos;ll send your sponsorship confirmation and invoice to this email.
            </p>

            <FieldGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Controller
                name="companyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                    <FieldLabel htmlFor="companyName" className="text-sm font-medium text-slate-700">
                      Company name
                    </FieldLabel>
                    <input
                      {...field}
                      id="companyName"
                      type="text"
                      autoComplete="organization"
                      aria-invalid={fieldState.invalid}
                      placeholder="Synchub Creative Centre"
                      className={inputClassName}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
                  </Field>
                )}
              />

              <Controller
                name="contactPerson"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contactPerson" className="text-sm font-medium text-slate-700">
                      Contact person
                    </FieldLabel>
                    <input
                      {...field}
                      id="contactPerson"
                      type="text"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ada Lovelace"
                      className={inputClassName}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
                  </Field>
                )}
              />

              <Controller
                name="companyEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="companyEmail" className="text-sm font-medium text-slate-700">
                      Company email
                    </FieldLabel>
                    <input
                      {...field}
                      id="companyEmail"
                      type="email"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="partnerships@company.com"
                      className={inputClassName}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
                  </Field>
                )}
              />

              <Controller
                name="companyLogo"
                control={form.control}
                render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                    <FieldLabel htmlFor="companyLogo" className="text-sm font-medium text-slate-700">
                      Company logo
                    </FieldLabel>
                    <label
                      htmlFor="companyLogo"
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50/60 px-3.5 py-3 text-sm text-slate-500 transition-colors hover:border-secondary hover:bg-secondary/5"
                    >
                      <UploadCloud className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="truncate">
                        {companyLogo ? companyLogo.name : "Upload a logo (PNG, JPG, or SVG)"}
                      </span>
                    </label>
                    <input
                      id="companyLogo"
                      name={name}
                      ref={ref}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.files)}
                      aria-invalid={fieldState.invalid}
                      className="sr-only"
                    />
                    <FieldDescription>
                      PNG, JPG, or SVG, up to 5MB. Used on the Partners Wall once your sponsorship
                      is confirmed.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="mt-8">
              <Controller
                name="paymentMethod"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend variant="label" className="text-sm font-semibold text-slate-900">
                      Payment method
                    </FieldLegend>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = ICON_MAP[method.icon];
                        const active = field.value === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => field.onChange(method.id)}
                            aria-pressed={active}
                            className={cn(
                              "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200",
                              active
                                ? "border-transparent bg-linear-to-br from-primary/10 to-secondary/10 ring-2 ring-secondary/50"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full",
                                active
                                  ? "bg-linear-to-r from-primary to-secondary text-white"
                                  : "bg-slate-100 text-slate-600",
                              )}
                            >
                              <Icon className="h-4 w-4" strokeWidth={2} />
                            </span>
                            <span className="text-sm font-semibold text-slate-900">
                              {method.label}
                            </span>
                            <span className="text-xs text-slate-500">{method.description}</span>
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={field.value}
                        initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="mt-3 text-xs leading-relaxed text-slate-500"
                      >
                        {PAYMENT_METHOD_HELP[field.value]}
                      </motion.p>
                    </AnimatePresence>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
                  </FieldSet>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={form.formState.isSubmitting || createSponsorshipOrder.isPending}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(30,136,229,0.5)] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {createSponsorshipOrder.isPending ? "Redirecting to payment…" : `Pay ${tier.priceNGN}`}
            </button>

            {createSponsorshipOrder.isError && (
              <p className="mt-3 text-xs font-medium text-red-600">
                {createSponsorshipOrder.error instanceof Error
                  ? createSponsorshipOrder.error.message
                  : "Something went wrong starting your payment. Please try again."}
              </p>
            )}

            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Payments are processed securely by our payment partner.
            </p>
          </motion.form>

          {/* Order summary */}
          <motion.aside
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.12)] lg:sticky lg:top-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Order summary
              </h2>
              <Link
                href="/sponsorship"
                className="text-xs font-medium text-secondary hover:underline"
              >
                Change tier
              </Link>
            </div>

            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${tier.color}1a`, color: tier.color }}
                  >
                    <TierIcon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-900">{tier.name}</span>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{tier.tagline}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block text-sm font-semibold text-slate-900">
                    {tier.priceNGN}
                  </span>
                  <span className="block text-xs text-slate-400">{tier.priceUSD}</span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" strokeWidth={2.5} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {exclusive && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  This is an exclusive tier — only one {tier.name} slot is available for
                  Synchub Creative Week 2026.
                </span>
              </div>
            )}

            <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-900">{tier.priceNGN}</span>
              </div>
              {/* TODO: surface PSP transaction fee (~1.5%, Section 8) here once
                  it's decided whether fees are passed through to the buyer. */}
              <div className="flex items-center justify-between text-base font-semibold">
                <span className="text-slate-900">Total</span>
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {tier.priceNGN}
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

function GradientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(76,175,80,0.14),rgba(30,136,229,0.10),transparent)] blur-3xl" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[360px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(30,136,229,0.10),transparent)] blur-3xl" />
    </div>
  );
}

const inputClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}