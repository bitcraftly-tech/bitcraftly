import Link from "next/link";

import PackageWhatsAppLink from "@/components/landing/PackageWhatsAppLink";
import { CONTAINER, SECTION_PY, SECTION_SCROLL_MT } from "@/lib/constants";
import { buildQuoteContactUrl } from "@/lib/leadGen";
import { STANDARD_PRICING_PLANS } from "@/lib/standardPricing";

type PricingProps = {
  variant?: "section" | "page";
};

export default function Pricing({ variant = "section" }: PricingProps) {
  const isPage = variant === "page";

  return (
    <section id={isPage ? "pricing-standard" : "pricing"} className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Standard pricing</p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Flexible packages &amp; custom builds
      </h2>
      {isPage ? (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
          Custom pages, integrations, ya scale ke liye — starting prices neeche. Final quote discovery ke baad likh ke
          confirm hota hai. Frontend consulting at{" "}
          <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹1,500/hour</span>.
        </p>
      ) : (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
          Not sure yet? Use the{" "}
          <a href="/pricing#project-cost-calculator" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            cost calculator
          </a>{" "}
          on the pricing page. Fixed fast-launch offers are in{" "}
          <a href="/pricing#fast-packages" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            fast-launch packages
          </a>
          . Standard starting prices below — final quote depends on pages, features, and content readiness. Scope likh ke confirm hota hai
          (English ya Hinglish) before work starts. Frontend consulting at{" "}
          <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹1,500/hour</span>.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {STANDARD_PRICING_PLANS.map((plan) => (
          <article
            key={plan.service}
            className={`bc-card group relative flex h-full transform-gpu flex-col p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 ${
              plan.highlight
                ? "border-indigo-500/40 ring-1 ring-indigo-500/20 dark:border-indigo-400/30"
                : "border-border-primary hover:border-border-secondary dark:border-dark-border-primary dark:hover:border-dark-border-secondary"
            }`}
          >
            {plan.highlight ? (
              <span className="absolute -top-2.5 right-4 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Popular
              </span>
            ) : null}
            <div className="text-3xl">{plan.icon}</div>
            <h3 className="mt-2 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{plan.service}</h3>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${plan.accentClass}`}>Bitcraftly</p>
            {isPage ? (
              <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">Best for: {plan.bestFor}</p>
            ) : null}
            {plan.isMonthly ? (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">Per month</p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
              </>
            ) : (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">Starting from</p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
              </>
            )}
            <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">{plan.period}</p>
            {plan.subtleLine ? (
              <p className="mt-2 text-xs leading-snug text-text-tertiary dark:text-dark-text-tertiary">{plan.subtleLine}</p>
            ) : null}
            {isPage && plan.timeline ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                <span aria-hidden>⏱</span>
                {plan.timeline}
              </p>
            ) : null}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">What&apos;s included</p>
            <ul className="mt-2 space-y-2">
              {plan.whatsIncluded.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                    ✔
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className={`mt-auto ${isPage ? "space-y-2" : ""} pt-6`}>
              <Link
                href={buildQuoteContactUrl(plan.service, "pricing-card")}
                className={`inline-flex w-full cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ease-out group-hover:brightness-105 ${plan.buttonClass}`}
              >
                {plan.cta}
              </Link>
              {isPage ? (
                <PackageWhatsAppLink
                  service={plan.service}
                  source="pricing-card"
                  className="inline-flex w-full items-center justify-center rounded-full border border-border-secondary px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
                >
                  WhatsApp this package
                </PackageWhatsAppLink>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
          Custom SaaS frontends, ecommerce, and mobile apps quoted after a short discovery call.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          Written estimates · No surprise line items after kickoff · Founder-led delivery
        </p>
      </div>
    </section>
  );
}
