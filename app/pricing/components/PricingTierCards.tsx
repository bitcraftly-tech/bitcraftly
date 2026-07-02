import Link from "next/link";

import { CONTAINER, SECTION_PY, SECTION_SCROLL_MT } from "@/lib/constants";
import { buildQuoteContactUrl } from "@/lib/leadGen";

import { TIER_DISPLAY } from "../pricingMatrix";

export default function PricingTierCards() {
  return (
    <section id="pricing-plans" className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
          Standard plans
        </p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          Pick the right package
        </h2>
        <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
          Side-by-side comparison — prices are starting-from, one-time unless noted.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {TIER_DISPLAY.map(({ key, label, plan, support, recommended }) => (
          <article
            key={key}
            className={`bc-card relative flex h-full flex-col p-6 transition duration-250 hover:-translate-y-0.5 sm:p-8 ${
              recommended
                ? "border-accent-primary/40 ring-2 ring-accent-primary/20 dark:border-indigo-400/40 dark:ring-indigo-400/20"
                : ""
            }`}
          >
            {recommended ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white dark:bg-indigo-500">
                Recommended
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
                  {label}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{plan.service}</h3>
              </div>
              <span className="text-2xl" aria-hidden>
                {plan.icon}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {plan.subtleLine ?? plan.bestFor}
            </p>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
                Starting from
              </p>
              <p className="mt-1 font-[var(--font-playfair)] text-4xl font-semibold text-text-primary dark:text-dark-text-primary">
                {plan.price}
              </p>
              <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">{plan.period}</p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary dark:text-dark-text-tertiary">
                  Best for
                </dt>
                <dd className="mt-0.5 text-text-secondary dark:text-dark-text-secondary">{plan.bestFor}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary dark:text-dark-text-tertiary">
                  Delivery
                </dt>
                <dd className="mt-0.5 text-text-secondary dark:text-dark-text-secondary">{plan.timeline}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary dark:text-dark-text-tertiary">
                  Support
                </dt>
                <dd className="mt-0.5 text-text-secondary dark:text-dark-text-secondary">{support}</dd>
              </div>
            </dl>

            <ul className="mt-6 flex-1 space-y-2 border-t border-border-primary pt-6 dark:border-dark-border-primary">
              {plan.whatsIncluded.slice(0, 5).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={buildQuoteContactUrl(plan.service, "pricing-tier-card")}
              className={
                recommended
                  ? "bc-btn bc-btn-primary mt-8 w-full px-4 py-3"
                  : `mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:opacity-95 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary ${plan.buttonClass}`
              }
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-text-tertiary dark:text-dark-text-tertiary">
        Maintenance from ₹2,999/month · Frontend consulting ₹1,500/hour · GST as applicable
      </p>
    </section>
  );
}
