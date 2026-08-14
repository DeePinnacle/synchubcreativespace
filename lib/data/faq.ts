// lib/data/faq.ts
// Static FAQ content. Not Prisma-backed (Section 6 has no FAQ model) — per
// project convention, static content lives here rather than in a component
// or a features/ folder. Swap to a CMS-backed features/faq/ layer if the
// Admin Dashboard ever needs to edit this content without redeploy.
//
// PLACEHOLDER COPY — content is flagged TBD in AGENT.md Section 12.
// Replace question/answer text with real copy before launch.

export type FaqCategoryId = "tickets" | "sponsorship" | "logistics" | "general";

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  iconId: "ticket" | "handshake" | "map-pin" | "circle-help";
}

export interface FaqItem {
  id: string;
  categoryId: FaqCategoryId;
  question: string;
  answer: string;
}

export const faqCategories: FaqCategory[] = [
  { id: "tickets", label: "Tickets", iconId: "ticket" },
  { id: "sponsorship", label: "Sponsorship", iconId: "handshake" },
  { id: "logistics", label: "Event Logistics", iconId: "map-pin" },
  { id: "general", label: "General", iconId: "circle-help" },
];

export const faqItems: FaqItem[] = [
  // Tickets
  {
    id: "tickets-types",
    categoryId: "tickets",
    question: "What ticket types are available?",
    answer:
      "Three tiers: Single Day, Full Week (all six days), and VIP, which adds priority seating and access to select networking sessions. Pricing is confirmed closer to the event.",
  },
  {
    id: "tickets-delivery",
    categoryId: "tickets",
    question: "How do I receive my ticket after paying?",
    answer:
      "Your QR-coded e-ticket is emailed the moment your payment is confirmed. No printing required — just bring the QR code on your phone to check-in.",
  },
  {
    id: "tickets-refund",
    categoryId: "tickets",
    question: "Can I get a refund or transfer my ticket?",
    answer:
      "Refund and transfer terms are outlined on our Terms, Privacy & Refund Policy page. In general, tickets are transferable to another attendee up until the day before the event.",
  },
  {
    id: "tickets-payment",
    categoryId: "tickets",
    question: "What payment methods are supported?",
    answer:
      "Card, bank transfer, and USSD, all processed securely through Paystack or Flutterwave. We never see or store your card details.",
  },

  // Sponsorship
  {
    id: "sponsorship-tiers",
    categoryId: "sponsorship",
    question: "What sponsorship tiers are available?",
    answer:
      "Four tiers: Headline Partner, Gold, Silver, and Community Supporter, each with a different benefits package. A Custom Package is also available for partners with specific goals.",
  },
  {
    id: "sponsorship-payment",
    categoryId: "sponsorship",
    question: "Do we have to pay online, or can we request an invoice?",
    answer:
      "Both paths are supported. Pay online for instant confirmation, or request an invoice and our team will follow up directly to arrange a bank transfer.",
  },
  {
    id: "sponsorship-logo",
    categoryId: "sponsorship",
    question: "When does our logo appear on the Partners Wall?",
    answer:
      "As soon as payment is confirmed, your logo goes live on the Partners Wall automatically. Invoice and custom-package sponsors are added once our team manually confirms payment.",
  },

  // Event Logistics
  {
    id: "logistics-location",
    categoryId: "logistics",
    question: "Where is the event held?",
    answer:
      "Synchub Creative Week 2026 runs at the Synchub Creative Centre in Abuja, Nigeria, from November 23–28.",
  },
  {
    id: "logistics-schedule",
    categoryId: "logistics",
    question: "Is there a different theme each day?",
    answer:
      "Yes — six themed days: Cultural Day, Business Growth, Film Makers Wednesday, Tech & Innovation, Community & Wellness, and the Grand Showcase & Awards. Full session times are on the Event Schedule page.",
  },
  {
    id: "logistics-parking",
    categoryId: "logistics",
    question: "Is parking available on-site?",
    answer:
      "On-site parking is available at the Synchub Creative Centre. We recommend arriving early on high-attendance days such as the Grand Showcase & Awards.",
  },

  // General
  {
    id: "general-about",
    categoryId: "general",
    question: "What is Synchub Creative Week?",
    answer:
      "A six-day creative industries event themed \"Future Forward: Reimagining Africa's Creative Power,\" and the flagship event of the Synchub Creative Centre's 1 Million Creatives mission.",
  },
  {
    id: "general-contact",
    categoryId: "general",
    question: "I have a question that isn't answered here — who do I contact?",
    answer:
      "Reach out through our Contact Us page and our team will get back to you directly.",
  },
];