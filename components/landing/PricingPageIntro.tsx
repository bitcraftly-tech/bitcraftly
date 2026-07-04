import Link from "next/link";

import PackageWhatsAppLink from "@/components/landing/PackageWhatsAppLink";
import MarketingSectionLink from "@/components/landing/MarketingSectionLink";
import { CONTAINER } from "@/lib/constants";
import { buildQuoteContactUrl } from "@/lib/leadGen";
import { FEATURED_FAST_PACKAGE } from "@/lib/pricingCompare";

const HIGHLIGHTS = [
  { label: "Fast launch from", value: "₹8,999" },
  { label: "Quickest delivery", value: "48 hours" },
  { label: "Standard sites from", value: "₹7,999" },
] as const;

export default function PricingPageIntro() {
  const featured = FEATURED_FAST_PACKAGE;

  return (
    <section className={`${CONTAINER} scroll-mt-24 pt-8 md:pt-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Transparent pricing
      </p>
      <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
        Website kitne mein banegi? — calculator, packages &amp; clear starting prices
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
        Step 1: packages compare karo. Step 2: fixed fast-launch ya standard plan choose karo. Step 3: custom ho to
        calculator use karo. Sab prices starting-from — final quote written scope ke baad.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border-primary bg-bg-card px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
              {item.label}
            </p>
            <p className="mt-0.5 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-50/90 via-bg-card to-bg-card p-5 dark:from-indigo-950/40 dark:via-dark-bg-card dark:to-dark-bg-card sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">
              Most popular · {featured.popularLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary">
              {featured.icon} {featured.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{featured.mobileDesc}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="font-semibold text-text-primary dark:text-dark-text-primary">{featured.price}</span>
              <span className="text-text-tertiary dark:text-dark-text-tertiary">·</span>
              <span className="text-text-secondary dark:text-dark-text-secondary">{featured.timelineShort} delivery</span>
              <span className="text-text-tertiary dark:text-dark-text-tertiary">·</span>
              <span className="text-text-secondary dark:text-dark-text-secondary">{featured.bestFor}</span>
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href={buildQuoteContactUrl(featured.contactSlug, "featured-package")}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${featured.buttonClass}`}
            >
              {featured.cta}
            </Link>
            <PackageWhatsAppLink
              service={featured.contactSlug}
              source="featured-package"
              className="inline-flex items-center justify-center rounded-full border border-border-secondary bg-bg-card px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:bg-dark-bg-card dark:text-dark-text-primary"
            >
              WhatsApp this package
            </PackageWhatsAppLink>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <MarketingSectionLink
          path="/pricing"
          sectionId="pricing-compare"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Compare packages →
        </MarketingSectionLink>
        <MarketingSectionLink
          path="/pricing"
          sectionId="fast-packages"
          className="inline-flex items-center justify-center rounded-full border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
        >
          Fast packages
        </MarketingSectionLink>
      </div>
    </section>
  );
}
