import { SearchResultItem } from './SearchResultItem';
import type { SearchGroup, SearchResult } from './types';

interface SearchResultsGroupProps {
  readonly group: SearchGroup;
  readonly query: string;
  readonly activeId: string | null;
  readonly flatIndexStart: number;
  readonly onActivateIndex: (index: number) => void;
  readonly onSelect: (result: SearchResult) => void;
}

export function SearchResultsGroup({
  group,
  query,
  activeId,
  flatIndexStart,
  onActivateIndex,
  onSelect,
}: SearchResultsGroupProps) {
  return (
    <section className="gs-group" aria-label={group.label}>
      <h3 className="gs-group__label">{group.label}</h3>
      <div role="presentation">
        {group.results.map((result, offset) => {
          const flatIndex = flatIndexStart + offset;
          const optionId = `gs-option-${result.document.id}`;

          return (
            <SearchResultItem
              key={result.document.id}
              id={optionId}
              result={result}
              query={query}
              active={activeId === result.document.id}
              onHover={() => onActivateIndex(flatIndex)}
              onSelect={() => onSelect(result)}
            />
          );
        })}
      </div>
    </section>
  );
}
