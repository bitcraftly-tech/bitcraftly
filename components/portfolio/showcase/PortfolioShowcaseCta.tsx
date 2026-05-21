import Link from "next/link";

import { whatsappUrl } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";
import { PORTFOLIO_CTA_PRIMARY, PORTFOLIO_CTA_SECONDARY } from "@/lib/portfolioPalette";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

type PortfolioShowcaseCtaProps = {
  source?: string;
  compact?: boolean;
};

export default function PortfolioShowcaseCta({ source = "portfolio-showcase", compact }: PortfolioShowcaseCtaProps) {
  const contact = `/contact?intent=consultation&source=${encodeURIComponent(source)}`;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        <Link href={`${contact}&cta=start-project`} className={PORTFOLIO_CTA_PRIMARY}>
          Start your project
        </Link>
        <Link href={contact} className={PORTFOLIO_CTA_SECONDARY}>
          Book free consultation
        </Link>
        <a href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)} target="_blank" rel="noopener noreferrer" className={PORTFOLIO_CTA_SECONDARY}>
          Discuss on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#3498db]/25 bg-gradient-to-br from-[#3498db]/8 via-bg-card to-[#9b59b6]/6 p-6 dark:border-[#3498db]/20 dark:from-[#3498db]/10 dark:to-[#8e44ad]/8 sm:p-8">
      <p className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary sm:text-2xl">{PORTFOLIO.ctaTitle}</p>
      <p className="mt-2 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.ctaBody}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`${contact}&cta=start-project`} className={PORTFOLIO_CTA_PRIMARY}>
          Start your project
        </Link>
        <Link href={contact} className={PORTFOLIO_CTA_SECONDARY}>
          {PORTFOLIO.primaryCta}
        </Link>
        <Link href={`/contact?intent=website&source=${encodeURIComponent(source)}`} className={PORTFOLIO_CTA_SECONDARY}>
          Discuss your website
        </Link>
        <a href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)} target="_blank" rel="noopener noreferrer" className={PORTFOLIO_CTA_SECONDARY}>
          {PORTFOLIO.secondaryCta}
        </a>
      </div>
    </div>
  );
}
