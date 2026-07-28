"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useCartStore, selectItemCount, selectSubtotal } from "@/lib/stores/cart-store";

// Rule 4: static ICON_MAP at module level, never inline.
const ICON_MAP: Record<string, LucideIcon> = {
  card: CreditCard,
  bank: Landmark,
  ussd: Smartphone,
};

// Mirrors the PaymentMethod enum (Section 6) minus INVOICE, which is
// sponsorship-only. No submission logic yet — UI only, per current scope.
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
  id: string;
  label: string;
  description: string;
  icon: keyof typeof ICON_MAP;
}[];

// What happens after the user clicks "Pay" for each method — the actual
// card/bank/USSD entry UI is rendered by the PSP itself (Paystack/
// Flutterwave hosted checkout, per Section 8), never on our site. This copy
// just sets expectations for what they'll see next.
const PAYMENT_METHOD_HELP: Record<(typeof PAYMENT_METHODS)[number]["id"], string> = {
  CARD: "You'll be redirected to a secure payment page to enter your card details. We never see or store your card number.",
  BANK_TRANSFER:
    "You'll receive a one-time account number on the next screen — transfer the exact amount to confirm your order.",
  USSD: "You'll get a short USSD code to dial from your registered phone number to complete payment.",
};

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export function CheckoutSections() {
  const reduceMotion = useReducedMotion();

  const items = useCartStore((state) => state.items);
  const itemCount = useCartStore(selectItemCount);
  const subtotal = useCartStore(selectSubtotal);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<(typeof PAYMENT_METHODS)[number]["id"]>(
    "CARD",
  );

  // TODO: replace with features/tickets/actions/create-ticket-order.ts
  // (Section 7, Ticket purchase flow) once the data layer exists. That
  // action should read useCartStore().items + this form state, initialize
  // payment via lib/payments/{paystack,flutterwave}.ts, and only call
  // clearCart() after a verified webhook flips the order to PAID (Rule 6).
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  if (items.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-white">
        <GradientBackdrop />
        <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <ShoppingBag className="h-7 w-7 text-slate-700" strokeWidth={1.75} />
            </div>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Your cart is empty
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            Add a ticket from the schedule to get started with checkout.
          </p>
          <Link
            href="/schedule"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(30,136,229,0.45)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Browse the schedule
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <GradientBackdrop />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Link
          href="/schedule"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to schedule
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
            Checkout
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Review your tickets and enter your details to continue.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
          {/* Buyer details + payment method */}
          <motion.form
            onSubmit={handleSubmit}
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Your details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              We&apos;ll send your e-tickets to this email.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="buyerName" className="sm:col-span-2">
                <input
                  id="buyerName"
                  name="buyerName"
                  type="text"
                  autoComplete="name"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputClassName}
                />
              </Field>

              <Field label="Email address" htmlFor="buyerEmail">
                <input
                  id="buyerEmail"
                  name="buyerEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="ada@email.com"
                  className={inputClassName}
                />
              </Field>

              <Field label="Phone number" htmlFor="buyerPhone">
                <input
                  id="buyerPhone"
                  name="buyerPhone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="080X XXX XXXX"
                  className={inputClassName}
                />
              </Field>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-900">Payment method</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = ICON_MAP[method.icon];
                  const active = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
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
                  key={paymentMethod}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mt-3 text-xs leading-relaxed text-slate-500"
                >
                  {PAYMENT_METHOD_HELP[paymentMethod]}
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(30,136,229,0.5)] transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
            >
              Pay {currency.format(subtotal)}
            </button>

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
              <span className="text-xs font-medium text-slate-500">
                {itemCount} ticket{itemCount === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-linear-to-r from-primary to-secondary px-2 py-0.5 text-[11px] font-semibold text-white">
                        {item.day}
                      </span>
                      <span className="text-xs text-slate-500">
                        {dateFormatter.format(new Date(item.date))}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{item.title}</span>
                    <span className="text-xs text-slate-500">
                      {currency.format(item.price)} each
                    </span>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                    <span className="text-sm font-semibold text-slate-900">
                      {currency.format(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${item.title}`}
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-900">{currency.format(subtotal)}</span>
              </div>
              {/* TODO: surface PSP transaction fee (~1.5%, Section 8) here once
                  it's decided whether fees are passed through to the buyer. */}
              <div className="flex items-center justify-between text-base font-semibold">
                <span className="text-slate-900">Total</span>
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {currency.format(subtotal)}
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

function Field({
  label,
  htmlFor,
  className,
  children,
}: Readonly<{
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const inputClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}