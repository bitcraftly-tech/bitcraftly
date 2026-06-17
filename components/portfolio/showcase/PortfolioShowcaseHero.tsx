"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { PORTFOLIO } from "@/lib/portfolioContent";
import { newTabProps } from "@/lib/newTabLink";
import { PS_EYEBROW, PS_HEADING, PS_HERO_BADGE } from "@/lib/portfolioShowcaseTheme";

type PortfolioShowcaseHeroProps = {
  variant: "home" | "page";
  revampLayout?: boolean;
};

export default function PortfolioShowcaseHero({ variant, revampLayout = false }: PortfolioShowcaseHeroProps) {
  const reduceMotion = useReducedMotion();
  const isPage = variant === "page";

  if (revampLayout && !isPage) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="min-w-0 flex-1"
      >
        <p className={PS_EYEBROW}>{PORTFOLIO.featuredLabel}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h2 id="portfolio-showcase-heading" className="text-3xl font-bold tracking-tight text-[#2c3e50] sm:text-4xl">
            {PORTFOLIO.showcaseHeading}
          </h2>
          <Link
            href="/portfolio"
            className="shrink-0 text-sm font-semibold text-[#4f46e5] transition hover:text-[#6366f1]"
            {...newTabProps("/portfolio")}
          >
            View all portfolio →
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#7f8c8d]">{PORTFOLIO.showcaseDescription}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
    >
      <div className="max-w-2xl">
        <p className={PS_EYEBROW}>{PORTFOLIO.featuredLabel}</p>
        {isPage ? (
          <h1 id="portfolio-page-heading" className={`mt-3 ${PS_HEADING}`}>
            {PORTFOLIO.showcaseHeading}
          </h1>
        ) : (
          <h2 id="portfolio-showcase-heading" className={`mt-3 ${PS_HEADING}`}>
            {PORTFOLIO.showcaseHeading}
          </h2>
        )}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#7f8c8d]">
          {isPage ? PORTFOLIO.showcaseDescription : PORTFOLIO.intro}
        </p>
        {isPage ? (
          <p className="mt-3 text-sm text-[#95a5a6]">{PORTFOLIO.introNote}</p>
        ) : (
          <p className="mt-2 text-sm text-[#95a5a6]">{PORTFOLIO.introNote}</p>
        )}
      </div>

      <aside className={`${PS_HERO_BADGE} max-w-sm shrink-0 lg:mt-2`}>
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] text-white shadow-[0_4px_14px_rgba(142,68,173,0.35)]"
          aria-hidden
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L6 21l2.3-7-6-4.6h7.6L12 2z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-[#2c3e50]">{PORTFOLIO.experienceBadgeTitle}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-[#7f8c8d]">{PORTFOLIO.experienceBadgeBody}</p>
        </div>
      </aside>
    </motion.div>
  );
}
