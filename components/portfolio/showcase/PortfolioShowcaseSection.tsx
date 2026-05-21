"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import PortfolioAnimatedGrid from "@/components/portfolio/showcase/PortfolioAnimatedGrid";
import PortfolioDetailModal from "@/components/portfolio/showcase/PortfolioDetailModal";
import PortfolioFilterBar from "@/components/portfolio/showcase/PortfolioFilterBar";
import PortfolioShowcaseCta from "@/components/portfolio/showcase/PortfolioShowcaseCta";
import PortfolioTrustStrip from "@/components/portfolio/showcase/PortfolioTrustStrip";
import PortfolioAfterCta from "@/components/landing/PortfolioAfterCta";
import PortfolioWhyPerform from "@/components/landing/PortfolioWhyPerform";
import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO_LINK_ACCENT, PORTFOLIO_SECTION_ACCENT } from "@/lib/portfolioPalette";
import { PORTFOLIO } from "@/lib/portfolioContent";
import { filterPortfolioByCategory, type PortfolioCategoryId } from "@/lib/portfolio/categories";
import { enrichProjects, type PortfolioProject } from "@/lib/portfolio/projectUtils";
import type { PortfolioItem } from "@/lib/portfolioItems";
import { newTabProps } from "@/lib/newTabLink";

export type PortfolioShowcaseVariant = "home" | "page";

type PortfolioShowcaseSectionProps = {
  variant: PortfolioShowcaseVariant;
  items: PortfolioItem[];
  /** Unique layoutId for filter pill animation when multiple sections mount */
  filterLayoutId?: string;
};

export default function PortfolioShowcaseSection({
  variant,
  items,
  filterLayoutId,
}: PortfolioShowcaseSectionProps) {
  const [category, setCategory] = useState<PortfolioCategoryId>("all");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => enrichProjects(filterPortfolioByCategory(items, category)), [items, category]);

  const isHome = variant === "home";
  const sectionId = isHome ? "portfolio" : undefined;
  const filterId = filterLayoutId ?? (isHome ? "portfolio-filter-home" : "portfolio-filter-page");

  const header = (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7f8c8d] dark:text-[#bdc3c7]">{PORTFOLIO.eyebrow}</p>
        {isHome ? (
          <h2 id="portfolio-showcase-heading" className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            {PORTFOLIO.heading}
          </h2>
        ) : (
          <h1 id="portfolio-page-heading" className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl md:text-5xl">
            {PORTFOLIO.pageHeading}
          </h1>
        )}
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
          {isHome ? PORTFOLIO.intro : PORTFOLIO.pageIntro}
        </p>
        <p className="mt-2 max-w-3xl text-xs text-text-tertiary dark:text-dark-text-tertiary">{PORTFOLIO.introNote}</p>
      </div>
      {isHome ? (
        <Link href="/portfolio" className={`shrink-0 text-sm font-semibold ${PORTFOLIO_LINK_ACCENT}`} {...newTabProps("/portfolio")}>
          Full portfolio →
        </Link>
      ) : (
        <PortfolioShowcaseCta source="portfolio-page-header" compact />
      )}
    </motion.div>
  );

  const mainSection = (
    <section
      id={sectionId}
      className={`${CONTAINER} relative scroll-mt-24 ${isHome ? "border-t border-[#bdc3c7]/40 py-6 dark:border-[#34495e]/50 lg:py-8" : "py-10 md:py-14"}`}
      aria-labelledby={isHome ? "portfolio-showcase-heading" : "portfolio-page-heading"}
    >
      <div className={PORTFOLIO_SECTION_ACCENT} aria-hidden />
      {header}

      <div className="relative mt-8">
        <PortfolioTrustStrip />
      </div>

      <div className="relative mt-8">
        <PortfolioFilterBar active={category} onChange={setCategory} items={items} layoutId={filterId} />
      </div>

      <div className="relative mt-8">
        <PortfolioAnimatedGrid
          projects={filtered}
          onOpenCaseStudy={setSelected}
          layout={isHome ? "home" : "page"}
        />
      </div>

      {!isHome ? (
        <div className="relative mt-10">
          <PortfolioShowcaseCta source="portfolio-page-mid" />
        </div>
      ) : null}
    </section>
  );

  if (isHome) {
    return (
      <>
        {mainSection}
        <PortfolioDetailModal project={selected} onClose={() => setSelected(null)} />
        <PortfolioWhyPerform />
        <PortfolioAfterCta />
      </>
    );
  }

  return (
    <div className="bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      {mainSection}
      <section className={`${CONTAINER} border-t border-[#bdc3c7]/40 pb-4 dark:border-[#34495e]/50`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#7f8c8d]">{PORTFOLIO.structureTitle}</p>
      </section>
      <PortfolioDetailModal project={selected} onClose={() => setSelected(null)} />
      <PortfolioWhyPerform />
      <PortfolioAfterCta />
    </div>
  );
}
