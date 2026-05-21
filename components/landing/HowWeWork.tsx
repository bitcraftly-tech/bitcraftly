import Link from "next/link";

import FounderAvatar from "@/components/landing/FounderAvatar";
import { CONTAINER, FOUNDER_LINKEDIN_URL } from "@/lib/constants";
import { FOUNDER, PROCESS_STEPS } from "@/lib/siteContent";

export default function HowWeWork() {
  return (
    <section id="process" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">How we work</p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
          A clear path from idea to launch
        </h2>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          Six structured steps — har stage par aapko pata hota hai kya ho raha hai. No jargon-heavy process.
        </p>
      </div>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS_STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-xl border border-border-primary bg-bg-card p-4 text-left dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <span className="text-xs font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">{s.n}</span>
            <p className="mt-1 text-sm font-semibold text-text-primary dark:text-dark-text-primary">{s.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{s.desc}</p>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 rounded-2xl border border-border-primary bg-bg-secondary/40 p-5 dark:border-dark-border-primary dark:bg-dark-bg-secondary/25 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <FounderAvatar size="sm" />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold leading-relaxed text-text-primary dark:text-dark-text-primary">
            Led by {FOUNDER.name} — {FOUNDER.yearsExperience} years in frontend &amp; product delivery.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.shortTitle}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold sm:justify-start">
            <Link href="/team" className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Meet the founder →
            </Link>
            {FOUNDER_LINKEDIN_URL ? (
              <a
                href={FOUNDER_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                LinkedIn →
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
