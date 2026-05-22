"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { atsBtnPrimary, atsBtnSecondary } from "@/lib/ats/theme";
import { CONTAINER } from "@/lib/constants";

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
      <div className={`${CONTAINER} relative py-12 md:py-16`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Sparkles className="size-3.5" aria-hidden />
            Careers at Bitcraftly
          </p>
          <h1 className="mt-5 max-w-4xl font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-[#0f172a] md:text-5xl lg:text-[3.25rem] dark:text-dark-text-primary">
            Build products that{" "}
            <span className="bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#2b5ce6] bg-clip-text text-transparent">
              SMBs actually use
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#64748b] dark:text-dark-text-secondary">
            Premium studio hiring — remote-first, founder-led reviews, and a modern stack. Join a small team shipping
            websites, apps, and AI-powered web solutions.
          </p>
          <p className="mt-3 max-w-xl text-sm text-[#94a3b8] dark:text-dark-text-tertiary">
            Every application is read by Sanjay — no keyword bots, no outsourced recruiters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/careers/apply" className={atsBtnPrimary}>
              Apply now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a href="#open-positions" className={atsBtnSecondary}>
              View open roles
            </a>
            <Link href="/team" className={atsBtnSecondary}>
              Meet the team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
