import { Lightbulb, TrendingUp, AlertTriangle, Info } from "lucide-react";

import type { AiInsight } from "@/lib/analytics-dashboard/types";

type AiInsightsPanelProps = {
  insights: AiInsight[];
};

const ICONS = {
  positive: TrendingUp,
  neutral: Info,
  warning: AlertTriangle,
} as const;

const STYLES = {
  positive: "border-[#22C55E]/30 bg-[#22C55E]/5",
  neutral: "border-[#2563EB]/30 bg-[#2563EB]/5",
  warning: "border-amber-500/30 bg-amber-500/5",
} as const;

export default function AiInsightsPanel({ insights }: AiInsightsPanelProps) {
  return (
    <section className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white">
          <Lightbulb className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">AI Insights</h3>
          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Auto-generated from your data</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {insights.map((insight) => {
          const Icon = ICONS[insight.type];
          return (
            <article
              key={insight.id}
              className={`rounded-xl border p-4 transition-transform duration-300 hover:-translate-y-0.5 ${STYLES[insight.type]}`}
            >
              <div className="flex items-start gap-2.5">
                <Icon className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
                <div>
                  <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{insight.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                    {insight.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
