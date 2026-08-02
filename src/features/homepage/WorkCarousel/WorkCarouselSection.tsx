import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { WorkCarousel } from './WorkCarousel';
import {
  WORK_CAROUSEL_DESCRIPTION,
  WORK_CAROUSEL_HEADING,
  WORK_CAROUSEL_HEADING_ID,
  WORK_CAROUSEL_ID,
  WORK_CAROUSEL_ITEMS,
  WORK_CAROUSEL_LABEL,
  WORK_CAROUSEL_VIEW_ALL,
} from './work-carousel.constants';
import './work-carousel.css';

/**
 * Portfolio work carousel — mounted directly under the homepage Hero.
 */
export function WorkCarouselSection() {
  return (
    <section
      id={WORK_CAROUSEL_ID}
      aria-labelledby={WORK_CAROUSEL_HEADING_ID}
      className="hp-work-rail"
    >
      <div className="hp-work-rail__shell">
        <div className="hp-work-rail__intro">
          <div className="hp-work-rail__copy">
            <p className="hp-work-rail__label">{WORK_CAROUSEL_LABEL}</p>
            <h2 id={WORK_CAROUSEL_HEADING_ID} className="hp-work-rail__heading">
              {WORK_CAROUSEL_HEADING}
            </h2>
            <p className="hp-work-rail__description">
              {WORK_CAROUSEL_DESCRIPTION}{' '}
              <span className="sr-only">{WORK_CAROUSEL_ITEMS.length} projects.</span>
            </p>
          </div>

          <Link href={WORK_CAROUSEL_VIEW_ALL.href} className="hp-work-rail__cta">
            {WORK_CAROUSEL_VIEW_ALL.label}
            <Icon name="arrow-right" size="sm" className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <WorkCarousel />
      </div>
    </section>
  );
}
