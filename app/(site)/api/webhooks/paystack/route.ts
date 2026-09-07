// TARGET PATH: app/api/webhooks/paystack/route.ts
//
// Section 8: the ONLY place a TicketOrder/SponsorshipOrder/Payment is
// allowed to transition to PAID. Verifies the signature against the raw
// body before trusting anything in the payload (Rule 6).
//
// Now branches on which relation the Payment row has — ticketOrder or
// sponsorshipOrder — since Payment.ticketOrderId/sponsorshipOrderId are
// both optional (a Payment belongs to exactly one of the two).

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/payment/paystack";
import type { TicketTypeName } from "@/features/events/types";
// Imported directly from the generated client (not hand-rolled as a
// narrower union) because this enum has room to grow — the sponsorship
// seed script added a CUSTOM tier, which a hardcoded
// "HEADLINE" | "GOLD" | "SILVER" | "COMMUNITY" union would silently miss
// and fail to compile against. route.ts is server-only, so there's no
// client-bundle reason to avoid the generated-client import here the way
// features/sponsorship/types.ts does.
import type { SponsorshipTierName } from "@/lib/generated/client";

type WebhookMetadataItem = {
  day: string;
  title: string;
  quantity: number;
  price: number;
  type: TicketTypeName;
};

type PaystackWebhookEvent = {
  event: string;
  data: {
    reference: string;
    status: string;
    amount: number;
    metadata?: {
      ticketOrderId?: string;
      items?: WebhookMetadataItem[];
      sponsorshipOrderId?: string;
      tierName?: string;
    };
  };
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as PaystackWebhookEvent;

  // Ack anything we don't act on so Paystack doesn't retry-storm us.
  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const { reference, metadata } = event.data;

  const payment = await prisma.payment.findUnique({
    where: { providerReference: reference },
    include: {
      ticketOrder: true,
      sponsorshipOrder: { include: { sponsor: true, tier: true } },
    },
  });

  if (!payment) {
    console.error("Paystack webhook: no matching Payment for reference", reference);
    return NextResponse.json({ received: true });
  }

  // Idempotency guard — Paystack can deliver the same event more than once.
  if (payment.status === "PAID") {
    return NextResponse.json({ received: true });
  }

  if (payment.ticketOrder) {
    await handleTicketPayment(payment.id, payment.ticketOrder, metadata?.items ?? [], event);
  } else if (payment.sponsorshipOrder) {
    await handleSponsorshipPayment(payment.id, payment.sponsorshipOrder, event);
  } else {
    console.error("Paystack webhook: Payment has no ticketOrder or sponsorshipOrder", payment.id);
  }

  return NextResponse.json({ received: true });
}

async function handleTicketPayment(
  paymentId: string,
  ticketOrder: { id: string; buyerName: string; buyerEmail: string; buyerPhone: string },
  items: WebhookMetadataItem[],
  event: PaystackWebhookEvent,
) {
  const ticketOrderId = ticketOrder.id;
  const { buyerName, buyerEmail, buyerPhone } = ticketOrder;

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: paymentId },
      data: { status: "PAID", rawWebhookPayload: event as object },
    });

    await tx.ticketOrder.update({
      where: { id: ticketOrderId },
      data: { paymentStatus: "PAID" },
    });

    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        await tx.ticket.create({
          data: {
            type: item.type,
            price: item.price,
            orderId: ticketOrderId,
            // TODO: replace with a real QR payload once lib/qr/generate.ts
            // exists (Section 9 check-in tool depends on it). This is just
            // a unique placeholder so the schema's qrCode constraint holds.
            qrCode: randomUUID(),
            // Every ticket in an order currently gets the buyer's own
            // details as its Attendee — the checkout form only collects
            // one name/email/phone regardless of quantity. If per-ticket
            // attendee info is ever added to the form, this is where it
            // plugs in.
            attendee: {
              create: {
                name: buyerName,
                email: buyerEmail,
                phone: buyerPhone,
              },
            },
          },
        });
      }
    }
  });

  // TODO: send confirmation email via lib/email/send-confirmation.ts
  // (Section 7, step 7) once that module exists.
}

async function handleSponsorshipPayment(
  paymentId: string,
  sponsorshipOrder: {
    id: string;
    sponsorId: string;
    sponsor: { logoUrl: string | null };
    tier: { name: SponsorshipTierName };
  },
  event: PaystackWebhookEvent,
) {
  const sponsorshipOrderId = sponsorshipOrder.id;
  const { sponsorId, sponsor, tier } = sponsorshipOrder;

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: paymentId },
      data: { status: "PAID", rawWebhookPayload: event as object },
    });

    await tx.sponsorshipOrder.update({
      where: { id: sponsorshipOrderId },
      data: { paymentStatus: "PAID", showOnPartnersWall: true },
    });

    // PartnerLogo.logoUrl is a required field, and logo upload/storage
    // isn't wired yet (checkout form's companyLogo is optional — see
    // sponsorship-checkout-schema.ts). Rather than write a placeholder/
    // empty logoUrl into a record meant to render on the public Partners
    // Wall, we skip creating it until a real logo exists. showOnPartnersWall
    // is still flipped above, per Rule 6 — that part isn't blocked on this.
    // Plain create (not upsert) is safe here: the outer idempotency guard
    // in POST() already stops this whole branch from running a second time
    // for the same Payment, so there's no double-create risk to guard
    // against.
    if (sponsor.logoUrl) {
      await tx.partnerLogo.create({
        data: {
          sponsorId,
          logoUrl: sponsor.logoUrl,
          tierName: tier.name,
          visible: true,
        },
      });
    } else {
      console.warn(
        "Sponsorship payment confirmed but sponsor has no logoUrl yet — PartnerLogo not created",
        sponsorshipOrderId,
      );
    }
  });

  // TODO (Section 7, step 5 / step 6): confirmation email to the sponsor
  // and/or notification to the Synchub team once
  // lib/email/send-sponsorship-notification.ts exists.
}