"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

import PortfolioAnimatedGrid from "@/components/portfolio/showcase/PortfolioAnimatedGrid";
import PortfolioDetailModal from "@/components/portfolio/showcase/PortfolioDetailModal";
import PortfolioFeaturedCard from "@/components/portfolio/showcase/PortfolioFeaturedCard";
import PortfolioFilterBar from "@/components/portfolio/showcase/PortfolioFilterBar";
import PortfolioShowcaseCta from "@/components/portfolio/showcase/PortfolioShowcaseCta";
import PortfolioShowcaseHero from "@/components/portfolio/showcase/PortfolioShowcaseHero";
import PortfolioAfterCta from "@/components/landing/PortfolioAfterCta";
import PortfolioWhyPerform from "@/components/landing/PortfolioWhyPerform";
import { CONTAINER, SECTION_PY_CTA, SECTION_SCROLL_MT } from "@/lib/constants";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import { filterPortfolioByCategory, type PortfolioCategoryId } from "@/lib/portfolio/categories";
import { enrichProjects, type PortfolioProject } from "@/lib/portfolio/projectUtils";
import type { PortfolioItem } from "@/lib/portfolioItems";
import { newTabProps } from "@/lib/newTabLink";
import { PORTFOLIO_LIGHT_WRAPPER, PS_SECTION } from "@/lib/portfolioShowcaseTheme";

export type PortfolioShowcaseVariant = "home" | "page";

type PortfolioShowcaseSectionProps = {
  variant: PortfolioShowcaseVariant;
  items: PortfolioItem[];
  filterLayoutId?: string;
};

export default function PortfolioShowcaseSection({
  variant,
  items,
  filterLayoutId,
}: PortfolioShowcaseSectionProps) {
  const [category, setCategory] = useState<PortfolioCategoryId>("all");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  useReducedMotion();

  const filtered = useMemo(() => enrichProjects(filterPortfolioByCategory(items, category)), [items, category]);
  const showFeatured = category === "all" || category === "startup-mvp" || category === "ui-systems";

  const isHome = variant === "home";
  const sectionId = isHome ? "portfolio" : undefined;
  const filterId = filterLayoutId ?? (isHome ? "portfolio-filter-home" : "portfolio-filter-page");

  const content = (
    <section
      id={sectionId}
      className={`${CONTAINER} ${PS_SECTION} ${SECTION_SCROLL_MT} ${SECTION_PY_CTA}`}
      aria-labelledby={isHome ? "portfolio-showcase-heading" : "portfolio-page-heading"}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[#9b59b6]/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-[#3498db]/[0.05] blur-3xl" />
      </div>

      <PortfolioShowcaseHero variant={variant} />

      {isHome ? (
        <div className="mt-4 flex justify-end">
          <Link href="/portfolio" className="text-sm font-semibold text-[#8e44ad] transition hover:text-[#9b59b6]" {...newTabProps("/portfolio")}>
            View full portfolio →
          </Link>
        </div>
      ) : null}

      <div className="relative mt-8 md:mt-10">
        <PortfolioFilterBar active={category} onChange={setCategory} items={items} layoutId={filterId} />
      </div>

      <div className="relative mt-8">
        <PortfolioAnimatedGrid projects={filtered} onOpenCaseStudy={setSelected} showFeaturedSeparately={showFeatured} />
      </div>

      {showFeatured ? (
        <div className="relative mt-6">
          <PortfolioFeaturedCard />
        </div>
      ) : null}

      <div className="relative mt-10 md:mt-12">
        <PortfolioShowcaseCta source={isHome ? "portfolio-home" : "portfolio-page"} />
      </div>
    </section>
  );

  if (isHome) {
    return (
      <div className={PORTFOLIO_LIGHT_WRAPPER}>
        {content}
        <PortfolioDetailModal project={selected} onClose={() => setSelected(null)} />
        <PortfolioWhyPerform light />
        <PortfolioAfterCta />
      </div>
    );
  }

  return (
    <div className={PORTFOLIO_LIGHT_WRAPPER}>
      {content}
      <PortfolioDetailModal project={selected} onClose={() => setSelected(null)} />
      <PortfolioWhyPerform light />
      <PortfolioAfterCta />
    </div>
  );
}
