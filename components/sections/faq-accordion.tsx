"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, Ticket, Handshake, MapPin, CircleHelp } from "lucide-react";
import type { FaqCategory, FaqCategoryId, FaqItem } from "@/lib/data/faq"

// Local icon resolution. If lib/icons.ts ICON_MAP already exports these,
// swap this map for `ICON_MAP` to keep icon registration centralized —
// left inline here since this file doesn't cross a server/client prop
// boundary (Rule 4 only requires ICON_MAP where component refs travel
// server -> client).
const CATEGORY_ICON_MAP = {
  ticket: Ticket,
  handshake: Handshake,
  "map-pin": MapPin,
  "circle-help": CircleHelp,
} as const;

interface FaqAccordionProps {
  categories: FaqCategory[];
  items: FaqItem[];
}

const ALL_CATEGORY = "all" as const;
type FilterValue = FaqCategoryId | typeof ALL_CATEGORY;

export function FaqAccordion({ categories, items }: FaqAccordionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const activeCategory = (searchParams.get("category") as FilterValue) ?? ALL_CATEGORY;
  const [openId, setOpenId] = useState<string | null>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? items
        : items.filter((item) => item.categoryId === activeCategory),
    [items, activeCategory]
  );

  function setCategory(next: FilterValue) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL_CATEGORY) {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    setOpenId(null);
    router.push(params.size ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="mx-auto w-full max-w-3xl mb-66">
      {/* Category filter — reflected in the URL per Rule 5 so results stay shareable */}
      <div
        role="tablist"
        aria-label="Filter FAQs by category"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        <FilterPill
          label="All questions"
          active={activeCategory === ALL_CATEGORY}
          onClick={() => setCategory(ALL_CATEGORY)}
        />
        {categories.map((category) => {
          const Icon = CATEGORY_ICON_MAP[category.iconId];
          return (
            <FilterPill
              key={category.id}
              label={category.label}
              icon={Icon}
              active={activeCategory === category.id}
              onClick={() => setCategory(category.id)}
            />
          );
        })}
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                layout={!prefersReducedMotion}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-[#f5f5f5]">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    className="shrink-0 rounded-full bg-white/5 p-1.5"
                  >
                    <ChevronDown className="h-4 w-4 text-[#9e9e9e]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#9e9e9e]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visibleItems.length === 0 && (
          <p className="py-12 text-center text-sm text-[#9e9e9e]">
            No questions in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-transparent bg-gradient-to-r from-[#4caf50] to-[#1e88e5] text-black"
          : "border-white/10 text-[#e0e0e0] hover:border-white/20 hover:bg-white/5"
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}