import { CONTAINER, SECTION_PY, SECTION_SCROLL_MT } from "@/lib/constants";

import { FEATURE_COMPARE_ROWS, TIER_DISPLAY, compareCellLabel } from "../pricingMatrix";

function CellValue({ value }: { value: ReturnType<typeof compareCellLabel> }) {
  if (value.kind === "check") {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
        <span aria-hidden>✔</span>
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value.kind === "dash") {
    return <span className="text-text-tertiary dark:text-dark-text-tertiary" aria-label="Not included">—</span>;
  }
  return <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{value.text}</span>;
}

export default function PricingFeatureTable() {
  const tiers = TIER_DISPLAY;

  return (
    <section id="pricing-compare" className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY} dark:border-dark-border-primary`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
          Feature comparison
        </p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          Compare every feature
        </h2>
        <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
          Scan in seconds — ✔ included, — not included, Optional add-on.
        </p>
      </div>

      {/* Mobile: card stack per tier */}
      <div className="mt-8 space-y-4 lg:hidden">
        {tiers.map((tier) => (
          <article key={tier.key} className="bc-card overflow-hidden">
            <div
              className={`border-b border-border-primary px-4 py-3 dark:border-dark-border-primary ${
                tier.recommended ? "bg-brand-soft/50 dark:bg-indigo-950/30" : "bg-bg-secondary/50 dark:bg-dark-bg-secondary/40"
              }`}
            >
              <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{tier.label}</p>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{tier.plan.price}</p>
            </div>
            <dl className="divide-y divide-border-primary dark:divide-dark-border-primary">
              {FEATURE_COMPARE_ROWS.map((row) => {
                const val = compareCellLabel(row[tier.key]);
                return (
                  <div key={row.id} className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="text-sm text-text-secondary dark:text-dark-text-secondary">{row.label}</dt>
                    <dd>
                      <CellValue value={val} />
                    </dd>
                  </div>
                );
              })}
            </dl>
          </article>
        ))}
      </div>

      {/* Desktop / tablet: sticky first column table */}
      <div className="pricing-compare-scroll mt-8 hidden overflow-x-auto rounded-2xl border border-border-primary lg:block dark:border-dark-border-primary">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-primary bg-bg-secondary/60 dark:border-dark-border-primary dark:bg-dark-bg-secondary/40">
              <th
                scope="col"
                className="pricing-compare-sticky-col sticky left-0 z-20 min-w-[11rem] bg-bg-secondary/95 px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary backdrop-blur-sm dark:bg-dark-bg-secondary/95 dark:text-dark-text-secondary"
              >
                Feature
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier.key}
                  scope="col"
                  className={`min-w-[9.5rem] px-4 py-4 text-center ${
                    tier.recommended ? "bg-brand-soft/40 dark:bg-indigo-950/25" : ""
                  }`}
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
                    {tier.label}
                  </span>
                  <span className="mt-1 block font-semibold text-text-primary dark:text-dark-text-primary">{tier.plan.price}</span>
                  {tier.recommended ? (
                    <span className="mt-1 inline-block rounded-full bg-accent-primary px-2 py-0.5 text-[9px] font-bold uppercase text-white dark:bg-indigo-500">
                      Recommended
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_COMPARE_ROWS.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={`border-b border-border-primary/70 last:border-0 dark:border-dark-border-primary/70 ${
                  rowIdx % 2 === 0 ? "bg-bg-card dark:bg-dark-bg-card" : "bg-bg-primary/50 dark:bg-dark-bg-primary/40"
                }`}
              >
                <th
                  scope="row"
                  className="pricing-compare-sticky-col sticky left-0 z-10 bg-inherit px-4 py-3.5 text-left font-medium text-text-primary backdrop-blur-sm dark:text-dark-text-primary"
                >
                  {row.label}
                </th>
                {tiers.map((tier) => {
                  const val = compareCellLabel(row[tier.key]);
                  return (
                    <td
                      key={tier.key}
                      className={`px-4 py-3.5 text-center ${tier.recommended ? "bg-brand-soft/20 dark:bg-indigo-950/10" : ""}`}
                    >
                      <CellValue value={val} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
