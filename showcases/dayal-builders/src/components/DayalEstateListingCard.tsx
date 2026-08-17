'use client';

import { CalendarClock, LayoutGrid, MapPin, Ruler } from 'lucide-react';
import Image from 'next/image';

import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import {
  type EstateListing,
  formatAreaRange,
  formatPriceRange,
} from '@bitcraftly/showcase-dayal-builders/lib/estate';

const BADGE_CLASS: Record<EstateListing['status'], string> = {
  Future: 'dre-badge--future',
  Ongoing: 'dre-badge--ongoing',
  Completed: 'dre-badge--completed',
};

type Props = {
  listing: EstateListing;
  view: 'grid' | 'list';
};

export default function DayalEstateListingCard({ listing, view }: Props) {
  const soldOut = listing.units.available === 0;
  const availablePct = listing.units.total
    ? Math.round((listing.units.available / listing.units.total) * 100)
    : 0;

  return (
    <article className={`dre-card${view === 'list' ? ' dre-card--list' : ''}`}>
      <div className="dre-card__media">
        <Image
          src={listing.image}
          alt={`${listing.name}, ${listing.location}`}
          fill
          sizes={
            view === 'list'
              ? '(max-width: 768px) 100vw, 18rem'
              : '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw'
          }
          className="object-cover"
        />
        <div className="dre-card__badges">
          <span className={`dre-badge ${BADGE_CLASS[listing.status]}`}>{listing.status}</span>
          <span className="dre-badge dre-badge--ghost">
            {soldOut ? 'Sold out' : `${listing.units.available} units left`}
          </span>
        </div>
        <div className="dre-card__price">
          <strong>{formatPriceRange(listing)}</strong>
          <span>Indicative</span>
        </div>
      </div>

      <div className="dre-card__body">
        <div className="min-w-0">
          <h3 className="dre-card__name">{listing.name}</h3>
          <p className="dre-card__meta">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#c8a46b]" aria-hidden />
            <span className="truncate">{listing.location}</span>
          </p>
        </div>

        <dl className="dre-card__specs">
          <div className="dre-card__spec">
            <dt>
              <LayoutGrid className="mr-1 inline h-3 w-3 align-[-1px]" aria-hidden />
              Config
            </dt>
            <dd>{listing.configs.join(' · ')}</dd>
          </div>
          <div className="dre-card__spec">
            <dt>
              <Ruler className="mr-1 inline h-3 w-3 align-[-1px]" aria-hidden />
              Carpet
            </dt>
            <dd>{formatAreaRange(listing)}</dd>
          </div>
          <div className="dre-card__spec">
            <dt>
              <CalendarClock className="mr-1 inline h-3 w-3 align-[-1px]" aria-hidden />
              Possession
            </dt>
            <dd>{listing.possession}</dd>
          </div>
          {view === 'list' ? (
            <div className="dre-card__spec">
              <dt>RERA</dt>
              <dd>{listing.rera}</dd>
            </div>
          ) : null}
        </dl>

        {view === 'list' ? (
          <p className="text-sm leading-relaxed text-[#5c6478]">{listing.description}</p>
        ) : null}

        <ul className="dre-card__tags">
          {listing.highlights.map((highlight) => (
            <li key={highlight} className="dre-tag">
              {highlight}
            </li>
          ))}
        </ul>

        <div className="dre-card__availability">
          <span>{soldOut ? 'Fully sold' : `${availablePct}% inventory open`}</span>
          <span className="dre-card__bar" aria-hidden>
            <span style={{ width: `${soldOut ? 100 : availablePct}%` }} />
          </span>
        </div>

        <div className="dre-card__actions">
          <DayalSectionLink href="#contact" className="dre-btn-solid">
            {soldOut ? 'Ask about resale' : 'Enquire now'}
          </DayalSectionLink>
          <DayalSectionLink href="#amenities" className="dre-btn-quiet">
            Floor plans
          </DayalSectionLink>
        </div>
      </div>
    </article>
  );
}
