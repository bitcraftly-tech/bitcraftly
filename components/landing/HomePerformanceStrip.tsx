import { MessageCircle, MonitorSmartphone, Search, Sparkles } from "lucide-react";

import LandingSectionEyebrow from "@/components/landing/LandingSectionEyebrow";
import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";

const ICONS = [MonitorSmartphone, MessageCircle, Search, Sparkles] as const;

export default function HomePerformanceStrip() {
  return (
    <section className={`${CONTAINER} scroll-mt-24 border-t border-[#eef2f7] bg-white py-10 md:py-12`}>
      <LandingSectionEyebrow>What we optimize on every engagement</LandingSectionEyebrow>
      <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-[#2c3e50] sm:text-3xl">
        {PORTFOLIO.whyPerformTitle}
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.performanceMetrics.map((metric, index) => {
          const Icon = ICONS[index] ?? Sparkles;
          return (
            <div key={metric.label} className="flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#4f46e5]">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-base font-bold text-[#2c3e50]">{metric.value}</p>
                <p className="mt-0.5 text-sm text-[#7f8c8d]">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
