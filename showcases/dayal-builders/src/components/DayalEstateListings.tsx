'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LayoutGrid, RotateCcw, Rows3, SlidersHorizontal } from 'lucide-react';
import { useCallback, useMemo } from 'react';

import DayalEstateListingCard from '@bitcraftly/showcase-dayal-builders/components/DayalEstateListingCard';
import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import {
  ANY_CONFIG,
  ANY_LOCALITY,
  useEstateFilters,
} from '@bitcraftly/showcase-dayal-builders/components/DayalEstateFilters';
import {
  BUDGET_OPTIONS,
  CONFIG_OPTIONS,
  ESTATE_DISCLAIMER,
  ESTATE_GROUPS,
  LOCALITY_OPTIONS,
  SORT_OPTIONS,
  type EstateListing,
  type SortOption,
} from '@bitcraftly/showcase-dayal-builders/lib/estate';

function sortListings(listings: readonly EstateListing[], sort: SortOption): EstateListing[] {
  const next = [...listings];
  switch (sort) {
    case 'price-asc':
      return next.sort((a, b) => a.price[0] - b.price[0]);
    case 'price-desc':
      return next.sort((a, b) => b.price[1] - a.price[1]);
    case 'area-desc':
      return next.sort((a, b) => b.area[1] - a.area[1]);
    default:
      return next;
  }
}

export default function DayalEstateListings() {
  const reduce = useReducedMotion();
  const {
    config,
    locality,
    budgetId,
    sort,
    view,
    isFiltered,
    setConfig,
    setLocality,
    setBudgetId,
    setSort,
    setView,
    reset,
  } = useEstateFilters();

  const budget = useMemo(
    () => BUDGET_OPTIONS.find((option) => option.id === budgetId) ?? BUDGET_OPTIONS[0],
    [budgetId],
  );

  const matches = useCallback(
    (listing: EstateListing) => {
      const configMatch = config === ANY_CONFIG || listing.configs.includes(config);
      const localityMatch =
        locality === ANY_LOCALITY ||
        listing.location.toLowerCase().includes(locality.toLowerCase());
      const budgetMatch = listing.price[0] <= budget.max && listing.price[1] >= budget.min;
      return configMatch && localityMatch && budgetMatch;
    },
    [budget.max, budget.min, config, locality],
  );

  const groups = useMemo(
    () =>
      ESTATE_GROUPS.map((group) => ({
        ...group,
        results: sortListings(group.listings.filter(matches), sort),
      })),
    [matches, sort],
  );

  const resultCount = groups.reduce((total, group) => total + group.results.length, 0);

  return (
    <section id="projects" className="dre-section dre-anchor" aria-label="Property inventory">
      <div className="dayal-container">
        <DayalReveal className="max-w-2xl">
          <p className="dre-eyebrow">Inventory</p>
          <h2 className="dre-title mt-3">Find your address in Jamshedpur</h2>
          <p className="dre-lead mt-3">
            Filter by configuration, locality and budget to shortlist homes across our launched,
            under-construction and delivered projects.
          </p>
        </DayalReveal>

        <DayalReveal delay={0.08} className="mt-7">
          <div className="dre-toolbar">
            <div className="dre-toolbar__group" role="group" aria-label="Filter by configuration">
              <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#5c6478]">
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                Type
              </span>
              <button
                type="button"
                className={`dre-chip${config === ANY_CONFIG ? ' is-active' : ''}`}
                aria-pressed={config === ANY_CONFIG}
                onClick={() => setConfig(ANY_CONFIG)}
              >
                All
              </button>
              {CONFIG_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`dre-chip${config === option ? ' is-active' : ''}`}
                  aria-pressed={config === option}
                  onClick={() => setConfig(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="dre-toolbar__group ml-auto">
              <label className="sr-only" htmlFor="dre-locality">
                Locality
              </label>
              <select
                id="dre-locality"
                className="dre-toolbar__select"
                value={locality}
                onChange={(event) => setLocality(event.target.value)}
              >
                {LOCALITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="dre-budget">
                Budget
              </label>
              <select
                id="dre-budget"
                className="dre-toolbar__select"
                value={budgetId}
                onChange={(event) => setBudgetId(event.target.value)}
              >
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="dre-sort">
                Sort listings
              </label>
              <select
                id="dre-sort"
                className="dre-toolbar__select"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="dre-toolbar__toggle" role="group" aria-label="Change layout">
                <button
                  type="button"
                  className={view === 'grid' ? 'is-active' : ''}
                  aria-pressed={view === 'grid'}
                  onClick={() => setView('grid')}
                >
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
                  Grid
                </button>
                <button
                  type="button"
                  className={view === 'list' ? 'is-active' : ''}
                  aria-pressed={view === 'list'}
                  onClick={() => setView('list')}
                >
                  <Rows3 className="h-3.5 w-3.5" aria-hidden />
                  List
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0b1633]" role="status" aria-live="polite">
              {resultCount} {resultCount === 1 ? 'project' : 'projects'} match your filters
              {isFiltered ? '' : ' — showing everything'}
            </p>
            {isFiltered ? (
              <button type="button" className="dre-chip" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Clear filters
              </button>
            ) : null}
          </div>
        </DayalReveal>

        <div className="mt-10 space-y-14 sm:mt-12 sm:space-y-16">
          {groups.map((group) => (
            <div key={group.id} id={group.id} className="dre-anchor">
              <DayalReveal className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="dre-eyebrow">{group.label}</p>
                  <h3 className="dre-title dre-title--sm mt-2">{group.title}</h3>
                  <p className="dre-lead mt-2 max-w-xl">{group.subtitle}</p>
                </div>
                <p className="rounded-full border border-[#0b1633]/10 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#5c6478]">
                  {group.results.length} / {group.listings.length} shown
                </p>
              </DayalReveal>

              {group.results.length ? (
                <motion.ul
                  className={`dre-grid mt-6${view === 'list' ? ' dre-grid--list' : ''}`}
                  layout={reduce ? false : undefined}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {group.results.map((listing) => (
                      <motion.li
                        key={listing.id}
                        layout={reduce ? false : undefined}
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="min-w-0"
                      >
                        <DayalEstateListingCard listing={listing} view={view} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              ) : (
                <p className="dre-empty mt-6">
                  No {group.title.toLowerCase()} match this combination. Try a wider budget or clear
                  the filters.
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="dre-note mt-10 max-w-3xl">{ESTATE_DISCLAIMER}</p>
      </div>
    </section>
  );
}
