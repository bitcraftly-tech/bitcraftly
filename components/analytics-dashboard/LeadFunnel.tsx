"use client";

import { motion } from "framer-motion";

import ChartCard from "@/components/analytics-dashboard/ChartCard";
import type { FunnelStep } from "@/lib/analytics-dashboard/types";

type LeadFunnelProps = {
  steps: FunnelStep[];
};

export default function LeadFunnel({ steps }: LeadFunnelProps) {
  const max = steps[0]?.value ?? 1;

  return (
    <ChartCard title="Lead Funnel" subtitle="Visitor journey to converted clients" height="h-auto">
      <div className="space-y-3 py-2">
        {steps.map((step, index) => {
          const width = Math.max(12, Math.round((step.value / max) * 100));
          return (
            <div key={step.label} className="relative">
              <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-text-primary dark:text-dark-text-primary">
                  {index > 0 ? "→ " : ""}
                  {step.label}
                </span>
                <span className="font-semibold text-[#0F172A] dark:text-dark-text-primary">
                  {step.value.toLocaleString("en-IN")}
                  {index > 0 && step.rate !== undefined ? (
                    <span className="ml-1.5 text-text-tertiary">({step.rate}%)</span>
                  ) : null}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#22C55E]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
