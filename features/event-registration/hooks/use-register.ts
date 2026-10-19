"use client";

import { useMutation } from "@tanstack/react-query";
import { createRegistration } from "../actions/create-registration";
import type { RegistrationInput } from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: async (values: RegistrationInput) => {
      const result = await createRegistration(values);
      if (!result.ok) throw new Error(result.error);
      return result.data;
    },
  });
}