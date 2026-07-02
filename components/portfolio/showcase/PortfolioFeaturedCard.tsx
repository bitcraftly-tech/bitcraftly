"use client";

import { motion, useReducedMotion } from "framer-motion";

import { newTabProps } from "@/lib/newTabLink";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import { PS_BTN_PRIMARY, PS_CARD } from "@/lib/portfolioShowcaseTheme";
import { techStackBadgeClasses } from "@/lib/portfolioVisualUtils";

import "./portfolio-cards.css";

export default function PortfolioFeaturedCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={`${PS_CARD} ring-2 ring-[#8e44ad]/20 shadow-[0_2px_4px_rgba(15,23,42,0.04),0_20px_56px_-12px_rgba(142,68,173,0.2)] hover:shadow-[0_4px_8px_rgba(15,23,42,0.05),0_32px_64px_-16px_rgba(142,68,173,0.26)] lg:flex-row lg:items-stretch`}
    >
      <div className="ps-card-thumb relative flex min-h-[13rem] flex-1 items-center justify-center overflow-hidden rounded-t-[24px] bg-gradient-to-br from-[#9b59b6]/16 via-[#3498db]/10 to-[#fafbfc] lg:min-h-0 lg:max-w-[42%] lg:rounded-l-[24px] lg:rounded-tr-none">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#9b59b6]/12 via-transparent to-[#3498db]/12" aria-hidden />
        <div className="ps-thumb-shine" aria-hidden />
        <div className="relative z-[3] flex size-28 items-center justify-center sm:size-32">
          <div className="ps-thumb-orb flex size-full items-center justify-center">
            <span className="text-5xl sm:text-6xl" aria-hidden>
              ⚛️
            </span>
          </div>
        </div>
        <span className="absolute left-5 top-5 z-10 inline-flex rounded-full border border-white/50 bg-[#8e44ad] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_14px_rgba(142,68,173,0.35)] backdrop-blur-sm">
          Featured
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6 lg:p-8">
        <div className="space-y-3">
          <span className="ps-chip inline-flex rounded-full border border-[#9b59b6]/25 bg-[#9b59b6]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8e44ad]">
            Startup Solution
          </span>
          <h3 className="text-xl font-bold leading-tight tracking-tight text-[#2c3e50] sm:text-2xl">{PORTFOLIO_FEATURED.title}</h3>
          <p className="max-w-xl text-sm leading-relaxed text-[#7f8c8d] sm:text-base">{PORTFOLIO_FEATURED.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {PORTFOLIO_FEATURED.techStack.map((tech) => (
            <span
              key={tech}
              className={`ps-chip inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${techStackBadgeClasses(tech)}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="ps-card-actions mt-auto flex flex-wrap gap-2 pt-4">
          <a
            href={PORTFOLIO_FEATURED.demoHref}
            className={`${PS_BTN_PRIMARY} min-h-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e44ad]`}
            {...newTabProps(PORTFOLIO_FEATURED.demoHref)}
          >
            View platform demo
            <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 3H3v10h10v-3M9 2h5v5M7 9l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={PORTFOLIO_FEATURED.demoHref}
            className="ps-btn-ghost inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-[#2c3e50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e44ad]"
            {...newTabProps(PORTFOLIO_FEATURED.demoHref)}
          >
            Case Study
          </a>
        </div>
      </div>
    </motion.article>
  );
}
