// TARGET PATH: features/tickets/actions/create-ticket-order.ts
//
// Section 7, Ticket purchase flow, step 4. Creates a PENDING TicketOrder,
// initializes payment with Paystack, and stores a matching PENDING Payment
// row. Does NOT create Ticket/Attendee records — those only exist once a
// verified webhook flips the order to PAID (Rule 6, step 6). Cart line
// items are passed through as Paystack metadata rather than a new schema
// field, so the webhook can reconstruct what to create — see
// app/api/webhooks/paystack/route.ts.

"use server";

import { prisma } from "@/lib/prisma";
import { initializeTransaction, paymentMethodToChannels } from "@/lib/payment/paystack";
import {
  createTicketOrderSchema,
  inferTicketType,
  type CreateTicketOrderInput,
} from "@/features/events/types";

export type CreateTicketOrderResult = {
  authorizationUrl: string;
};

export async function createTicketOrder(
  input: CreateTicketOrderInput,
): Promise<CreateTicketOrderResult> {
  const parsed = createTicketOrderSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid checkout details");
  }

  const { buyerName, buyerEmail, buyerPhone, paymentMethod, items } = parsed.data;

  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is not set");
  }

  const order = await prisma.ticketOrder.create({
    data: {
      buyerName,
      buyerEmail,
      buyerPhone,
      quantity,
      totalAmount,
      paymentMethod,
      paymentStatus: "PENDING",
    },
  });

  try {
    // Using the TicketOrder id as the Paystack reference keeps the two
    // records trivially linkable and avoids a second unique-id generator.
    const transaction = await initializeTransaction({
      email: buyerEmail,
      amountNaira: totalAmount,
      reference: order.id,
      callbackUrl: `${appUrl}/events/success?reference=${order.id}`,
      channels: paymentMethodToChannels(paymentMethod),
      metadata: {
        ticketOrderId: order.id,
        items: items.map((item) => ({
          day: item.day,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          type: inferTicketType(item.title),
        })),
      },
    });

    await prisma.payment.create({
      data: {
        provider: "paystack",
        providerReference: transaction.reference,
        amount: totalAmount,
        status: "PENDING",
        ticketOrderId: order.id,
      },
    });

    return { authorizationUrl: transaction.authorization_url };
  } catch (error) {
    // Paystack init failed — don't leave an orphaned PENDING order behind.
    await prisma.ticketOrder.delete({ where: { id: order.id } });
    throw error instanceof Error
      ? error
      : new Error("Failed to start payment. Please try again.");
  }
}