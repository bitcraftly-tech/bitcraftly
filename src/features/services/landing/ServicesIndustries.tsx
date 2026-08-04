import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { SERVICES_INDUSTRIES, SERVICES_INDUSTRIES_META } from './services-landing.content';

export function ServicesIndustries() {
  return (
    <Section id="services-industries" spacing="lg" aria-labelledby="services-industries-heading">
      <header className="sl-section-head">
        <p className="sl-section-eyebrow">{SERVICES_INDUSTRIES_META.eyebrow}</p>
        <h2 id="services-industries-heading" className="sl-section-title">
          {SERVICES_INDUSTRIES_META.title}
        </h2>
        <p className="sl-section-desc">{SERVICES_INDUSTRIES_META.description}</p>
      </header>

      <div className="sl-industries">
        {SERVICES_INDUSTRIES.map((industry) => (
          <article key={industry.id} className="sl-industry">
            <span className="sl-industry__icon" aria-hidden>
              <Icon name={industry.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <h3 className="sl-industry__title">{industry.title}</h3>
            <p className="sl-industry__desc">{industry.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
