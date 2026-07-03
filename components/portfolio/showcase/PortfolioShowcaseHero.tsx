"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PORTFOLIO } from "@/lib/portfolioContent";

import "./portfolio-showcase.css";

type PortfolioShowcaseHeroProps = {
  variant: "home" | "page";
};

const SHOWCASE_STATS = PORTFOLIO.performanceMetrics.slice(0, 4);

export default function PortfolioShowcaseHero({ variant }: PortfolioShowcaseHeroProps) {
  const reduceMotion = useReducedMotion();
  const isPage = variant === "page";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="ps-showcase-hero"
    >
      <div className="ps-showcase-hero-copy">
        <p className="ps-showcase-eyebrow">{PORTFOLIO.featuredLabel}</p>
        {isPage ? (
          <h1 id="portfolio-page-heading" className="ps-showcase-heading">
            {PORTFOLIO.showcaseHeading}
          </h1>
        ) : (
          <h2 id="portfolio-showcase-heading" className="ps-showcase-heading">
            {PORTFOLIO.showcaseHeading}
          </h2>
        )}
        <p className="ps-showcase-lead">{isPage ? PORTFOLIO.showcaseDescription : PORTFOLIO.intro}</p>
        <p className="ps-showcase-note">{PORTFOLIO.introNote}</p>
      </div>

      <aside className="ps-showcase-stats" aria-label="Portfolio highlights">
        {SHOWCASE_STATS.map((stat) => (
          <div key={stat.label} className="ps-showcase-stat">
            <p className="ps-showcase-stat-value">{stat.value}</p>
            <p className="ps-showcase-stat-label">{stat.label}</p>
            <p className="ps-showcase-stat-note">{stat.note}</p>
          </div>
        ))}
      </aside>
    </motion.div>
  );
}
