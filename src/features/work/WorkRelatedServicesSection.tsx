import Link from 'next/link';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { WORK_RELATED_COPY, WORK_RELATED_SERVICES } from './work.content';
import './work.css';

/**
 * Related Services — Services-style intro + capability cards.
 */
export function WorkRelatedServicesSection() {
  return (
    <Section
      id="work-related-services"
      spacing="lg"
      background="surface"
      aria-labelledby="work-related-heading"
      className="work-related border-b border-border/40"
    >
      <MarketingSectionIntro
        eyebrow={WORK_RELATED_COPY.eyebrow}
        headingId="work-related-heading"
        title={WORK_RELATED_COPY.heading}
        description={WORK_RELATED_COPY.description}
        className="section-intro-row"
      />

      <ul className="work-related__rail" aria-label="Related services">
        {WORK_RELATED_SERVICES.map((service) => (
          <li key={service.id}>
            <article className="work-related__card work-convert__glass">
              <div className="work-related__card-header">
                <span className="work-related__icon" aria-hidden>
                  <Icon name={service.icon} size="sm" className="h-[20px] w-[20px]" />
                </span>
                <h3 className="work-related__card-title">{service.title}</h3>
              </div>
              <p className="work-related__card-description">{service.description}</p>
              <Link href={service.href} className="work-related__cta">
                {service.ctaLabel}
                <Icon
                  name="arrow-right"
                  size="sm"
                  aria-hidden
                  className="work-related__cta-icon h-[13px] w-[13px]"
                />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
