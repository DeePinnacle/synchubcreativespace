// TARGET PATH: features/sponsorship/hooks/use-create-sponsorship-order.ts

"use client";

import { useMutation } from "@tanstack/react-query";
import { createSponsorshipOrder } from "@/features/sponsorship/actions/create-sponsorship-order";
import type { CreateSponsorshipOrderInput } from "@/features/sponsorship/types";

export function useCreateSponsorshipOrder() {
  return useMutation({
    mutationFn: (input: CreateSponsorshipOrderInput) => createSponsorshipOrder(input),
  });
}