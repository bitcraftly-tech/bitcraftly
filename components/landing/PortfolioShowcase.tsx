"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import PortfolioAfterCta from "@/components/landing/PortfolioAfterCta";
import PortfolioProjectCard from "@/components/landing/PortfolioProjectCard";
import PortfolioWhyPerform from "@/components/landing/PortfolioWhyPerform";
import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, type PortfolioCategoryId } from "@/lib/portfolioContent";
import { filterPortfolioByCategory, homePortfolioItems } from "@/lib/portfolioItems";
import { newTabProps } from "@/lib/newTabLink";

export default function PortfolioShowcase() {
  const [category, setCategory] = useState<PortfolioCategoryId>("all");
  const filtered = useMemo(() => filterPortfolioByCategory(homePortfolioItems, category), [category]);

  return (
    <>
      <section id="portfolio" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.eyebrow}</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">{PORTFOLIO.heading}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">{PORTFOLIO.intro}</p>
            <p className="mt-2 max-w-3xl text-xs text-text-tertiary dark:text-dark-text-tertiary">{PORTFOLIO.introNote}</p>
          </div>
          <Link href="/portfolio" className="shrink-0 text-sm font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300" {...newTabProps("/portfolio")}>
            Full portfolio →
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
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

        <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <PortfolioProjectCard key={p.title} item={p} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-6 text-sm text-text-secondary dark:text-dark-text-secondary">No projects in this category yet — try All work or contact us for a custom build.</p>
        ) : null}
      </section>

      <PortfolioWhyPerform />
      <PortfolioAfterCta />
    </>
  );
}
