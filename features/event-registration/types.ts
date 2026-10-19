import { z } from "zod";

export const REGISTRATION_SOURCES = [
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "X", label: "X (Twitter)" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "FRIEND", label: "Friend or colleague" },
  { value: "SYNCHUB", label: "Synchub Creative Centre" },
  { value: "OTHER", label: "Other" },
] as const;

const SOURCE_VALUES: string[] = REGISTRATION_SOURCES.map((s) => s.value);

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{7,20}$/, "Enter a valid phone number."),
  dayIds: z.array(z.string().min(1)).min(1, "Select at least one day."),
  heardFrom: z
    .string()
    .refine((v) => SOURCE_VALUES.includes(v), "Choose an option."),
  accessibilityNeeds: z.string().trim().max(500).optional(),
  // Honeypot — real users never see or fill this.
  hpContactRef: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export type RegisteredDay = { id: string; title: string; date: string };

export type RegistrationSuccess = {
  name: string;
  days: RegisteredDay[];
  updated: boolean;
};

export type RegistrationResult =
  | { ok: true; data: RegistrationSuccess }
  | { ok: false; error: string };

export type EventDayOption = { id: string; title: string; date: string };