import type { ReactNode } from "react";

import { CONTAINER } from "@/lib/constants";

type MarketingPageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  steps?: readonly string[];
  children?: ReactNode;
};

export default function MarketingPageIntro({ eyebrow, title, description, steps, children }: MarketingPageIntroProps) {
  return (
    <section className={`${CONTAINER} scroll-mt-24 pt-8 md:pt-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">{description}</p>

      {steps && steps.length > 0 ? (
        <ol className="mt-5 flex flex-wrap gap-2" aria-label="Suggested reading order on this page">
          {steps.map((step, index) => (
            <li
              key={step}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-primary bg-bg-card px-3 py-1.5 text-xs font-medium text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
            >
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
