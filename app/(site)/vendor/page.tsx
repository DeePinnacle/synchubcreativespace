import type { Metadata } from "next";
import { VendorSections } from "@/components/sections/VendorSections";

export const metadata: Metadata = {
  title: "Become a Vendor | Synchub Creative Week 2026",
  description:
    "Sell, showcase, and connect with thousands of attendees at Synchub Creative Week 2026. Learn what being a vendor involves and apply for a spot.",
};

// Server Component — no data layer yet, so this page (and its section
// components) lives under components/sections/, not features/, per
// AGENT.md Rule 1. Move to features/vendor/ once applications are
// backed by a real Prisma model + server action.
export default function VendorPage() {
  return <VendorSections />;
}