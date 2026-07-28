"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS = [
  { value: "fashion", label: "Fashion & Style" },
  { value: "art", label: "Visual Art & Design" },
  { value: "food", label: "Food & Beverage" },
  { value: "tech", label: "Tech & Digital" },
  { value: "media", label: "Photography & Media" },
  { value: "craft", label: "Craft & Handmade" },
  { value: "other", label: "Other" },
] as const;

const INTEREST_OPTIONS = [
  { id: "sell", label: "Sell products" },
  { id: "service", label: "Offer a service" },
  { id: "presence", label: "Have a brand presence" },
  { id: "unsure", label: "Not sure yet" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function VendorRegistrationForm() {
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [interests, setInterests] = useState<Record<string, boolean>>({});

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: fadeUp,
        transition: { duration: 0.5 },
      };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function toggleInterest(id: string, checked: boolean) {
    setInterests((prev) => ({ ...prev, [id]: checked }));
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 lg:grid lg:grid-cols-12">
      {/* Left Column: Visual Image Showcase */}
      <div className="relative hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:overflow-hidden lg:bg-[#121212] lg:p-12">
        {/* Background Image with Ambient Glow Scrim */}
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

        {/* Content Overlay */}
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
            <Sparkles className="size-3" /> Creative Week 2026
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white xl:text-5xl">
            Launch your brand. <br />
            <span className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] bg-clip-text text-transparent">
              Join the ecosystem.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
            Showcase your products and services directly to thousands of creatives, investors, and attendees at Synchub Creative Centre.
          </p>
        </div>

        <div className="relative z-10 border-t border-neutral-800/80 pt-6">
          <p className="text-xs text-neutral-500">
            Synchub Creative Centre, Abuja &bull; 23–28 November 2026
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Registration Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:col-span-7 lg:px-16 lg:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {/* Mobile Back Link */}
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
              Tell us about what you make. We review applications on a rolling basis and follow up by email.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              {...motionProps}
              className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-[#121212] p-8 text-center shadow-2xl"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-[#4caf50]/10 text-[#4caf50]">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white">Application Received</h2>
              <p className="max-w-md text-sm text-neutral-400">
                Thanks for applying! This preview form demonstrates the interactive workflow. Once live, submissions create a application record in the system.
              </p>
              <Button asChild variant="outline" className="mt-4 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800">
                <Link href="/vendor">Return to vendor info</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.form
              {...motionProps}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 rounded-2xl border border-neutral-800/80 bg-[#121212] p-6 shadow-2xl md:p-8"
            >
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="business-name" className="text-sm font-medium text-neutral-200">
                  Business or brand name
                </Label>
                <Input
                  id="business-name"
                  name="businessName"
                  placeholder="e.g. Adaeze Prints"
                  className="border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]"
                  required
                />
              </div>

              {/* Contact Name & Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium text-neutral-200">
                    Contact name
                  </Label>
                  <Input
                    id="contact-name"
                    name="contactName"
                    placeholder="Your full name"
                    className="border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-neutral-200">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="080..."
                    className="border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-200">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-neutral-200">
                  Category
                </Label>
                <Select name="category">
                  <SelectTrigger id="category" className="border-neutral-800 bg-neutral-900 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="border-neutral-800 bg-[#181818] text-neutral-200">
                    {CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="focus:bg-neutral-800 focus:text-white">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-neutral-200">
                  What do you make or offer?
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="A couple of sentences is enough..."
                  rows={3}
                  className="border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]"
                  required
                />
              </div>

              {/* Website / Instagram */}
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-neutral-200">
                  Website or Instagram <span className="text-neutral-500">(optional)</span>
                </Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="instagram.com/yourbrand"
                  className="border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50]"
                />
              </div>

              {/* Goals / Checkboxes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-neutral-200">
                  What are you hoping to do at the event?
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {INTEREST_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      htmlFor={`interest-${option.id}`}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 text-xs text-neutral-300 transition-colors hover:border-neutral-700"
                    >
                      <Checkbox
                        id={`interest-${option.id}`}
                        checked={interests[option.id] ?? false}
                        onCheckedChange={(checked) => toggleInterest(option.id, checked === true)}
                        className="border-neutral-700 data-[state=checked]:bg-[#4caf50] data-[state=checked]:text-black"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit CTA Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Submit application
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}