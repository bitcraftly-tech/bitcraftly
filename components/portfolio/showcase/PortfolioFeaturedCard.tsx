"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import PortfolioCardThumbnail from "@/components/portfolio/showcase/PortfolioCardThumbnail";
import PortfolioMockupInterior from "@/components/portfolio/showcase/PortfolioMockupInterior";
import { newTabProps } from "@/lib/newTabLink";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import { enrichProject } from "@/lib/portfolio/projectUtils";
import { homePortfolioItems, slugifyPortfolioTitle } from "@/lib/portfolioItems";

import "./portfolio-cards.css";

const BTN_PRIMARY =
  "inline-flex min-h-12 w-full flex-1 items-center justify-center rounded-xl bg-[#7C3AED] px-5 text-sm font-semibold text-white transition-colors duration-250 hover:bg-[#6D28D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]";

const BTN_GHOST =
  "inline-flex min-h-12 w-full flex-1 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-5 text-sm font-semibold text-[#374151] transition-colors duration-250 hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]";

function formatCategoryLabel(projectFocus?: string) {
  if (!projectFocus) return "Featured Project";
  return projectFocus;
}

export default function PortfolioFeaturedCard() {
  const reduceMotion = useReducedMotion();

  const project = useMemo(() => {
    const item = homePortfolioItems.find((i) => slugifyPortfolioTitle(i.title) === PORTFOLIO_FEATURED.slug);
    return item ? enrichProject(item) : null;
  }, []);

  const highlights = project?.featureBullets ?? [];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group ps-featured-card"
      aria-labelledby="portfolio-featured-title"
    >
      <div className="ps-featured-preview-wrap">
        {project ? (
          <PortfolioCardThumbnail project={project} variant="featured" />
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
            <div className="flex items-center gap-1.5 border-b border-[#E5E7EB] bg-white px-2.5 py-2">
              <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
              <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
              <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
              <span className="ml-1 h-3.5 flex-1 rounded bg-[#F3F4F6]" aria-hidden />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-white">
              <div className="ps-featured-preview absolute inset-0 origin-center transition-transform duration-250 ease-out group-hover:scale-[1.02]">
                <PortfolioMockupInterior variant="generic" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ps-featured-body">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
            {formatCategoryLabel(project?.projectFocus)}
          </span>

          <h3
            id="portfolio-featured-title"
            className="text-[22px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px] lg:text-[32px]"
          >
            {PORTFOLIO_FEATURED.title}
          </h3>

          <p className="line-clamp-2 max-w-[600px] text-base leading-relaxed text-[#6B7280]">
            {PORTFOLIO_FEATURED.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PORTFOLIO_FEATURED.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-md bg-[#F3F4F6] px-2 py-0.5 text-xs font-medium text-[#2563EB]"
            >
              {tech}
            </span>
          ))}
        </div>

        {highlights.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Key Highlights</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                  <span className="size-1 shrink-0 rounded-full bg-[#2563EB]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:gap-3">
          <a href={`/${PORTFOLIO_FEATURED.slug}`} className={BTN_PRIMARY}>
            View Case Study
          </a>
          <a href={PORTFOLIO_FEATURED.demoHref} className={BTN_GHOST} {...newTabProps(PORTFOLIO_FEATURED.demoHref)}>
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}
