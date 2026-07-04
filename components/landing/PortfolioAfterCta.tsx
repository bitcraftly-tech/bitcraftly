import Link from "next/link";

import { CONTAINER, SECTION_PY_COMPACT, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/leadGen";
import { PORTFOLIO } from "@/lib/portfolioContent";

export default function PortfolioAfterCta() {
  return (
    <div className={`${CONTAINER} border-t border-border-primary ${SECTION_PY_COMPACT} dark:border-dark-border-primary`}>
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-border-primary bg-bg-card px-6 py-8 dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-8 sm:py-9">
        <div className="w-full">
          <p className="font-[var(--font-playfair)] text-xl font-semibold text-text-primary dark:text-dark-text-primary sm:text-2xl">
            {PORTFOLIO.ctaTitle}
          </p>
          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            {PORTFOLIO.ctaBody}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact?intent=consultation&source=portfolio-cta"
            className="inline-flex min-h-[2.875rem] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(79_70_229_/_0.28)] transition hover:-translate-y-px hover:opacity-95 sm:w-auto"
          >
            {PORTFOLIO.primaryCta}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.875rem] w-full items-center justify-center rounded-full border border-border-secondary bg-bg-card px-6 py-2.5 text-sm font-semibold text-text-primary transition hover:-translate-y-px hover:bg-bg-secondary dark:border-dark-border-secondary dark:bg-dark-bg-card dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary sm:w-auto"
          >
            {PORTFOLIO.secondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
