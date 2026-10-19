"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RegistrationSuccess } from "../types";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Africa/Lagos",
});

export function RegistrationSuccessDialog({
  data,
  onClose,
}: {
  data: RegistrationSuccess | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const firstName = data?.name.split(" ")[0] ?? "";

  return (
    <Dialog open={data !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden border-white/10 bg-[#1a1a1a] text-[#f5f5f5] shadow-2xl shadow-black/60 sm:max-w-md">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#4caf50]/30 to-[#1e88e5]/30 blur-3xl"
        />
        <DialogHeader className="relative items-center text-center sm:text-center">
          <motion.div
            initial={reduce ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mb-2 grid size-16 place-items-center rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5] shadow-lg shadow-[#1e88e5]/30"
          >
            <Check className="size-8 text-white" strokeWidth={3} />
          </motion.div>
          <DialogTitle className="text-2xl">
            {data?.updated ? "Registration updated" : "You're registered"}, {firstName}
          </DialogTitle>
          <DialogDescription className="text-[#9e9e9e]">
            See you at Synchub Creative Week. These are the days you picked:
          </DialogDescription>
        </DialogHeader>

        <ul className="relative grid gap-2">
          {data?.days.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#212121] px-4 py-3 text-sm"
            >
              <span className="font-medium">{d.title}</span>
              <span className="text-[#9e9e9e]">{dateFmt.format(new Date(d.date))}</span>
            </li>
          ))}
        </ul>

        <DialogFooter className="relative gap-2 sm:justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-[#4caf50] to-[#1e88e5] text-white hover:opacity-90"
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="outline" onClick={onClose} className="border-white/15 bg-transparent">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}