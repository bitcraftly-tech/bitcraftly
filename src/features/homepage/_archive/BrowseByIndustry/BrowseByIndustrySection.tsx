import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import {
  BROWSE_INDUSTRY_DESCRIPTION,
  BROWSE_INDUSTRY_HEADING,
  BROWSE_INDUSTRY_HEADING_ID,
  BROWSE_INDUSTRY_ID,
  BROWSE_INDUSTRY_LABEL,
} from './browse-by-industry.constants';
import { BrowseByIndustryGrid } from './BrowseByIndustryGrid';
import './browse-by-industry.css';

/**
 * Premium industry browser — visual bridge from Hero into product discovery.
 */
export function BrowseByIndustrySection() {
  return (
    <section
      id={BROWSE_INDUSTRY_ID}
      aria-labelledby={BROWSE_INDUSTRY_HEADING_ID}
      className="bbi-section homepage-section text-foreground"
    >
      <Container size="xl">
        <header className="bbi-intro">
          <p className="bbi-eyebrow">{BROWSE_INDUSTRY_LABEL}</p>
          <h2 id={BROWSE_INDUSTRY_HEADING_ID} className="bbi-heading">
            {BROWSE_INDUSTRY_HEADING}
          </h2>
          <p className={cn('bbi-description')}>{BROWSE_INDUSTRY_DESCRIPTION}</p>
        </header>

        <BrowseByIndustryGrid />
      </Container>
    </section>
  );
}
