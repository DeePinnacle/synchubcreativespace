import type { Metadata } from "next";
import { VendorRegistrationForm } from "@/features/vendor/components/vendor-registration-form";
import { getEventDayOptions } from "@/features/vendor/queries/get-event-by-day-options";

export const metadata: Metadata = {
  title: "Vendor Registration | Synchub Creative Week 2026",
  description: "Apply for a vendor spot at Synchub Creative Week 2026.",
};

// Event days come from the database, so render on request rather than at build time.
export const dynamic = "force-dynamic";

export default async function VendorRegisterPage() {
  const eventDays = await getEventDayOptions();
  return <VendorRegistrationForm eventDays={eventDays} />;
}