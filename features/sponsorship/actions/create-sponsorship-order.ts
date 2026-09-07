// TARGET PATH: features/sponsorship/actions/create-sponsorship-order.ts
//
// Section 7, Sponsorship flow, step 4 ("pay online" branch only — the
// "request invoice" and "custom package" branches are explicitly out of
// scope for this pass per Deen's call). Creates a PENDING SponsorshipOrder,
// initializes payment with Paystack, and stores a matching PENDING Payment
// row. Does NOT flip showOnPartnersWall or create a PartnerLogo — those
// only happen once a verified webhook confirms payment (Rule 6), mirroring
// create-ticket-order.ts's separation of concerns.

"use server";

import { prisma } from "@/lib/prisma";
import { initializeTransaction, paymentMethodToChannels } from "@/lib/payment/paystack";
import {
  createSponsorshipOrderSchema,
  inferSponsorshipTierName,
  EXCLUSIVE_TIER_NAMES,
  type CreateSponsorshipOrderInput,
} from "@/features/sponsorship/types";

export type CreateSponsorshipOrderResult = {
  authorizationUrl: string;
};

export async function createSponsorshipOrder(
  input: CreateSponsorshipOrderInput,
): Promise<CreateSponsorshipOrderResult> {
  const parsed = createSponsorshipOrderSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid sponsorship details");
  }

  const { tierId, companyName, contactPerson, companyEmail, paymentMethod } = parsed.data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is not set");
  }

  const tierName = inferSponsorshipTierName(tierId);

  const tier = await prisma.sponsorshipTier.findFirst({ where: { name: tierName } });
  if (!tier) {
    // Fails loud rather than upserting a tier row on the fly — we don't
    // want to invent pricing/benefits. The 4 tiers need to be seeded ahead
    // of enabling this checkout path.
    throw new Error(
      `No SponsorshipTier row found for "${tierName}". Seed the sponsorship tiers before enabling checkout.`,
    );
  }
  if (tier.amount === null) {
    throw new Error(`SponsorshipTier "${tierName}" has no amount set — cannot charge for it.`);
  }

  if (EXCLUSIVE_TIER_NAMES.includes(tierName)) {
    const existingPaid = await prisma.sponsorshipOrder.findFirst({
      where: { tierId: tier.id, paymentStatus: "PAID" },
    });
    if (existingPaid) {
      throw new Error(
        `The ${tier.name} slot has already been claimed. Please choose another tier or contact our partnerships team.`,
      );
    }
  }

  // Sponsor.email has no @unique constraint in the current schema, so this
  // is a findFirst-then-create rather than a Prisma upsert — technically
  // race-condition-prone under concurrent submits from the same company.
  // Worth adding @unique to Sponsor.email in a future migration if that
  // becomes a real problem.
  let sponsor = await prisma.sponsor.findFirst({ where: { email: companyEmail } });
  if (sponsor) {
    sponsor = await prisma.sponsor.update({
      where: { id: sponsor.id },
      data: { companyName, contactPerson },
    });
  } else {
    sponsor = await prisma.sponsor.create({
      data: { companyName, contactPerson, email: companyEmail },
    });
  }

  const order = await prisma.sponsorshipOrder.create({
    data: {
      sponsorId: sponsor.id,
      tierId: tier.id,
      isCustom: false,
      paymentMethod,
      paymentStatus: "PENDING",
    },
  });

  try {
    // Using the SponsorshipOrder id as the Paystack reference, same
    // convention as create-ticket-order.ts.
    const transaction = await initializeTransaction({
      email: companyEmail,
      amountNaira: Number(tier.amount),
      reference: order.id,
      callbackUrl: `${appUrl}/sponsorship/success?reference=${order.id}`,
      channels: paymentMethodToChannels(paymentMethod),
      metadata: {
        sponsorshipOrderId: order.id,
        tierName,
      },
    });

    await prisma.payment.create({
      data: {
        provider: "paystack",
        providerReference: transaction.reference,
        amount: tier.amount,
        status: "PENDING",
        sponsorshipOrderId: order.id,
      },
    });

    // TODO (Section 7, step 5): notify the Synchub team by email on every
    // new sponsorship submission, regardless of path — needs
    // lib/email/send-sponsorship-notification.ts, which doesn't exist yet
    // (same gap as the ticket flow's confirmation email TODO).

    return { authorizationUrl: transaction.authorization_url };
  } catch (error) {
    // Paystack init failed — don't leave an orphaned PENDING order behind.
    // Sponsor row is left alone even if this was a brand-new sponsor: it's
    // harmless to keep and will just get reused on retry.
    await prisma.sponsorshipOrder.delete({ where: { id: order.id } });
    throw error instanceof Error
      ? error
      : new Error("Failed to start payment. Please try again.");
  }
}