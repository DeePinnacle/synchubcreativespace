"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { LegalPolicy, LegalPolicyId } from "@/lib/data/legal";

interface LegalTabsProps {
  policies: LegalPolicy[];
}

const DEFAULT_POLICY: LegalPolicyId = "terms";

export function LegalTabs({ policies }: LegalTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const activeId = (searchParams.get("section") as LegalPolicyId) ?? DEFAULT_POLICY;
  const activePolicy = policies.find((p) => p.id === activeId) ?? policies[0];

  function setSection(next: LegalPolicyId) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === DEFAULT_POLICY) {
      params.delete("section");
    } else {
      params.set("section", next);
    }
    router.push(params.size ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Section tabs — URL-synced per Rule 5 so a direct link to Refund Policy works */}
      <div
        role="tablist"
        aria-label="Legal policy section"
        className="relative mb-12 flex justify-center gap-1 border-b border-white/10"
      >
        {policies.map((policy) => {
          const isActive = policy.id === activePolicy.id;
          return (
            <button
              key={policy.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSection(policy.id)}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                isActive ? "text-[#f5f5f5]" : "text-[#9e9e9e] hover:text-[#e0e0e0]"
              }`}
            >
              {policy.label}
              {isActive && (
                <motion.span
                  layoutId="legal-tab-underline"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                  className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-[#4caf50] to-[#1e88e5]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active policy */}
      <motion.div
        key={activePolicy.id}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#9e9e9e]">
          Last updated{" "}
          {new Date(activePolicy.lastUpdated).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="mb-10 text-base leading-relaxed text-[#e0e0e0]">{activePolicy.intro}</p>

        <div className="flex flex-col gap-8">
          {activePolicy.clauses.map((clause) => (
            <div key={clause.id} className="border-l-2 border-white/10 pl-5">
              <h2 className="mb-2 font-mono text-sm font-medium text-[#f5f5f5]">
                {clause.heading}
              </h2>
              <p className="text-sm leading-relaxed text-[#9e9e9e]">{clause.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}