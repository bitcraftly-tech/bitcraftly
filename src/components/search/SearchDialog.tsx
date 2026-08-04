'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { fuzzySearchDocuments } from './search.fuzzy';
import { getSearchIndex, SEARCH_CATEGORIES } from './search.index';
import {
  clearRecentSearches,
  readRecentSearches,
  writeRecentSearch,
} from './search.recent';
import { SearchEmptyState } from './SearchEmptyState';
import { SearchRecentList } from './SearchRecentList';
import { SearchResultsGroup } from './SearchResultsGroup';
import type { SearchGroup, SearchResult } from './types';

interface SearchDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

function groupResults(results: readonly SearchResult[]): readonly SearchGroup[] {
  return SEARCH_CATEGORIES.map((category) => ({
    category: category.id,
    label: category.label,
    results: results.filter((result) => result.document.category === category.id),
  })).filter((group) => group.results.length > 0);
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const labelId = useId();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<readonly string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const index = useMemo(() => getSearchIndex(), []);

  const results = useMemo(() => fuzzySearchDocuments(index, query, 28), [index, query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flatResults = useMemo(() => groups.flatMap((group) => group.results), [groups]);
  const activeResult = flatResults[activeIndex] ?? null;

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery('');
    setActiveIndex(0);
  }, [onOpenChange]);

  const selectResult = useCallback(
    (result: SearchResult) => {
      const saved = query.trim() || result.document.title;
      writeRecentSearch(saved);
      setRecent(readRecentSearches());
      close();
      router.push(result.document.href);
    },
    [close, query, router],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    setRecent(readRecentSearches());
    setActiveIndex(0);

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', onDocumentKeyDown);
    return () => document.removeEventListener('keydown', onDocumentKeyDown);
  }, [close, open]);

  const applySuggestion = (value: string) => {
    setQuery(value);
    setRecent(writeRecentSearch(value));
    inputRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (flatResults.length === 0) return;
      setActiveIndex((current) => (current + 1) % flatResults.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (flatResults.length === 0) return;
      setActiveIndex((current) => (current - 1 + flatResults.length) % flatResults.length);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      if (flatResults.length > 0) {
        setActiveIndex(flatResults.length - 1);
      }
      return;
    }

    if (event.key === 'Enter' && activeResult) {
      event.preventDefault();
      selectResult(activeResult);
    }
  };

  if (!open) {
    return null;
  }

  let flatCursor = 0;

  return (
    <div className="gs-root">
      <div
        className="gs-overlay"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
      >
        <div
          ref={dialogRef}
          className="gs-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
        >
          <p id={labelId} className="sr-only">
            Command palette
          </p>

          <div className="gs-searchbar">
            <span className="gs-searchbar__icon" aria-hidden>
              <Icon name="search" size="sm" className="h-[18px] w-[18px]" />
            </span>
            <input
              ref={inputRef}
              type="search"
              className="gs-searchbar__input"
              placeholder="Search pages, services, industries, AI, pricing, blog…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={
                activeResult ? `gs-option-${activeResult.document.id}` : undefined
              }
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button type="button" className="gs-searchbar__esc" onClick={close}>
              Esc
            </button>
          </div>

          <div className="gs-body" id={listboxId} role="listbox" aria-label="Command palette results">
            {query.trim() ? (
              flatResults.length > 0 ? (
                groups.map((group) => {
                  const start = flatCursor;
                  flatCursor += group.results.length;

                  return (
                    <SearchResultsGroup
                      key={group.category}
                      group={group}
                      query={query}
                      activeId={activeResult?.document.id ?? null}
                      flatIndexStart={start}
                      onActivateIndex={setActiveIndex}
                      onSelect={selectResult}
                    />
                  );
                })
              ) : (
                <SearchEmptyState query={query} onSuggestion={applySuggestion} />
              )
            ) : (
              <>
                <SearchRecentList
                  items={recent}
                  onSelect={applySuggestion}
                  onClear={() => {
                    clearRecentSearches();
                    setRecent([]);
                  }}
                />
                <SearchEmptyState query="" onSuggestion={applySuggestion} />
              </>
            )}
          </div>

          <div className="gs-footer">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> navigate
            </span>
            <span>
              <kbd>↵</kbd> open
            </span>
            <span>
              <kbd>esc</kbd> close
            </span>
            <span className="gs-footer__hint">Pages · Services · AI · Pricing · Blog</span>
          </div>
        </div>
      </div>
    </div>
  );
}
