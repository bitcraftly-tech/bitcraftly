'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import PortfolioCardThumbnail from '@/components/portfolio/showcase/PortfolioCardThumbnail';
import PortfolioMockupInterior from '@/components/portfolio/showcase/PortfolioMockupInterior';
import { newTabProps } from '@/lib/newTabLink';
import { PORTFOLIO_FEATURED } from '@/lib/portfolioContent';
import { enrichProject } from '@/lib/portfolio/projectUtils';
import { useMobileStaticEntrance } from '@/hooks/useMobileStaticEntrance';
import { getPortfolioPageItemBySlug } from '@/lib/portfolioItems';

import './portfolio-cards.css';

export default function PortfolioFeaturedCard() {
  const reduceMotion = useReducedMotion();
  const staticEntrance = useMobileStaticEntrance();
  const skipEntrance = reduceMotion || staticEntrance;

  const project = useMemo(() => {
    const item = getPortfolioPageItemBySlug(PORTFOLIO_FEATURED.slug);
    return item ? enrichProject(item) : null;
  }, []);

  return (
    <motion.article
      initial={skipEntrance ? false : { opacity: 0, y: 8 }}
      {...(skipEntrance
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 } })}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group ps-featured-card"
      aria-labelledby="portfolio-featured-title"
    >
      <div className="ps-featured-preview-wrap">
        {project ? (
          <PortfolioCardThumbnail project={project} variant="featured" />
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] dark:border-dark-border-primary dark:bg-dark-bg-secondary">
            <div className="flex items-center gap-1.5 border-b border-[#E5E7EB] bg-white px-2.5 py-2 dark:border-dark-border-primary dark:bg-dark-bg-card">
              <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
              <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
              <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
              <span className="ml-1 h-3.5 flex-1 rounded bg-[#F3F4F6]" aria-hidden />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-white dark:bg-dark-bg-card">
              <div className="ps-featured-preview absolute inset-0 origin-center transition-transform duration-250 ease-out group-hover:scale-[1.02]">
                <PortfolioMockupInterior variant="generic" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ps-featured-body">
        <div className="flex flex-col gap-3 lg:gap-3.5">
          <span className="inline-flex w-fit rounded-full border border-[#8e44ad]/15 bg-[#8e44ad]/[0.06] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#8e44ad] dark:border-indigo-400/20 dark:bg-indigo-950/30 dark:text-indigo-400">
            Featured Project
          </span>

          <div className="space-y-1.5">
            <h3
              id="portfolio-featured-title"
              className="text-[22px] font-bold leading-[1.2] tracking-tight text-[#111827] dark:text-dark-text-primary sm:text-[24px] lg:text-[26px]"
            >
              {PORTFOLIO_FEATURED.title}
            </h3>

            <p className="line-clamp-2 max-w-[520px] text-[13px] leading-relaxed text-[#6B7280] dark:text-dark-text-secondary sm:text-sm">
              {PORTFOLIO_FEATURED.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-0.5 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {PORTFOLIO_FEATURED.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex h-6 items-center rounded-md bg-[#8e44ad]/[0.08] px-2 text-[11px] font-medium text-[#7C3AED] dark:bg-indigo-950/40 dark:text-indigo-300 sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:flex-row md:w-auto md:justify-end">
              <a
                href={`/${PORTFOLIO_FEATURED.slug}`}
                className="group/btn-primary inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#8e44ad] px-4 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(124,58,237,0.22)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(124,58,237,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] sm:flex-1 md:w-auto md:flex-none md:px-5"
              >
                <span>View Case Study</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover/btn-primary:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={PORTFOLIO_FEATURED.demoHref}
                className="group/btn-demo inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#374151] transition-all duration-250 hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:border-dark-border-secondary dark:hover:bg-dark-bg-card sm:flex-1 md:w-auto md:flex-none md:px-5"
                {...newTabProps(PORTFOLIO_FEATURED.demoHref)}
              >
                <span>Interactive demo</span>
                <span
                  aria-hidden
                  className="inline-block text-[13px] transition-transform duration-200 group-hover/btn-demo:-translate-y-0.5 group-hover/btn-demo:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
