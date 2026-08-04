'use client';

import { useMemo, useState } from 'react';
import { INDUSTRY_ITEMS } from './industries.content';
import { IndustriesFaq } from './IndustriesFaq';
import { IndustriesFinalCta } from './IndustriesFinalCta';
import { IndustriesGrid } from './IndustriesGrid';
import { IndustriesHero } from './IndustriesHero';
import { IndustriesMetrics } from './IndustriesMetrics';
import { IndustriesTechStack } from './IndustriesTechStack';
import { IndustriesWhy } from './IndustriesWhy';
import { IndustryDetailPanel } from './IndustryDetailPanel';
import type { IndustryId } from './types';
import './industries-page.css';

export interface IndustriesPageProps {
  readonly initialIndustryId?: IndustryId;
  readonly className?: string;
}

export function IndustriesPage({
  initialIndustryId = 'healthcare',
  className,
}: IndustriesPageProps) {
  const [selectedId, setSelectedId] = useState<IndustryId>(initialIndustryId);

  const selectedIndustry = useMemo(() => {
    const match = INDUSTRY_ITEMS.find((item) => item.id === selectedId);
    return match ?? INDUSTRY_ITEMS[0]!;
  }, [selectedId]);

  const handleSelect = (id: IndustryId) => {
    setSelectedId(id);

    if (typeof window !== 'undefined') {
      const detail = document.getElementById('industry-detail');
      if (detail && window.matchMedia('(max-width: 767px)').matches) {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={['industries-page', className].filter(Boolean).join(' ')}>
      <IndustriesHero selectedId={selectedId} onSelect={handleSelect} />
      <IndustriesGrid selectedId={selectedId} onSelect={handleSelect} />
      <IndustryDetailPanel industry={selectedIndustry} />
      <IndustriesWhy />
      <IndustriesTechStack />
      <IndustriesMetrics />
      <IndustriesFaq />
      <IndustriesFinalCta />
    </div>
  );
}
