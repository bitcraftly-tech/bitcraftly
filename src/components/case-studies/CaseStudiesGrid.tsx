'use client';

import { CaseStudyCard } from './CaseStudyCard';
import type { CaseStudyItem } from './types';

interface CaseStudiesGridProps {
  readonly studies: readonly CaseStudyItem[];
  readonly expandedId: string | null;
  readonly onToggle: (id: string) => void;
}

export function CaseStudiesGrid({ studies, expandedId, onToggle }: CaseStudiesGridProps) {
  if (studies.length === 0) {
    return (
      <div className="cs-grid" role="status">
        <p className="cs-empty">No case studies match this filter.</p>
      </div>
    );
  }

  return (
    <div className="cs-grid">
      {studies.map((study) => (
        <CaseStudyCard
          key={study.id}
          study={study}
          expanded={expandedId === study.id}
          onToggle={() => onToggle(study.id)}
        />
      ))}
    </div>
  );
}
