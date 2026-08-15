import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { INDUSTRIES_DETAIL_META } from './industries.content';
import type { IndustryItem } from './types';

const ctaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[48px] min-w-[160px] px-[20px]',
});

interface IndustryDetailPanelProps {
  readonly industry: IndustryItem;
}

export function IndustryDetailPanel({ industry }: IndustryDetailPanelProps) {
  return (
    <Section
      id="industry-detail"
      spacing="lg"
      aria-labelledby="industry-detail-heading"
      className="ip-detail ip-section--muted"
    >
      <header className="ip-section-head">
        <p className="ip-section-eyebrow">{INDUSTRIES_DETAIL_META.eyebrow}</p>
        <h2 id="industry-detail-heading" className="ip-section-title">
          {INDUSTRIES_DETAIL_META.titlePrefix} {industry.name}
        </h2>
      </header>

      <div id="industry-detail-panel" className="ip-detail__panel" aria-live="polite">
        <h3 className="ip-detail__title">{industry.name} solution overview</h3>

        <div className="ip-detail__grid">
          <div className="ip-detail__block">
            <h4>Business challenges</h4>
            <ul className="ip-detail__list">
              {industry.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ip-detail__block">
            <h4>Solutions</h4>
            <ul className="ip-detail__list">
              {industry.solutions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ip-detail__block">
            <h4>Recommended services</h4>
            <ul className="ip-detail__chips">
              {industry.recommendedServices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ip-detail__block">
            <h4>Technology stack</h4>
            <ul className="ip-detail__chips">
              {industry.technologyStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ip-detail__meta">
            <div className="ip-detail__block">
              <h4>Typical timeline</h4>
              <p>{industry.typicalTimeline}</p>
            </div>
            <div className="ip-detail__block">
              <h4>Starting investment</h4>
              <p>{industry.startingInvestment} Starting From</p>
            </div>
          </div>
        </div>

        <div className="ip-detail__actions">
          <Link href={industry.cta.href} className={ctaClassName}>
            <span>{industry.cta.label}</span>
            <ButtonArrow className="text-[15px]" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
