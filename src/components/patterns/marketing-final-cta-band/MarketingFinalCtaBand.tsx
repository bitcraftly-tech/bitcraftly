import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { WHATSAPP_CONSULTATION_HREF } from '@/features/homepage/shared/contact-links';
import '@/components/patterns/marketing-final-cta-band/final-cta.css';

interface MarketingCtaLink {
  label: string;
  href: string;
  icon?: IconName;
}

interface MarketingFinalCtaBandProps {
  headingId: string;
  heading: string;
  description: string;
  /** Optional reassurance line under the description (About, etc.). */
  reassurance?: string;
  primaryCta: MarketingCtaLink;
  tertiaryCta: MarketingCtaLink;
  trust: readonly string[];
  whatsappLabel?: string;
}

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-inverse',
);

const buttonBase = cn(
  'inline-flex items-center justify-center gap-[8px]',
  'no-underline font-sans text-[15px] font-semibold',
  focusRing,
);

/**
 * Dark final-CTA band used on Services / Solutions landings.
 * Visual shell shared via `final-cta.css` in this folder.
 */
export function MarketingFinalCtaBand({
  headingId,
  heading,
  description,
  reassurance,
  primaryCta,
  tertiaryCta,
  trust,
  whatsappLabel = 'WhatsApp',
}: MarketingFinalCtaBandProps) {
  return (
    <Section spacing="lg" background="default" aria-labelledby={headingId}>
      <div className="final-cta-card final-cta-card--band w-full">
        <h2 id={headingId} className="final-cta-title relative z-[1]">
          {heading}
        </h2>
        <p className="final-cta-description relative z-[1]">{description}</p>
        {reassurance ? <p className="final-cta-reassurance relative z-[1]">{reassurance}</p> : null}

        <div className="final-cta-actions">
          <Link href={primaryCta.href} className={cn('final-cta-button-primary', buttonBase)}>
            {primaryCta.label}
            <Icon
              name={primaryCta.icon ?? 'arrow-up-right'}
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px]"
            />
          </Link>
          <Link
            href={WHATSAPP_CONSULTATION_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('final-cta-button-secondary', buttonBase)}
          >
            <Icon name="message" size="sm" aria-hidden className="h-[15px] w-[15px]" />
            {whatsappLabel}
          </Link>
          <Link href={tertiaryCta.href} className={cn('final-cta-button-secondary', buttonBase)}>
            <Icon
              name={tertiaryCta.icon ?? 'calendar'}
              size="sm"
              aria-hidden
              className="h-[15px] w-[15px]"
            />
            {tertiaryCta.label}
          </Link>
        </div>

        <ul className="final-cta-trust" aria-label="Engagement assurances">
          {trust.map((item) => (
            <li key={item} className="final-cta-trust__item">
              <span className="final-cta-trust__icon" aria-hidden>
                <Icon name="check" size="sm" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
