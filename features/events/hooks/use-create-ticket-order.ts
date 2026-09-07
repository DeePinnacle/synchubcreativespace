// TARGET PATH: features/tickets/hooks/use-create-ticket-order.ts

"use client";

import { useMutation } from "@tanstack/react-query";
import { createTicketOrder } from "@/features/events/actions/create-ticket-order";
import type { CreateTicketOrderInput } from "@/features/events/types";

export function useCreateTicketOrder() {
  return useMutation({
    mutationFn: (input: CreateTicketOrderInput) => createTicketOrder(input),
  });
}