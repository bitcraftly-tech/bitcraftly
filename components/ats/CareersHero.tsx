"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { scrollToElementWithRetry } from "@/lib/scrollToMarketingSection";

import { atsBtnPrimary, atsBtnSecondary } from "@/lib/ats/theme";
import { CONTAINER, MARKETING_BELOW_BREADCRUMB_PT } from "@/lib/constants";

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -30%, rgba(99, 102, 241, 0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(43, 92, 230, 0.1), transparent 50%)",
        }}
      />
      <div className={`${CONTAINER} relative pb-12 md:pb-16 ${MARKETING_BELOW_BREADCRUMB_PT}`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
            Careers at Bitcraftly
          </p>
          <h1 className="mt-3 w-full max-w-none font-[var(--font-playfair)] text-3xl font-semibold text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            Build products that{" "}
            <span className="bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#2b5ce6] bg-clip-text text-transparent">
              SMBs actually use
            </span>
          </h1>
          <p className="mt-4 w-full max-w-none text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Premium studio hiring — remote-first, founder-led reviews, and a modern stack. Join a small team shipping
            websites, apps, and AI-powered web solutions.
          </p>
          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
            Every application is read by Sanjay — no keyword bots, no outsourced recruiters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/careers/apply" className={atsBtnPrimary}>
              Apply now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <button type="button" onClick={() => scrollToElementWithRetry("open-positions")} className={atsBtnSecondary}>
              View open roles
            </button>
            <Link href="/team" className={atsBtnSecondary}>
              Meet the team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
