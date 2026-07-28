"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContactMessage } from "@/features/contact/actions/submit-contact-message";
import type { SubmitContactPayload } from "@/features/contact/types";

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (values: SubmitContactPayload) => {
      const result = await submitContactMessage(values);
      if (!result.ok) {
        throw new Error(result.error);
      }
      return result;
    },
  });
}