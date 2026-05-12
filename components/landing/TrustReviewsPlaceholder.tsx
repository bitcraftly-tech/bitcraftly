import { CONTAINER } from "@/lib/constants";

/** Placeholder for future Google Business Profile reviews — swap in real data when available. */
export default function TrustReviewsPlaceholder() {
  return (
    <section
      aria-label="Client reviews"
      className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-5 dark:border-dark-border-primary lg:py-6`}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 rounded-2xl border border-dashed border-border-primary bg-bg-secondary/30 px-5 py-4 text-center dark:border-dark-border-primary dark:bg-dark-bg-secondary/20 sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">
            Google reviews
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
            Example snippets (replace later): &ldquo;Clear scope and delivery.&rdquo; · &ldquo;Easy to reach on WhatsApp.&rdquo;
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-border-primary bg-bg-card px-3 py-1.5 text-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
          <span className="text-amber-500" aria-hidden>
            ★★★★★
          </span>
          <span className="font-semibold text-text-primary dark:text-dark-text-primary">—</span>
          <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">placeholder</span>
        </div>
      </div>
    </section>
  );
}
