import Link from "next/link";

import { CONTAINER } from "@/lib/constants";
import { buildQuoteContactUrl } from "@/lib/leadGen";

export default function PricingHero() {
  return (
    <section id="pricing-hero" className={`${CONTAINER} scroll-mt-24 pt-8 md:pt-12`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
          Transparent pricing
        </p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-5xl">
          Simple plans. Clear scope. No surprises.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
          Compare Starter, Professional, and Enterprise in seconds. Starting prices below — final quote confirmed in
          writing before work starts.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="#pricing-plans" className="bc-btn bc-btn-primary px-6 py-3">
            View plans
          </Link>
          <Link
            href={buildQuoteContactUrl("Professional Business Website", "pricing-hero")}
            className="bc-btn bc-btn-secondary px-6 py-3"
          >
            Get written quote
          </Link>
        </div>
      </div>
    </section>
  );
}
