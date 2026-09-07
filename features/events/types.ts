// TARGET PATH: features/tickets/types.ts

import { z } from "zod";

// Mirrors CartTicketItem (lib/stores/cart-store.ts) minus the client-only
// synthesized `id` — the server doesn't need it. Keep in sync per the note
// in cart-store.ts.
export const ticketCartItemSchema = z.object({
  day: z.enum(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"]),
  date: z.string(),
  title: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export type TicketCartItem = z.infer<typeof ticketCartItemSchema>;

export const createTicketOrderSchema = z.object({
  buyerName: z.string().trim().min(2, "Enter your full name"),
  buyerEmail: z.string().trim().email("Enter a valid email"),
  buyerPhone: z.string().trim().min(7, "Enter a valid phone number"),
  paymentMethod: z.enum(["CARD", "BANK_TRANSFER", "USSD"]),
  items: z.array(ticketCartItemSchema).min(1, "Your cart is empty"),
});

export type CreateTicketOrderInput = z.infer<typeof createTicketOrderSchema>;

export type TicketTypeName = "SINGLE_DAY" | "FULL_WEEK" | "VIP";

/**
 * ASSUMPTION — flagged per Deen's call: the cart only carries `day` +
 * free-text `title`, not an explicit Ticket.type. This keyword-matches the
 * title to infer SINGLE_DAY / FULL_WEEK / VIP. If the Tickets page
 * (app/(site)/tickets) titles don't contain these words, every item will
 * silently fall through to SINGLE_DAY — worth a quick sanity check against
 * the real titles once that page exists.
 */
export function inferTicketType(title: string): TicketTypeName {
  const normalized = title.toLowerCase();

  if (normalized.includes("vip")) return "VIP";

  if (
    normalized.includes("full week") ||
    normalized.includes("week pass") ||
    normalized.includes("all 6 days") ||
    normalized.includes("all six days")
  ) {
    return "FULL_WEEK";
  }

  return "SINGLE_DAY";
}