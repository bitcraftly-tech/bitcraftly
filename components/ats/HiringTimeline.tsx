"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import AtsBadge from "@/components/ats/AtsBadge";
import { HIRING_PROCESS_STEPS } from "@/lib/ats/hiringProcess";
import { atsCard } from "@/lib/ats/theme";
import { CONTAINER } from "@/lib/constants";

export default function HiringTimeline() {
  return (
    <section id="hiring-process" className="border-t border-[#e2e8f0] bg-[#f8fafc] py-12 md:py-16 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Hiring process</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#0f172a] dark:text-dark-text-primary">
            Transparent, founder-led pipeline
          </h2>
          <p className="mt-3 text-[#64748b] dark:text-dark-text-secondary">
            From application to offer — clear stages, respectful timelines, and optional paid trial work.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-10 hidden lg:block">
          <div className="absolute left-0 right-0 top-[2.75rem] h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-indigo-500/30" aria-hidden />
          <ol className="grid grid-cols-6 gap-4">
            {HIRING_PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className={`${atsCard} relative z-10 flex h-full flex-col p-4 shadow-[0_4px_24px_rgba(15,23,42,0.05)] transition-shadow duration-300 group-hover:border-indigo-200 group-hover:shadow-[0_12px_40px_rgba(99,102,241,0.14)] dark:group-hover:border-indigo-500/40`}
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Step {step.step}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">{step.title}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748b] dark:text-dark-text-secondary">{step.description}</p>
                    {step.optional ? (
                      <AtsBadge variant="muted" className="mt-3 w-fit">
                        Optional
                      </AtsBadge>
                    ) : null}
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Mobile vertical flow */}
        <ol className="mt-8 space-y-4 lg:hidden">
          {HIRING_PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 28 }}
                className={`${atsCard} flex gap-4 p-4 shadow-[0_4px_24px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)]`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Step {step.step}</p>
                  <h3 className="text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">{step.title}</h3>
                  <p className="mt-1 text-xs text-[#64748b] dark:text-dark-text-secondary">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/careers/apply" className="inline-flex rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b] dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Apply now
          </Link>
          <a
            href="mailto:hello@bitcraftly.com?subject=Careers%20at%20Bitcraftly"
            className="inline-flex rounded-full border border-[#e2e8f0] px-6 py-3 text-sm font-semibold text-[#1e293b] dark:border-dark-border-primary dark:text-dark-text-primary"
          >
            hello@bitcraftly.com
          </a>
        </div>
      </div>
    </section>
  );
}
