import { Resend } from "resend";

// Same inbox + sender as the contact form, so there is one swap before launch.
const NOTIFICATION_TO = process.env.CONTACT_NOTIFICATION_EMAIL ?? "officialdeepinnacle@gmail.com";

const NOTIFICATION_FROM =
  process.env.EMAIL_FROM_ADDRESS ?? "Synchub Creative Week <notifications@synchubcreativeweek.com>";

export async function sendRegistrationNotification({
  name,
  email,
  phone,
  heardFrom,
  accessibilityNeeds,
  days,
  updated,
}: {
  name: string;
  email: string;
  phone: string;
  heardFrom: string;
  accessibilityNeeds?: string | null;
  days: { title: string; date: Date }[];
  updated: boolean;
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
    subject: `[Registration${updated ? " updated" : ""}] ${name} — ${days.length} ${days.length === 1 ? "day" : "days"}`,
    text: [
      updated ? "Updated registration" : "New registration",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Heard about us via: ${heardFrom}`,
      `Accessibility / dietary needs: ${accessibilityNeeds?.trim() || "None given"}`,
      "",
      "Days attending:",
      ...days.map((d) => `- ${fmt.format(d.date)} — ${d.title}`),
    ].join("\n"),
  });
}