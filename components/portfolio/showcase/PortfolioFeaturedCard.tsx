"use client";

import { motion, useReducedMotion } from "framer-motion";

import { newTabProps } from "@/lib/newTabLink";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import { PS_FEATURED_CARD, PS_BTN_TEXT } from "@/lib/portfolioShowcaseTheme";
import { techStackBadgeClasses } from "@/lib/portfolioVisualUtils";

export default function PortfolioFeaturedCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={PS_FEATURED_CARD}
    >
      <div
        className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9b59b6]/15 to-[#3498db]/15 sm:size-20"
        aria-hidden
      >
        <span className="text-4xl">⚛️</span>
      </div>

      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full border border-[#9b59b6]/25 bg-[#9b59b6]/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#8e44ad]">
          Startup Solution
        </span>
        <h3 className="mt-2 text-lg font-bold text-[#2c3e50] sm:text-xl">{PORTFOLIO_FEATURED.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#7f8c8d]">{PORTFOLIO_FEATURED.description}</p>
        <a href={PORTFOLIO_FEATURED.demoHref} className={`mt-3 ${PS_BTN_TEXT}`} {...newTabProps(PORTFOLIO_FEATURED.demoHref)}>
          View platform demo →
        </a>
      </div>

      <ul className="flex shrink-0 flex-col gap-2 sm:min-w-[140px]">
        {PORTFOLIO_FEATURED.techStack.map((tech) => (
          <li key={tech} className="flex items-center justify-between gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${techStackBadgeClasses(tech)}`}>
              {tech}
            </span>
            <span className="text-[#bdc3c7]" aria-hidden>
              →
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
