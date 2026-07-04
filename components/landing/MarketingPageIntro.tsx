import type { ReactNode } from "react";

import MarketingPageHero from "@/components/landing/MarketingPageHero";
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
    <>
      <MarketingPageHero eyebrow={eyebrow} title={title} description={description} className="!pb-6 md:!pb-8" />

      {steps && steps.length > 0 ? (
        <section className={`${CONTAINER} pb-4`}>
          <ol className="flex flex-wrap gap-2" aria-label="Suggested reading order on this page">
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
        </section>
      ) : null}

      {children ? <div className={`${CONTAINER} pb-6`}>{children}</div> : null}
    </>
  );
}
