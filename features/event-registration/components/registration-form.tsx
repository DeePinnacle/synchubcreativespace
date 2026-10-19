"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useRegister } from "../hooks/use-register";
import {
  REGISTRATION_SOURCES,
  registrationSchema,
  type EventDayOption,
  type RegistrationInput,
  type RegistrationSuccess,
} from "../types";
import { RegistrationSuccessDialog } from "./registration-success";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Africa/Lagos",
});

const fieldClass = "h-11 border-white/10 bg-[#1a1a1a] text-[#f5f5f5]";

export function RegistrationForm({
  days,
  defaultDayIds,
}: {
  days: EventDayOption[];
  defaultDayIds: string[];
}) {
  const [success, setSuccess] = useState<RegistrationSuccess | null>(null);
  const mutation = useRegister();

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dayIds: defaultDayIds,
      heardFrom: "",
      accessibilityNeeds: "",
      hpContactRef: "",
    },
  });

  function onSubmit(values: RegistrationInput) {
    mutation.mutate(values, {
      onSuccess: (data) => {
        setSuccess(data);
        form.reset({ ...form.formState.defaultValues, dayIds: [] });
      },
    });
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="relative rounded-2xl border border-white/10 bg-[#121212] p-5 shadow-xl shadow-black/40 sm:p-8"
      >
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px]"
          {...form.register("hpContactRef")}
        />

        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" className='text-slate-400'>Full name</FieldLabel>
                  <Input {...field} id="name" autoComplete="name" aria-invalid={fieldState.invalid} className={fieldClass} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone" className='text-slate-400'>Phone</FieldLabel>
                  <Input {...field} id="phone" type="tel" placeholder="+234…" autoComplete="tel" aria-invalid={fieldState.invalid} className={fieldClass} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className='text-slate-400'>Email</FieldLabel>
                <Input {...field} id="email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} className={fieldClass} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="dayIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label" className='text-slate-400'>Which days will you attend?</FieldLegend>
                <div className="grid gap-2.5">
                  {days.map((d, i) => {
                    const checked = field.value.includes(d.id);
                    return (
                      <label key={d.id} className="relative block cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={checked}
                          onChange={() =>
                            field.onChange(
                              checked
                                ? field.value.filter((id) => id !== d.id)
                                : [...field.value, d.id],
                            )
                          }
                        />
                        <span className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3.5 transition-colors peer-checked:border-[#4caf50]/60 peer-checked:bg-gradient-to-r peer-checked:from-[#4caf50]/15 peer-checked:to-[#1e88e5]/15 peer-focus-visible:ring-2 peer-focus-visible:ring-[#1e88e5]">
                          <span
                            className={`grid size-6 shrink-0 place-items-center rounded-md border transition-colors ${
                              checked
                                ? "border-transparent bg-gradient-to-r from-[#4caf50] to-[#1e88e5]"
                                : "border-[#9e9e9e]"
                            }`}
                          >
                            {checked && <Check className="size-4 text-white" strokeWidth={3} />}
                          </span>
                          <span className="min-w-[92px] font-mono text-xs text-[#9e9e9e]">
                            Day {i + 1} · {dateFmt.format(new Date(d.date))}
                          </span>
                          <span className="font-medium text-slate-300">{d.title}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <FieldDescription>
                  {field.value.length === 0
                    ? "No days selected"
                    : `${field.value.length} ${field.value.length === 1 ? "day" : "days"} selected`}
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldSet>
            )}
          />

          <Controller
            name="heardFrom"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="heardFrom" className='text-slate-400'>
                  How did you hear about the event?
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="heardFrom" aria-invalid={fieldState.invalid} className={`${fieldClass} w-full`}>
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#212121] text-[#f5f5f5]">
                    {REGISTRATION_SOURCES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="accessibilityNeeds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="needs" className='text-slate-400'>
                  Accessibility or dietary needs{" "}
                  <span className="font-normal text-[#9e9e9e]">(optional)</span>
                </FieldLabel>
                <Textarea {...field} id="needs" maxLength={500} className="min-h-24 border-white/10 bg-[#1a1a1a] text-[#f5f5f5]" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {mutation.isError && (
            <p role="alert" className="text-sm text-red-400">
              {mutation.error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] text-base font-semibold text-white shadow-lg shadow-[#1e88e5]/20 hover:opacity-90"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Registering…
              </>
            ) : (
              "Register"
            )}
          </Button>
        </FieldGroup>
      </form>

      <RegistrationSuccessDialog data={success} onClose={() => setSuccess(null)} />
    </>
  );
}