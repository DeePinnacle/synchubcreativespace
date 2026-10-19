import { z } from "zod";

/** Edition of the event applications belong to. Pairs with email for the duplicate check. */
export const VENDOR_EVENT_YEAR = 2026;

// `value` strings mirror the VendorCategory / VendorInterest enums in prisma/schema.prisma.
export const VENDOR_CATEGORIES = [
  { value: "FASHION", label: "Fashion & Style" },
  { value: "ART", label: "Visual Art & Design" },
  { value: "FOOD", label: "Food & Beverage" },
  { value: "TECH", label: "Tech & Digital" },
  { value: "MEDIA", label: "Photography & Media" },
  { value: "CRAFT", label: "Craft & Handmade" },
  { value: "OTHER", label: "Other" },
] as const;

export const VENDOR_INTERESTS = [
  { value: "SELL", label: "Sell products" },
  { value: "SERVICE", label: "Offer a service" },
  { value: "PRESENCE", label: "Have a brand presence" },
  { value: "UNSURE", label: "Not sure yet" },
] as const;

export type VendorCategoryValue = (typeof VENDOR_CATEGORIES)[number]["value"];
export type VendorInterestValue = (typeof VENDOR_INTERESTS)[number]["value"];

const CATEGORY_VALUES = VENDOR_CATEGORIES.map((c) => c.value) as [
  VendorCategoryValue,
  ...VendorCategoryValue[],
];
const INTEREST_VALUES = VENDOR_INTERESTS.map((i) => i.value) as [
  VendorInterestValue,
  ...VendorInterestValue[],
];

export const vendorFormSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Enter your business or brand name")
    .max(120, "Keep the name under 120 characters"),
  contactName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "Keep the name under 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{7,20}$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(254, "That email address is too long"),
  category: z.enum(CATEGORY_VALUES, { message: "Select a category" }),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a little more about what you make or offer")
    .max(1000, "Keep this under 1,000 characters"),
  website: z.string().trim().max(200, "That link is too long"),
  interests: z.array(z.enum(INTEREST_VALUES)).min(1, "Pick at least one"),
  days: z.array(z.string().min(1)).min(1, "Pick at least one day"),
});

export type VendorFormValues = z.infer<typeof vendorFormSchema>;

export type SubmitVendorPayload = VendorFormValues & { honeypot?: string };

export type SubmitVendorResult = { ok: true } | { ok: false; error: string };

/** Plain, serialisable shape handed from the Server Component page to the client form. */
export type EventDayOption = {
  id: string;
  title: string;
  /** ISO string — Dates can't cross the server/client boundary cleanly. */
  date: string;
};