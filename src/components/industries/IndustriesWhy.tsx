import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { INDUSTRIES_WHY, INDUSTRIES_WHY_META } from './industries.content';

export function IndustriesWhy() {
  return (
    <Section id="industries-why" spacing="lg" aria-labelledby="industries-why-heading">
      <header className="ip-section-head">
        <p className="ip-section-eyebrow">{INDUSTRIES_WHY_META.eyebrow}</p>
        <h2 id="industries-why-heading" className="ip-section-title">
          {INDUSTRIES_WHY_META.title}
        </h2>
        <p className="ip-section-desc">{INDUSTRIES_WHY_META.description}</p>
      </header>

      <div className="ip-why">
        {INDUSTRIES_WHY.map((item) => (
          <article key={item.id} className="ip-why__card">
            <span className="ip-why__icon" aria-hidden>
              <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
            </span>
            <h3 className="ip-why__title">{item.title}</h3>
            <p className="ip-why__desc">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
