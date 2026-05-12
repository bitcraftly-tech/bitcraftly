import { CONTAINER } from "@/lib/constants";

const steps = [
  { n: "1", title: "Discovery", desc: "Goals, audience and scope — clear before we design." },
  { n: "2", title: "UI/UX Design", desc: "Layouts and flows you can review before build." },
  { n: "3", title: "Development", desc: "Clean, mobile-first code aligned to your brand." },
  { n: "4", title: "Testing", desc: "Devices, forms and performance checks before go-live." },
  { n: "5", title: "Launch & support", desc: "Go live with training and a sensible support window." },
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
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
        <span className="font-medium text-text-secondary dark:text-dark-text-secondary">Led by experience.</span> Frontend
        developer with 18+ years building modern digital products — practical delivery, not slide decks.
      </p>
    </section>
  );
}
