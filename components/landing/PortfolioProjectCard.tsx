import type { PortfolioItem } from "@/lib/portfolioItems";

type PortfolioProjectCardProps = {
  item: PortfolioItem;
  /** Extra bottom copy on full portfolio page */
  showDetails?: boolean;
};

export default function PortfolioProjectCard({ item, showDetails }: PortfolioProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient} p-4`}>
        <div className="absolute inset-0 rounded-t-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
        <div className="relative flex h-full flex-col rounded-xl border border-border-primary/60 bg-bg-card/90 p-3 shadow-sm backdrop-blur-sm dark:border-dark-border-primary/60 dark:bg-dark-bg-card/90">
          <div className="flex items-center gap-1.5 border-b border-border-primary/50 pb-2 dark:border-dark-border-primary/50">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-auto text-[10px] text-text-tertiary dark:text-dark-text-tertiary">preview</span>
          </div>
          <div className="mt-3 flex flex-1 flex-col justify-center gap-2">
            <div className="h-2 w-3/5 rounded bg-border-secondary dark:bg-dark-border-secondary" />
            <div className="h-2 w-4/5 rounded bg-border-secondary/80 dark:bg-dark-border-secondary/80" />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="h-14 rounded border border-border-primary/70 bg-bg-secondary/80 dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/80" />
              <div className="h-14 rounded border border-border-primary/70 bg-bg-secondary/80 dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/80" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-lg" aria-hidden>
            <span>{item.emoji}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border-primary p-4 dark:border-dark-border-primary">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h3>
          <span className="rounded-full border border-border-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary dark:border-dark-border-secondary dark:text-dark-text-tertiary">
            {item.tag}
          </span>
        </div>
        <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{item.hint}</p>
        {showDetails && item.details ? (
          <p className="mt-2 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{item.details}</p>
        ) : null}
      </div>
    </article>
  );
}
