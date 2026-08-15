'use client';

import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import {
  CASE_STUDIES_SECTION_COPY,
  CASE_STUDY_FILTERS,
  CASE_STUDY_ITEMS,
} from './case-studies.content';
import { CaseStudiesGrid } from './CaseStudiesGrid';
import { CaseStudyFilters } from './CaseStudyFilters';
import type { CaseStudyFilterId, CaseStudyItem } from './types';
import './case-studies-section.css';

export interface CaseStudiesSectionProps {
  readonly eyebrow?: string;
  readonly title?: string;
  readonly description?: string;
  readonly studies?: readonly CaseStudyItem[];
  readonly headingId?: string;
}

export function CaseStudiesSection({
  eyebrow = CASE_STUDIES_SECTION_COPY.eyebrow,
  title = CASE_STUDIES_SECTION_COPY.title,
  description = CASE_STUDIES_SECTION_COPY.description,
  studies = CASE_STUDY_ITEMS,
  headingId = 'case-studies-section-heading',
}: CaseStudiesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CaseStudyFilterId>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredStudies = useMemo(() => {
    if (activeFilter === 'all') {
      return studies;
    }

    return studies.filter((study) => study.industry === activeFilter);
  }, [activeFilter, studies]);

  const handleFilterChange = (filter: CaseStudyFilterId) => {
    setActiveFilter(filter);
    setExpandedId(null);
  };

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <Section spacing="lg" background="default" className="cs-section" aria-labelledby={headingId}>
      <Container>
        <header className="cs-section__intro">
          <p className="cs-section__eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="cs-section__title">
            {title}
          </h2>
          <p className="cs-section__description">{description}</p>
        </header>

        <CaseStudyFilters
          filters={CASE_STUDY_FILTERS}
          activeFilter={activeFilter}
          onChange={handleFilterChange}
        />

        <CaseStudiesGrid
          studies={filteredStudies}
          expandedId={expandedId}
          onToggle={handleToggle}
        />
      </Container>
    </Section>
  );
}
