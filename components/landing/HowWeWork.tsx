import { CONTAINER, SECTION_PY_COMPACT, SECTION_SCROLL_MT } from "@/lib/constants";
import { PROCESS_STEPS } from "@/lib/siteContent";

export default function HowWeWork() {
  return (
    <section id="process" className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY_COMPACT} dark:border-dark-border-primary`}>
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
    </section>
  );
}
