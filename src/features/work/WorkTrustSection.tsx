import Link from 'next/link';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import {
  getApprovedTestimonials,
  WORK_TRUST_BAND,
  WORK_TRUST_COPY,
  WORK_TRUST_PILLARS,
} from './work.content';
import { WorkTestimonialsPanel } from './WorkTestimonialsPanel';
import './work.css';

/**
 * Trust & Credibility — principles + approved testimonials only (Sprint 5I).
 */
export function WorkTrustSection() {
  const approved = getApprovedTestimonials();

  return (
    <Section
      id="work-trust"
      spacing="lg"
      background="surface"
      aria-labelledby="work-trust-heading"
      className="work-trust border-b border-border/40"
    >
      <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
        <MarketingSectionIntro
          eyebrow={WORK_TRUST_COPY.eyebrow}
          headingId="work-trust-heading"
          title={WORK_TRUST_COPY.heading}
          description={WORK_TRUST_COPY.description}
        />
        <Link
          href={ROUTES.about}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Meet the Founder
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </div>

      <ul className="work-trust__pillars" aria-label={WORK_TRUST_COPY.pillarsLabel}>
        {WORK_TRUST_PILLARS.map((pillar) => (
          <li key={pillar.id}>
            <article
              className={cn(
                'work-trust__card',
                'work-trust__glass',
                `work-trust__card--${pillar.tone}`,
              )}
            >
              <div className="work-trust__card-head">
                <span className="work-trust__icon" aria-hidden>
                  <Icon name={pillar.icon} size="sm" className="h-[20px] w-[20px]" />
                </span>
                <h3 className="work-trust__card-title">{pillar.title}</h3>
              </div>
              <ul className="work-trust__items">
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>

      <WorkTestimonialsPanel testimonials={approved} />

      <ul className="work-trust__band" aria-label={WORK_TRUST_COPY.bandLabel}>
        {WORK_TRUST_BAND.map((item) => (
          <li key={item.id} className="work-trust__band-item work-trust__glass">
            <span className="work-trust__band-dot" aria-hidden />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Alias used by scaffold / hub exports. */
export function WorkTestimonialsSection() {
  return <WorkTrustSection />;
}
