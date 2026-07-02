import Link from "next/link";

import PackageWhatsAppLink from "@/components/landing/PackageWhatsAppLink";
import { CONTAINER, SECTION_PY, SECTION_SCROLL_MT } from "@/lib/constants";
import { buildQuoteContactUrl } from "@/lib/leadGen";
import { PRICING_COMPARE_ROWS } from "@/lib/pricingCompare";

function CompareActions({ row }: { row: (typeof PRICING_COMPARE_ROWS)[number] }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildQuoteContactUrl(row.contactSlug, "pricing-compare")}
        className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
      >
        Quote for this
      </Link>
      <PackageWhatsAppLink
        service={row.contactSlug}
        source="pricing-compare"
        className="inline-flex items-center justify-center rounded-full border border-border-secondary px-3.5 py-2 text-xs font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
      >
        WhatsApp
      </PackageWhatsAppLink>
    </div>
  );
}

function CompareCard({ row }: { row: (typeof PRICING_COMPARE_ROWS)[number] }) {
  return (
    <article
      className={`rounded-xl border p-4 ${row.highlight
          ? "border-indigo-500/40 bg-indigo-50/40 ring-1 ring-indigo-500/15 dark:border-indigo-400/30 dark:bg-indigo-950/25"
          : "border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card"
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
            <span className="mr-1.5" aria-hidden>
              {row.icon}
            </span>
            {row.name}
          </p>
          <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">{row.group}</p>
        </div>
        {row.popularLabel ? (
          <span className="shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {row.popularLabel}
          </span>
        ) : null}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">Price</dt>
          <dd className="mt-0.5 font-semibold text-text-primary dark:text-dark-text-primary">{row.price}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">Timeline</dt>
          <dd className="mt-0.5 text-text-secondary dark:text-dark-text-secondary">{row.timeline}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">Best for</dt>
          <dd className="mt-0.5 text-text-secondary dark:text-dark-text-secondary">{row.bestFor}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <CompareActions row={row} />
      </div>
    </article>
  );
}

export default function PricingQuickCompare() {
  return (
    <section id="pricing-compare" className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY} dark:border-dark-border-primary`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Quick compare
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Sab packages ek jagah — price, timeline &amp; fit
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Pehle yahan packages compare karo (price, timeline, best for). Jab decide ho jaye —{" "}
        <span className="font-semibold text-text-primary dark:text-dark-text-primary">Quote for this</span> us package ke
        liye contact form kholta hai (package pre-filled). WhatsApp se bhi seedha enquiry bhej sakte ho.
      </p>

      <div className="mt-6 grid gap-3 md:hidden">
        {PRICING_COMPARE_ROWS.map((row) => (
          <CompareCard key={row.id} row={row} />
        ))}
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border-primary md:block dark:border-dark-border-primary">
        <table className="min-w-[820px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-primary bg-bg-secondary/60 dark:border-dark-border-primary dark:bg-dark-bg-secondary/40">
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                Package
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                Type
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                Starting price
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                Timeline
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                Best for
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {PRICING_COMPARE_ROWS.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-border-primary/70 last:border-0 dark:border-dark-border-primary/70 ${row.highlight ? "bg-indigo-50/50 dark:bg-indigo-950/20" : "bg-bg-card dark:bg-dark-bg-card"
                  }`}
              >
                <td className="px-4 py-3.5 font-medium text-text-primary dark:text-dark-text-primary">
                  <span className="mr-2" aria-hidden>
                    {row.icon}
                  </span>
                  {row.name}
                  {row.popularLabel ? (
                    <span className="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {row.popularLabel}
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3.5 text-text-secondary dark:text-dark-text-secondary">{row.group}</td>
                <td className="px-4 py-3.5 font-semibold text-text-primary dark:text-dark-text-primary">{row.price}</td>
                <td className="px-4 py-3.5 text-text-secondary dark:text-dark-text-secondary">{row.timeline}</td>
                <td className="px-4 py-3.5 text-text-secondary dark:text-dark-text-secondary">{row.bestFor}</td>
                <td className="px-4 py-3.5">
                  <CompareActions row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-text-tertiary dark:text-dark-text-tertiary">
        Maintenance plan: ₹2,999/month · Frontend consulting: ₹1,500/hour · GST as applicable
      </p>
    </section>
  );
}
