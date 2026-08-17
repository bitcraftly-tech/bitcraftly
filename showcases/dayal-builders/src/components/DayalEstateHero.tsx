'use client';

import { useReducedMotion } from 'framer-motion';
import { BadgeCheck, Building2, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { scrollToElementWithRetry } from '@/lib/scrollToMarketingSection';

import DayalHeroBackgroundVideo from '@bitcraftly/showcase-dayal-builders/components/DayalHeroBackgroundVideo';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import {
  ANY_BUDGET,
  ANY_CONFIG,
  ANY_LOCALITY,
  useEstateFilters,
} from '@bitcraftly/showcase-dayal-builders/components/DayalEstateFilters';
import { DAYAL, HERO_VIDEO_POSTER } from '@bitcraftly/showcase-dayal-builders/lib/data';
import {
  BUDGET_OPTIONS,
  CONFIG_OPTIONS,
  ESTATE_LISTINGS,
  LOCALITY_OPTIONS,
  formatAreaRange,
  formatPriceRange,
} from '@bitcraftly/showcase-dayal-builders/lib/estate';

const QUICK_LINKS = [
  { label: 'New launches', href: '#future-projects' },
  { label: 'Ready to book', href: '#ongoing-projects' },
  { label: 'Handed over', href: '#past-projects' },
] as const;

const FEATURED = ESTATE_LISTINGS[0];

export default function DayalEstateHero() {
  const reduce = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);
  const { applySearch } = useEstateFilters();

  const [config, setConfig] = useState(ANY_CONFIG);
  const [locality, setLocality] = useState(ANY_LOCALITY);
  const [budgetId, setBudgetId] = useState(ANY_BUDGET);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applySearch({ config, locality, budgetId });
    scrollToElementWithRetry('projects');
  }

  const motionSafe = !reduce;

  return (
    <section
      id="home"
      ref={shellRef}
      className="relative isolate flex min-h-[88svh] flex-col justify-center overflow-hidden bg-[#0b1633] pb-12 pt-28 sm:pb-16 sm:pt-32 lg:min-h-[90svh]"
      aria-label={`${DAYAL.brand} — property search`}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_VIDEO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <DayalHeroBackgroundVideo
          active
          autoplay={motionSafe}
          shellRef={shellRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,51,0.86)_0%,rgba(11,22,51,0.6)_45%,rgba(11,22,51,0.92)_100%)]"
          aria-hidden
        />
      </div>

      <div className="dayal-container">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
          <div className="dre-rise min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <BadgeCheck className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
              {DAYAL.location} · Since 1999
            </p>

            <h1 className="dre-hero__title mt-4">{DAYAL.heroHeadline}</h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Browse live inventory across Jamshedpur — new launches, under-construction homes and
              delivered addresses, with configurations, carpet areas and indicative pricing in one
              place.
            </p>

            <form
              onSubmit={onSearch}
              className="dre-search mt-7"
              aria-label="Search Dayal Builders inventory"
            >
              <label className="dre-search__field">
                <span className="dre-search__label">Property type</span>
                <select
                  className="dre-search__select"
                  value={config}
                  onChange={(event) => setConfig(event.target.value)}
                >
                  <option value={ANY_CONFIG}>{ANY_CONFIG}</option>
                  {CONFIG_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="dre-search__field">
                <span className="dre-search__label">Locality</span>
                <select
                  className="dre-search__select"
                  value={locality}
                  onChange={(event) => setLocality(event.target.value)}
                >
                  {LOCALITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="dre-search__field">
                <span className="dre-search__label">Budget</span>
                <select
                  className="dre-search__select"
                  value={budgetId}
                  onChange={(event) => setBudgetId(event.target.value)}
                >
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="dre-search__submit">
                <Search className="h-4 w-4" aria-hidden />
                Search homes
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {QUICK_LINKS.map((link) => (
                <DayalSectionLink
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur transition hover:border-[#c8a46b]/70 hover:text-white"
                >
                  {link.label}
                </DayalSectionLink>
              ))}
            </div>
          </div>

          {FEATURED ? (
            <aside
              className="dre-rise dre-rise--late hidden min-w-0 rounded-2xl border border-white/20 bg-[#0b1633]/55 p-4 text-white backdrop-blur-lg lg:block"
              aria-label={`Featured project: ${FEATURED.name}`}
            >
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c8a46b]">
                Featured launch
              </p>
              <div className="mt-3 flex gap-3">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={FEATURED.image} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="dayal-serif truncate text-lg font-semibold text-white">
                    {FEATURED.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/75">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#c8a46b]" aria-hidden />
                    <span className="truncate">{FEATURED.location}</span>
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-[#e0c48f]">
                    {formatPriceRange(FEATURED)}
                  </p>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3 text-center">
                <div>
                  <dt className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/55">
                    Config
                  </dt>
                  <dd className="mt-0.5 text-xs font-semibold">{FEATURED.configs.join(' / ')}</dd>
                </div>
                <div>
                  <dt className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/55">
                    Carpet
                  </dt>
                  <dd className="mt-0.5 text-xs font-semibold">{formatAreaRange(FEATURED)}</dd>
                </div>
                <div>
                  <dt className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/55">
                    Possession
                  </dt>
                  <dd className="mt-0.5 text-xs font-semibold">{FEATURED.possession}</dd>
                </div>
              </dl>

              <DayalSectionLink
                href="#contact"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#c8a46b] px-4 py-2.5 text-sm font-bold text-[#0b1633] transition hover:bg-[#d4b57d]"
              >
                <Building2 className="h-4 w-4" aria-hidden />
                Book a site visit
              </DayalSectionLink>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
