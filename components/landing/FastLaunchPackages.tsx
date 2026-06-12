"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import PackageWhatsAppLink from "@/components/landing/PackageWhatsAppLink";
import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { FAST_PACKAGE_FILTERS, FAST_PACKAGES, FAST_PACKAGES_SECTION, type FastPackageCategory } from "@/lib/fastPackages";
import { buildQuoteContactUrl, WHATSAPP_MESSAGES } from "@/lib/leadGen";

export default function FastLaunchPackages() {
  const [filter, setFilter] = useState<FastPackageCategory | "all">("all");

  const visiblePackages = useMemo(
    () => (filter === "all" ? FAST_PACKAGES : FAST_PACKAGES.filter((pkg) => pkg.category === filter)),
    [filter],
  );

  return (
    <section id={FAST_PACKAGES_SECTION.id} className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-7 dark:border-dark-border-primary md:py-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        {FAST_PACKAGES_SECTION.eyebrow}
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        {FAST_PACKAGES_SECTION.headline}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        {FAST_PACKAGES_SECTION.subheadline}
      </p>
      <p className="mt-3 max-w-3xl text-sm font-medium text-indigo-600/90 dark:text-indigo-400/90">{FAST_PACKAGES_SECTION.urgencyLine}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
        {FAST_PACKAGES_SECTION.offerLine}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter fast-launch packages">
        {FAST_PACKAGE_FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "border border-border-primary bg-bg-secondary text-text-secondary hover:border-border-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visiblePackages.map((pkg) => (
          <article
            key={pkg.id}
            className={`group relative flex h-full transform-gpu flex-col rounded-xl border bg-bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(2,6,23,0.12)] dark:bg-dark-bg-card dark:hover:shadow-[0_14px_26px_rgba(2,6,23,0.4)] ${
              pkg.highlight
                ? "border-indigo-500/40 ring-1 ring-indigo-500/20 dark:border-indigo-400/30"
                : "border-border-primary hover:border-border-secondary dark:border-dark-border-primary dark:hover:border-dark-border-secondary"
            }`}
          >
            {pkg.popularLabel ? (
              <span className="absolute -top-2.5 right-4 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                {pkg.popularLabel}
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-2">
              <div className="text-3xl">{pkg.icon}</div>
              <span
                className={`shrink-0 rounded-full border border-border-primary bg-bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide dark:border-dark-border-primary dark:bg-dark-bg-secondary ${pkg.accentClass}`}
              >
                {pkg.timelineShort}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{pkg.name}</h3>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${pkg.accentClass}`}>Bitcraftly · Founder-led</p>
            <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">Best for: {pkg.bestFor}</p>

            <p className="mt-2 text-xs leading-snug text-text-tertiary dark:text-dark-text-tertiary md:hidden">{pkg.mobileDesc}</p>
            <p className="mt-2 hidden text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary md:block">{pkg.desc}</p>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">Starting from</p>
            <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{pkg.price}</p>
            <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">{pkg.priceNote}</p>

            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
              <span aria-hidden>⏱</span>
              {pkg.timeline}
            </p>
            {pkg.urgency ? (
              <p className="mt-1 text-xs font-semibold text-indigo-600/90 dark:text-indigo-400/90">{pkg.urgency}</p>
            ) : null}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">What&apos;s included</p>
            <ul className="mt-2 space-y-2">
              {pkg.includes.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                    ✔
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto space-y-2 pt-6">
              <Link
                href={buildQuoteContactUrl(pkg.contactSlug, "fast-package")}
                className={`inline-flex w-full cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ease-out group-hover:brightness-105 ${pkg.buttonClass}`}
              >
                {pkg.cta}
              </Link>
              <PackageWhatsAppLink
                service={pkg.contactSlug}
                source="fast-package"
                className="inline-flex w-full items-center justify-center rounded-full border border-border-secondary px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
              >
                WhatsApp this package
              </PackageWhatsAppLink>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
        {FAST_PACKAGES_SECTION.pricingNote}
        <span className="block mt-1">*48h / 5-day windows start after brief approval and content handoff.</span>
      </p>

      <div className="mt-6 rounded-2xl border border-border-primary bg-bg-secondary/40 px-6 py-5 dark:border-dark-border-primary dark:bg-dark-bg-secondary/30">
        <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{FAST_PACKAGES_SECTION.founderTrust}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border-primary bg-bg-card px-6 py-6 dark:border-dark-border-primary dark:bg-dark-bg-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">
            {FAST_PACKAGES_SECTION.bottomCtaTitle}
          </p>
          <p className="mt-2 max-w-xl text-sm text-text-secondary dark:text-dark-text-secondary">{FAST_PACKAGES_SECTION.bottomCtaBody}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/contact?intent=consultation&source=fast-packages"
            className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {FAST_PACKAGES_SECTION.bottomCtaPrimary}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.pricing)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
          >
            {FAST_PACKAGES_SECTION.bottomCtaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
