import type { Metadata } from "next";
import { VendorRegistrationForm } from "@/components/sections/VendorRegistrationForm";

export const metadata: Metadata = {
  title: "Vendor Registration | Synchub Creative Week 2026",
  description: "Apply for a vendor spot at Synchub Creative Week 2026.",
};

// UI only for now — no server action or Prisma model wired up yet.
// TODO(vendor-backend): once VendorApplication exists in prisma/schema.prisma,
// move this route's form logic into features/vendor/ (components, actions,
// hooks, types) per AGENT.md Rule 1, and wire submission through a
// TanStack Query mutation calling a server action, consistent with the
// tickets/sponsorship mutation pattern (AGENT.md Section 3, Rule 7).
export default function VendorRegisterPage() {
  return <VendorRegistrationForm />;
}