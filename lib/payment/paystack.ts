// TARGET PATH: lib/payments/paystack.ts
//
// Thin wrapper around Paystack's REST API. Server-only — never imported
// from a client component (Section 8: client never talks to PSP secret
// keys). Test-mode keys work identically to live keys here; only the key
// prefix (sk_test_ / sk_live_) differs.

import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error("PAYSTACK_SECRET_KEY is not set");
  }
  return key;
}

export type PaystackChannel = "card" | "bank_transfer" | "ussd";

type InitializeTransactionInput = {
  email: string;
  /** Major currency unit (Naira) — converted to kobo internally. */
  amountNaira: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
  channels?: PaystackChannel[];
};

type InitializeTransactionResult = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

type PaystackApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export async function initializeTransaction(
  input: InitializeTransactionInput,
): Promise<InitializeTransactionResult> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount: Math.round(input.amountNaira * 100), // Paystack expects kobo
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata ?? {},
      channels: input.channels,
    }),
  });

  const json = (await response.json()) as PaystackApiResponse<InitializeTransactionResult>;

  if (!response.ok || !json.status) {
    throw new Error(json.message || "Failed to initialize Paystack transaction");
  }

  return json.data;
}

/**
 * Verifies the `x-paystack-signature` header per Paystack's documented
 * method: HMAC SHA512 of the RAW request body, keyed with the secret key
 * (Paystack does not issue a separate webhook-signing secret the way
 * Stripe does — it reuses PAYSTACK_SECRET_KEY).
 *
 * This is the ONLY thing allowed to gate a PAID status flip (Rule 6,
 * Section 8) — never trust the client redirect/callback alone.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;

  const expected = createHmac("sha512", getSecretKey()).update(rawBody).digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

// Mirrors the PaymentMethod enum (Section 6) minus INVOICE, which is
// sponsorship-only — matches Checkout-Sections.tsx's PAYMENT_METHODS.
export function paymentMethodToChannels(
  method: "CARD" | "BANK_TRANSFER" | "USSD",
): PaystackChannel[] {
  switch (method) {
    case "CARD":
      return ["card"];
    case "BANK_TRANSFER":
      return ["bank_transfer"];
    case "USSD":
      return ["ussd"];
  }
}