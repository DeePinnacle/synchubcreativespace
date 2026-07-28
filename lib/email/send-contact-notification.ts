import { Resend } from "resend";
import type { InquiryType } from "@/features/contact/types";

const resend = new Resend(process.env.EMAIL_PROVIDER_API_KEY);

// Hardcoded testing inbox per Deen's instruction — swap for the real
// Synchub team address via CONTACT_NOTIFICATION_EMAIL when ready.
const NOTIFICATION_TO = process.env.CONTACT_NOTIFICATION_EMAIL ?? "officialdeepinnacle@gmail.com";

const NOTIFICATION_FROM =
  process.env.EMAIL_FROM_ADDRESS ?? "Synchub Creative Week <notifications@synchubcreativeweek.com>";

export async function sendContactNotification({
  name,
  email,
  message,
  inquiryType,
}: {
  name: string;
  email: string;
  message: string;
  inquiryType: InquiryType;
}) {
  await resend.emails.send({
    from: NOTIFICATION_FROM,
    to: NOTIFICATION_TO,
    replyTo: email,
    subject: `[Contact — ${inquiryType}] New message from ${name}`,
    text: [
      "New contact form submission",
      "",
      `Type: ${inquiryType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });
}