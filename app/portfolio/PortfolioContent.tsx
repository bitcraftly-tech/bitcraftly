"use client";

import { useMemo, useState } from "react";

import PortfolioAfterCta from "@/components/landing/PortfolioAfterCta";
import PortfolioProjectCard from "@/components/landing/PortfolioProjectCard";
import PortfolioWhyPerform from "@/components/landing/PortfolioWhyPerform";
import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, type PortfolioCategoryId } from "@/lib/portfolioContent";
import { filterPortfolioByCategory, portfolioPageItems } from "@/lib/portfolioItems";

export default function PortfolioContent() {
  const [category, setCategory] = useState<PortfolioCategoryId>("all");
  const filtered = useMemo(() => filterPortfolioByCategory(portfolioPageItems, category), [category]);

  return (
    <div className="bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <section className={`${CONTAINER} py-10 md:py-14`}>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.eyebrow}</p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl md:text-5xl">{PORTFOLIO.pageHeading}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.pageIntro}</p>
        <p className="mt-3 max-w-3xl text-sm text-text-tertiary dark:text-dark-text-tertiary">{PORTFOLIO.introNote}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                category === cat.id
                  ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300"
                  : "border-border-primary bg-bg-card text-text-secondary hover:border-border-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className={`${CONTAINER} border-t border-border-primary pb-8 dark:border-dark-border-primary`}>
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PortfolioProjectCard key={item.title} item={item} showDetails linkToCaseStudy />
          ))}
        </div>
      </section>

      <PortfolioWhyPerform />
      <PortfolioAfterCta />
    </div>
  );
}
