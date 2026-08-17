'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { SortOption } from '@bitcraftly/showcase-dayal-builders/lib/estate';

export const ANY_CONFIG = 'Any type';
export const ANY_LOCALITY = 'Any locality';
export const ANY_BUDGET = 'any';

export type EstateFilterState = {
  readonly config: string;
  readonly locality: string;
  readonly budgetId: string;
  readonly sort: SortOption;
  readonly view: 'grid' | 'list';
};

const DEFAULT_STATE: EstateFilterState = {
  config: ANY_CONFIG,
  locality: ANY_LOCALITY,
  budgetId: ANY_BUDGET,
  sort: 'relevance',
  view: 'grid',
};

type EstateFilterContextValue = EstateFilterState & {
  readonly isFiltered: boolean;
  setConfig: (value: string) => void;
  setLocality: (value: string) => void;
  setBudgetId: (value: string) => void;
  setSort: (value: SortOption) => void;
  setView: (value: 'grid' | 'list') => void;
  applySearch: (value: Pick<EstateFilterState, 'config' | 'locality' | 'budgetId'>) => void;
  reset: () => void;
};

const EstateFilterContext = createContext<EstateFilterContextValue | null>(null);

export function DayalEstateFilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EstateFilterState>(DEFAULT_STATE);

  const setConfig = useCallback((config: string) => setState((s) => ({ ...s, config })), []);
  const setLocality = useCallback((locality: string) => setState((s) => ({ ...s, locality })), []);
  const setBudgetId = useCallback((budgetId: string) => setState((s) => ({ ...s, budgetId })), []);
  const setSort = useCallback((sort: SortOption) => setState((s) => ({ ...s, sort })), []);
  const setView = useCallback((view: 'grid' | 'list') => setState((s) => ({ ...s, view })), []);
  const applySearch = useCallback(
    (value: Pick<EstateFilterState, 'config' | 'locality' | 'budgetId'>) =>
      setState((s) => ({ ...s, ...value })),
    [],
  );
  const reset = useCallback(() => setState((s) => ({ ...DEFAULT_STATE, view: s.view })), []);

  const value = useMemo<EstateFilterContextValue>(
    () => ({
      ...state,
      isFiltered:
        state.config !== ANY_CONFIG ||
        state.locality !== ANY_LOCALITY ||
        state.budgetId !== ANY_BUDGET,
      setConfig,
      setLocality,
      setBudgetId,
      setSort,
      setView,
      applySearch,
      reset,
    }),
    [state, setConfig, setLocality, setBudgetId, setSort, setView, applySearch, reset],
  );

  return <EstateFilterContext.Provider value={value}>{children}</EstateFilterContext.Provider>;
}

export function useEstateFilters(): EstateFilterContextValue {
  const context = useContext(EstateFilterContext);
  if (!context) {
    throw new Error('useEstateFilters must be used inside DayalEstateFilterProvider');
  }
  return context;
}
