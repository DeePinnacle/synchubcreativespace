// lib/data/legal.ts
// Static legal/policy content. No Prisma model backs this (Section 6) and
// wording is flagged TBD (Section 5 sitemap) — placeholder copy only.
// Replace with reviewed legal text before launch; do not treat this as
// binding language.

export type LegalPolicyId = "terms" | "privacy" | "refund";

export interface LegalClause {
  id: string;
  heading: string;
  body: string;
}

export interface LegalPolicy {
  id: LegalPolicyId;
  label: string;
  lastUpdated: string; // ISO date, placeholder
  intro: string;
  clauses: LegalClause[];
}

export const legalPolicies: LegalPolicy[] = [
  {
    id: "terms",
    label: "Terms of Service",
    lastUpdated: "2026-08-14",
    intro:
      "These Terms govern your use of the Synchub Creative Week website and your purchase of tickets or sponsorship packages through it.",
    clauses: [
      {
        id: "terms-acceptance",
        heading: "1. Acceptance of terms",
        body: "By purchasing a ticket, submitting a sponsorship application, or otherwise using this site, you agree to these Terms. If you do not agree, please do not use the site.",
      },
      {
        id: "terms-tickets",
        heading: "2. Ticket purchases",
        body: "All ticket sales are processed through our payment partners, Paystack and Flutterwave. A ticket is confirmed only once payment is verified server-side — a successful checkout screen alone does not guarantee entry.",
      },
      {
        id: "terms-sponsorship",
        heading: "3. Sponsorship agreements",
        body: "Sponsorship packages purchased online are confirmed on verified payment. Sponsors paying by invoice are confirmed once our team verifies receipt of funds. Benefits listed per tier are indicative and may be adjusted with notice.",
      },
      {
        id: "terms-conduct",
        heading: "4. User conduct",
        body: "Attendees, sponsors, and vendors are expected to behave respectfully on-site and online. We reserve the right to refuse or revoke entry for conduct that disrupts the event or endangers other attendees.",
      },
      {
        id: "terms-ip",
        heading: "5. Intellectual property",
        body: "All branding, photography, and content on this site belong to Synchub Creative Centre unless otherwise credited. Do not reproduce without permission.",
      },
      {
        id: "terms-liability",
        heading: "6. Limitation of liability",
        body: "Synchub Creative Week is not liable for indirect losses arising from event changes, delays, or third-party payment processing issues, to the extent permitted by law.",
      },
      {
        id: "terms-changes",
        heading: "7. Changes to these terms",
        body: "We may update these Terms as the event approaches. Material changes will be reflected on this page with an updated date.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    lastUpdated: "2026-08-14",
    intro:
      "This Privacy Policy explains what information we collect when you interact with Synchub Creative Week, and how we use it.",
    clauses: [
      {
        id: "privacy-collect",
        heading: "1. Information we collect",
        body: "We collect the details you provide when buying a ticket, submitting a sponsorship or vendor application, or contacting us — such as your name, email, phone number, and organization.",
      },
      {
        id: "privacy-use",
        heading: "2. How we use your information",
        body: "We use this information to process your ticket or sponsorship, send confirmations and event updates, and respond to enquiries submitted through our Contact form.",
      },
      {
        id: "privacy-payment",
        heading: "3. Payment data",
        body: "We never see or store your card details. Payments are handled entirely by our PCI-DSS compliant partners, Paystack and Flutterwave, on their own hosted checkout pages.",
      },
      {
        id: "privacy-sharing",
        heading: "4. Data sharing",
        body: "We do not sell your information. Data is shared only with the service providers that power the site — including our payment processors and email provider — solely to deliver the services above.",
      },
      {
        id: "privacy-cookies",
        heading: "5. Cookies",
        body: "We use minimal, functional cookies to keep your cart and checkout session working correctly. We do not use cookies for third-party advertising.",
      },
      {
        id: "privacy-rights",
        heading: "6. Your rights",
        body: "You may request a copy of the data we hold about you, or ask us to correct or delete it, by contacting us through the Contact Us page.",
      },
      {
        id: "privacy-contact",
        heading: "7. Contact",
        body: "Questions about this policy can be sent through our Contact Us page and our team will respond directly.",
      },
    ],
  },
  {
    id: "refund",
    label: "Refund Policy",
    lastUpdated: "2026-08-14",
    intro:
      "This policy covers refunds, transfers, and cancellations for tickets and sponsorship packages purchased through this site.",
    clauses: [
      {
        id: "refund-tickets",
        heading: "1. Ticket refunds",
        body: "Tickets are refundable up to 14 days before the event date. Requests within 14 days of the event are handled on a case-by-case basis.",
      },
      {
        id: "refund-transfers",
        heading: "2. Ticket transfers",
        body: "Tickets can be transferred to another attendee free of charge up until the day before the event. Contact us with the new attendee's details to process a transfer.",
      },
      {
        id: "refund-sponsorship",
        heading: "3. Sponsorship refunds",
        body: "Sponsorship payments are refundable up to 30 days before the event, minus any costs already committed on the sponsor's behalf (e.g. printed materials, booth setup).",
      },
      {
        id: "refund-cancellation",
        heading: "4. Event cancellation or postponement",
        body: "If Synchub Creative Week is cancelled, all ticket and sponsorship payments will be refunded in full. If postponed, existing tickets and sponsorships carry over to the new date automatically.",
      },
      {
        id: "refund-request",
        heading: "5. How to request a refund",
        body: "Submit a request through our Contact Us page with your order details. Approved refunds are returned to the original payment method within 5–10 business days.",
      },
    ],
  },
];