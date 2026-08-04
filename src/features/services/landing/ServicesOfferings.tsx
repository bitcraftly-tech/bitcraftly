import { Section } from '@/components/ui/section';
import { SERVICE_CATEGORIES } from './services-landing.content';
import { ServiceOfferingCard } from './ServiceOfferingCard';

export function ServicesOfferings() {
  return (
    <Section
      id="services-offerings"
      spacing="lg"
      aria-labelledby="services-offerings-heading"
    >
      <header className="sl-section-head">
        <p className="sl-section-eyebrow">Service catalog</p>
        <h2 id="services-offerings-heading" className="sl-section-title">
          Capabilities organized by what you need to ship
        </h2>
        <p className="sl-section-desc">
          Six focused categories — each with clear scope, starting investment, and the stack we use
          to deliver.
        </p>
      </header>

      {SERVICE_CATEGORIES.map((category) => (
        <section
          key={category.id}
          id={`service-category-${category.id}`}
          className="sl-category"
          aria-labelledby={`${category.id}-heading`}
        >
          <header className="sl-category__head">
            <h3 id={`${category.id}-heading`} className="sl-category__title">
              {category.title}
            </h3>
            <p className="sl-category__desc">{category.description}</p>
          </header>

          <div className="sl-grid">
            {category.offerings.map((offering) => (
              <ServiceOfferingCard key={offering.id} offering={offering} />
            ))}
          </div>
        </section>
      ))}
    </Section>
  );
}
