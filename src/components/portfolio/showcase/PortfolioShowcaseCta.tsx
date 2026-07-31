import Link from 'next/link';

import { whatsappUrl } from '@/lib/constants';
import { PORTFOLIO } from '@/lib/portfolioContent';
import { PS_BTN_GHOST, PS_BTN_PRIMARY } from '@/lib/portfolioShowcaseTheme';
import { WHATSAPP_MESSAGES } from '@/lib/whatsappFunnel';

import './portfolio-showcase.css';

type PortfolioShowcaseCtaProps = {
  source?: string;
  variant?: 'bottom' | 'compact';
};

export default function PortfolioShowcaseCta({
  source = 'portfolio-showcase',
  variant = 'bottom',
}: PortfolioShowcaseCtaProps) {
  const contact = `/contact?intent=consultation&source=${encodeURIComponent(source)}`;

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2">
        <Link href={`${contact}&cta=start-project`} className={PS_BTN_PRIMARY}>
          {PORTFOLIO.bottomCtaPrimary}
        </Link>
        <a
          href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)}
          target="_blank"
          rel="noopener noreferrer"
          className={PS_BTN_GHOST}
        >
          {PORTFOLIO.bottomCtaWhatsApp}
        </a>
      </div>
    );
  }

  return (
    <div className="ps-showcase-cta">
      <div className="flex items-start gap-4 sm:items-center">
        <span className="ps-showcase-cta-icon" aria-hidden>
          🚀
        </span>
        <div>
          <p className="ps-showcase-cta-title">{PORTFOLIO.bottomCtaTitle}</p>
          <p className="ps-showcase-cta-body">{PORTFOLIO.bottomCtaBody}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`${contact}&cta=start-project`}
          className={`${PS_BTN_PRIMARY} min-h-11 rounded-full px-6`}
        >
          {PORTFOLIO.bottomCtaPrimary}
          <svg
            className="size-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <a
          href={whatsappUrl(WHATSAPP_MESSAGES.portfolio)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${PS_BTN_GHOST} min-h-11 gap-2 rounded-full px-6`}
        >
          <svg
            className="size-4 text-[#27ae60]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          {PORTFOLIO.bottomCtaWhatsApp}
        </a>
      </div>
    </div>
  );
}
