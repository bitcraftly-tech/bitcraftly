import Link from "next/link";

import { CONTAINER, FOUNDER_LINKEDIN_URL } from "@/lib/constants";

const steps = [
  { n: "1", title: "Discovery", desc: "Goals, audience and scope — clear before we design." },
  { n: "2", title: "UI/UX Design", desc: "Layouts and flows you can review before build." },
  { n: "3", title: "Development", desc: "Clean, mobile-first code aligned to your brand." },
  { n: "4", title: "Testing", desc: "Devices, forms and performance checks before go-live." },
  { n: "5", title: "Launch & Support", desc: "Go live with training and a sensible support window." },
];

export default function HowWeWork() {
  return (
    <section id="process" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">How we work</p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
          A simple path from idea to launch
        </h2>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          No jargon-heavy process — just structured steps so you always know what happens next.
        </p>
      </div>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s) => (
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
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border-primary bg-bg-card text-sm font-semibold text-text-primary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary"
          aria-hidden
        >
          BC
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold leading-relaxed text-text-primary dark:text-dark-text-primary">
            Led by a frontend developer with 18+ years of IT industry experience.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Practical delivery for local businesses — clear milestones and honest timelines.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold sm:justify-start">
            <Link href="/team" className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Meet the team →
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
