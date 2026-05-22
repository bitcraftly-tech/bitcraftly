"use client";

import { motion } from "framer-motion";
import { Globe, Heart, Zap } from "lucide-react";

import { BENEFITS, CULTURE_PILLARS } from "@/lib/ats/hiringProcess";
import { atsCard } from "@/lib/ats/theme";
import { CONTAINER } from "@/lib/constants";

export default function CultureBenefits() {
  return (
    <>
      <section className="border-y border-[#e2e8f0] bg-white py-12 md:py-16 dark:border-dark-border-primary dark:bg-dark-bg-card">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Culture</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#0f172a] dark:text-dark-text-primary">
                How we work at Bitcraftly
              </h2>
              <p className="mt-3 text-[#64748b] dark:text-dark-text-secondary">
                A premium studio rhythm — async delivery, founder accountability, and craft over chaos.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-500/25 dark:bg-indigo-500/10">
                <Globe className="size-8 text-indigo-600 dark:text-indigo-400" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">Remote-first</p>
                  <p className="text-xs text-[#64748b] dark:text-dark-text-secondary">
                    Work from anywhere · Ghaziabad / NCR overlap for sync when clients need it
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CULTURE_PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`${atsCard} p-5`}
                >
                  <h3 className="text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-dark-text-secondary">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className={CONTAINER}>
          <div className="flex items-center gap-2">
            <Heart className="size-5 text-indigo-600" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Benefits & perks</p>
          </div>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#0f172a] dark:text-dark-text-primary">
            What you get
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`${atsCard} flex gap-3 p-5`}
              >
                <Zap className="size-4 shrink-0 text-indigo-500" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">{b.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-dark-text-secondary">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
