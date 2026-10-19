import { Resend } from "resend";

// Same inbox + sender as the contact and registration emails, so there is one swap before launch.
const NOTIFICATION_TO = process.env.CONTACT_NOTIFICATION_EMAIL ?? "officialdeepinnacle@gmail.com";

const NOTIFICATION_FROM =
  process.env.EMAIL_FROM_ADDRESS ?? "Synchub Creative Week <notifications@synchubcreativeweek.com>";

export async function sendVendorNotification({
  businessName,
  contactName,
  email,
  phone,
  category,
  description,
  website,
  interests,
  days,
}: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  website?: string | null;
  interests: string[];
  days: { title: string; date: Date }[];
}) {
  const resend = new Resend(process.env.EMAIL_PROVIDER_API_KEY);

  const fmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Africa/Lagos",
  });

  await resend.emails.send({
    from: NOTIFICATION_FROM,
    to: NOTIFICATION_TO,
    replyTo: email,
    subject: `[Vendor application] ${businessName} — ${category}`,
    text: [
      "New vendor application",
      "",
      `Business: ${businessName}`,
      `Contact: ${contactName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Category: ${category}`,
      `Website / Instagram: ${website?.trim() || "None given"}`,
      `Hoping to: ${interests.join(", ")}`,
      "",
      "What they make or offer:",
      description,
      "",
      "Days attending:",
      ...days.map((d) => `- ${fmt.format(d.date)} — ${d.title}`),
    ].join("\n"),
  });
}