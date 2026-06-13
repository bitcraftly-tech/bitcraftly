import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import AnimatedCounter from "@/components/analytics-dashboard/AnimatedCounter";

type KpiCardProps = {
  label: string;
  value: number;
  format?: "number" | "percent" | "currency";
  trend?: number;
  icon?: ReactNode;
  accent?: "primary" | "accent" | "default";
};

function formatValue(value: number, format: KpiCardProps["format"]): { display: number; prefix: string; suffix: string; decimals: number } {
  if (format === "percent") return { display: value, prefix: "", suffix: "%", decimals: 1 };
  if (format === "currency") return { display: value, prefix: "₹", suffix: "", decimals: 0 };
  return { display: value, prefix: "", suffix: "", decimals: 0 };
}

export default function KpiCard({ label, value, format = "number", trend, icon, accent = "default" }: KpiCardProps) {
  const { display, prefix, suffix, decimals } = formatValue(value, format);
  const accentRing =
    accent === "primary"
      ? "from-[#2563EB]/10 to-transparent"
      : accent === "accent"
        ? "from-[#22C55E]/10 to-transparent"
        : "from-slate-500/5 to-transparent";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB]/30 hover:shadow-lg dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:border-[#2563EB]/40">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentRing} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary dark:text-dark-text-tertiary">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-dark-text-primary sm:text-3xl">
            <AnimatedCounter value={display} prefix={prefix} suffix={suffix} decimals={decimals} />
          </p>
          {trend !== undefined ? (
            <p
              className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                trend >= 0 ? "text-[#22C55E]" : "text-rose-500"
              }`}
            >
              {trend >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {Math.abs(trend)}% vs last period
            </p>
          ) : null}
        </div>
        {icon ? (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20">
            {icon}
          </div>
        ) : null}
      </div>
    </article>
  );
}
