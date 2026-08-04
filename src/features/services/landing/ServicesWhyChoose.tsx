import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { SERVICES_WHY, SERVICES_WHY_META } from './services-landing.content';

export function ServicesWhyChoose() {
  return (
    <Section
      id="services-why"
      spacing="lg"
      aria-labelledby="services-why-heading"
      className="sl-section--muted"
    >
      <header className="sl-section-head">
        <p className="sl-section-eyebrow">{SERVICES_WHY_META.eyebrow}</p>
        <h2 id="services-why-heading" className="sl-section-title">
          {SERVICES_WHY_META.title}
        </h2>
        <p className="sl-section-desc">{SERVICES_WHY_META.description}</p>
      </header>

      <div className="sl-why">
        {SERVICES_WHY.map((item) => (
          <article key={item.id} className="sl-why__card">
            <span className="sl-why__icon" aria-hidden>
              <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <h3 className="sl-why__title">{item.title}</h3>
            <p className="sl-why__desc">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
