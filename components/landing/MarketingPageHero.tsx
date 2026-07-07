import type { ReactNode } from "react";

import { CONTAINER, MARKETING_BELOW_BREADCRUMB_PT } from "@/lib/constants";

export type MarketingPageHeroProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  className?: string;
};

/** Shared marketing page hero — matches pricing layout with full-width natural wrap. */
export default function MarketingPageHero({
  id,
  eyebrow,
  title,
  description,
  actions,
  className,
}: MarketingPageHeroProps) {
  return (
    <section
      id={id}
      className={`marketing-page-hero ${CONTAINER} scroll-mt-24 pb-10 md:pb-12 ${MARKETING_BELOW_BREADCRUMB_PT} ${className ?? ""}`.trim()}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        {eyebrow}
      </p>
      <h1 className="mt-3 w-full max-w-none font-[var(--font-playfair)] text-3xl font-semibold text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
        {title}
      </h1>
      <div className="mt-4 w-full max-w-none text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
        {description}
      </div>
      {actions ? (
        <div className="marketing-hero-actions mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {actions}
        </div>
      ) : null}
    </section>
  );
}
