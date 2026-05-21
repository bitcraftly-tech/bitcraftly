import Link from "next/link";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";

export default function PortfolioAfterCta() {
  return (
    <div className={`${CONTAINER} border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="flex w-full flex-col gap-4 rounded-2xl border border-border-primary bg-bg-card px-6 py-6 dark:border-dark-border-primary dark:bg-dark-bg-card sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="text-left">
          <p className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary sm:text-xl">
            {PORTFOLIO.ctaTitle}
          </p>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.ctaBody}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/contact?intent=consultation&source=portfolio-cta"
            className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {PORTFOLIO.primaryCta}
          </Link>
          <Link
            href={whatsappUrl("Hi Bitcraftly, I saw your portfolio and want a similar website for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
          >
            {PORTFOLIO.secondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
