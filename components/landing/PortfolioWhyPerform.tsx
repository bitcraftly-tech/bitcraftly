"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CONTAINER, SECTION_PY_COMPACT } from "@/lib/constants";
import { useMobileStaticEntrance } from "@/hooks/useMobileStaticEntrance";
import { PORTFOLIO } from "@/lib/portfolioContent";

type PortfolioWhyPerformProps = {
  light?: boolean;
};

const WHY_EYEBROWS = ["Lead paths", "Performance", "Core Web Vitals", "AI + sales"] as const;

function PerformCard({
  eyebrow,
  title,
  description,
  index,
}: {
  eyebrow: string;
  title: string;
  description: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const staticEntrance = useMobileStaticEntrance();
  const skipEntrance = reduceMotion || staticEntrance;

  return (
    <motion.article
      initial={skipEntrance ? false : { opacity: 0, y: 12 }}
      {...(skipEntrance
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 } })}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-250 hover:-translate-y-1 hover:border-[#D1D5DB] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:border-indigo-500/25"
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#16a085] via-[#8e44ad] to-[#16a085] transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />

      <span className="inline-flex w-fit rounded-full border border-[#16a085]/15 bg-[#16a085]/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0d9488] dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-400">
        {eyebrow}
      </span>

      <h3 className="mt-3 text-base font-bold leading-snug tracking-tight text-[#7C3AED] sm:text-lg dark:text-indigo-400">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280] dark:text-dark-text-secondary">{description}</p>
    </motion.article>
  );
}

export default function PortfolioWhyPerform({ light }: PortfolioWhyPerformProps) {
  const border = light ? "border-[#e8ecef] dark:border-dark-border-primary" : "border-[#bdc3c7]/40 dark:border-[#34495e]/50";
  const eyebrow = light ? "text-[#8e44ad] dark:text-indigo-400" : "text-text-secondary dark:text-dark-text-secondary";
  const title = light ? "text-[#2c3e50] dark:text-dark-text-primary" : "text-text-primary dark:text-dark-text-primary";
  const body = light ? "text-[#7f8c8d] dark:text-dark-text-secondary" : "text-text-secondary dark:text-dark-text-secondary";

  const metrics = PORTFOLIO.performanceMetrics.map((metric) => ({
    eyebrow: metric.label,
    title: metric.value,
    description: metric.note,
  }));

  const points = PORTFOLIO.whyPerformPoints.map((point, i) => ({
    eyebrow: WHY_EYEBROWS[i] ?? "Focus",
    title: point.title,
    description: point.body,
  }));

  const allCards = [...metrics, ...points];

  return (
    <div className={`${CONTAINER} border-t ${border} ${SECTION_PY_COMPACT} ${light ? "bg-[#fafbfc] dark:bg-dark-bg-primary" : ""}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
          light
            ? "border-[#E5E7EB] bg-white text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
            : "border-border-primary bg-bg-card text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
        }`}
      >
        <span className="size-1.5 rounded-full bg-[#16a085]" aria-hidden />
        {PORTFOLIO.performanceSectionTitle}
      </span>

      <h2 className={`mt-4 font-[var(--font-playfair)] text-2xl font-semibold tracking-tight sm:text-3xl ${title}`}>
        {PORTFOLIO.whyPerformTitle}
      </h2>
      <p className={`mt-3 max-w-3xl text-sm leading-relaxed sm:text-[15px] ${body}`}>{PORTFOLIO.whyPerformIntro}</p>

      <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {allCards.map((card, index) => (
          <PerformCard
            key={`${card.eyebrow}-${card.title}`}
            eyebrow={card.eyebrow}
            title={card.title}
            description={card.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
