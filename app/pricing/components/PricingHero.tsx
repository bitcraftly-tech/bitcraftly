import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { CONTAINER } from "@/lib/constants";
import { buildQuoteContactUrl } from "@/lib/leadGen";

export default function PricingHero() {
  return (
    <section id="pricing-hero" className={`${CONTAINER} scroll-mt-24 pb-10 pt-8 md:pb-12 md:pt-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Transparent pricing
      </p>
      <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-3xl font-semibold text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
        Simple plans. Clear scope. No surprises.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
        Compare Starter, Professional, and Enterprise in seconds. Starting prices below — final quote confirmed in
        writing before work starts.
      </p>
      <div className="pricing-hero-actions mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Link href="#pricing-plans" className="pricing-hero-btn pricing-hero-btn--primary">
          View plans
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
        <Link
          href={buildQuoteContactUrl("Professional Business Website", "pricing-hero")}
          className="pricing-hero-btn pricing-hero-btn--secondary"
        >
          <FileText className="size-4 shrink-0 opacity-70" aria-hidden />
          Get written quote
        </Link>
      </div>
    </section>
  );
}