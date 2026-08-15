'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import {
  BROWSE_INDUSTRY_CARDS,
  BROWSE_INDUSTRY_DEFAULT_ACTIVE,
  BROWSE_INDUSTRY_DESIGNS_LABEL,
  type BrowseIndustryCard,
} from './browse-by-industry.constants';

function IndustryBrowseCard({
  card,
  active,
  onActivate,
}: {
  card: BrowseIndustryCard;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={card.href}
      className={cn('bbi-card', `bbi-card--${card.accent}`, active && 'bbi-card--active')}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <div className="bbi-card-media">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 360px"
          className="bbi-card-image"
        />
        <div className="bbi-card-wash" aria-hidden="true" />
      </div>

      <div className="bbi-card-body">
        <div className="bbi-card-copy">
          <h3 className="bbi-card-title">{card.name}</h3>
          <p className="bbi-card-meta">{BROWSE_INDUSTRY_DESIGNS_LABEL}</p>
        </div>
        <span className="bbi-card-arrow" aria-hidden="true">
          <Icon name="arrow-right" size="sm" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function BrowseByIndustryGrid() {
  const [activeId, setActiveId] = useState(BROWSE_INDUSTRY_DEFAULT_ACTIVE);

  return (
    <ul className="bbi-grid" aria-label="Industries">
      {BROWSE_INDUSTRY_CARDS.map((card) => (
        <li key={card.id} className="bbi-grid-item">
          <IndustryBrowseCard
            card={card}
            active={activeId === card.id}
            onActivate={() => setActiveId(card.id)}
          />
        </li>
      ))}
    </ul>
  );
}
