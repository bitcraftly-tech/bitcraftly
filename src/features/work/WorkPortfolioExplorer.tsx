'use client';

import { useDeferredValue, useMemo } from 'react';
import { SlidingPillIndicator, useSlidingPillIndicator } from '@/components/patterns/sliding-pill';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { WORK_PORTFOLIO_FILTERS, WORK_PROJECTS } from './work.content';
import { filterProjectsByExplorer, matchesPortfolioFilter } from './work.filters';
import { useWorkExplorer } from './work-explorer-context';
import './work.css';

/**
 * Portfolio filter rail — segmented stack chips + sliding active pill.
 */
export function WorkPortfolioExplorer() {
  const { state, setState, startTransition } = useWorkExplorer();
  const deferredState = useDeferredValue(state);
  const matches = useMemo(
    () => filterProjectsByExplorer(WORK_PROJECTS, deferredState),
    [deferredState],
  );
  const pill = useSlidingPillIndicator(state.portfolioFilter);

  const catalog = WORK_PROJECTS.filter((project) => project.status !== 'future');
  const visibleCount = matches.filter((p) => p.status !== 'future').length;

  function onSelect(filterId: string) {
    startTransition(() => {
      setState((current) => ({
        ...current,
        portfolioFilter: filterId,
        industries: [],
        services: [],
        technologies: [],
        query: '',
      }));
    });
  }

  return (
    <Section
      id="work-explorer"
      spacing="md"
      background="default"
      aria-labelledby="work-explorer-heading"
      className="work-explorer border-b border-border/40"
    >
      <h2 id="work-explorer-heading" className="sr-only">
        Filter portfolio projects
      </h2>

      <div className="work-pf-toolbar">
        <div className="work-pf-toolbar__meta">
          <p className="work-pf-toolbar__label">Browse by stack</p>
          <p className="work-pf-filters__status" aria-live="polite">
            Showing <span className="work-pf-filters__status-count">{visibleCount}</span>{' '}
            {visibleCount === 1 ? 'project' : 'projects'}
          </p>
        </div>

        <div className="work-pf-filters-shell">
          <div ref={pill.containerRef} className="work-pf-filters sliding-pill-track">
            <SlidingPillIndicator style={pill.indicatorStyle} variant="gradient" />
            <ul className="work-pf-filters__list" aria-label="Project filters">
              {WORK_PORTFOLIO_FILTERS.map((filter) => {
                const count =
                  filter.id === 'all'
                    ? catalog.length
                    : catalog.filter((project) => matchesPortfolioFilter(project, filter.id))
                        .length;
                const active = state.portfolioFilter === filter.id;
                return (
                  <li key={filter.id}>
                    <button
                      ref={pill.itemRef(filter.id)}
                      type="button"
                      className={cn(
                        'work-pf-filter relative z-[1]',
                        active && 'work-pf-filter--active',
                      )}
                      aria-pressed={active}
                      onClick={() => onSelect(filter.id)}
                    >
                      <span className="work-pf-filter__label">{filter.label}</span>
                      <span className="work-pf-filter__count">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
