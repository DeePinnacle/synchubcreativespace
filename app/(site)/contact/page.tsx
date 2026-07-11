import type { Metadata } from "next";
import { ContactSection } from "@/features/contact/components/Contact-Us";

export const metadata: Metadata = {
  title: "Contact — Synchub Creative Week 2026",
  description:
    "Get in touch with the Synchub Creative Week 2026 team — tickets, sponsorship, press, and general inquiries.",
};

export default function ContactPage() {
  return <ContactSection />;
}