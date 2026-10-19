"use client";

import { useMutation } from "@tanstack/react-query";
import { submitVendorApplication } from "@/features/vendor/actions/submit-vendor-application";
import type { SubmitVendorPayload } from "@/features/vendor/types";

export function useSubmitVendorApplication() {
  return useMutation({
    mutationFn: async (values: SubmitVendorPayload) => {
      const result = await submitVendorApplication(values);
      if (!result.ok) {
        throw new Error(result.error);
      }
      return result;
    },
  });
}