import type { IconName } from '@/components/ui/icon';
import { Icon } from '@/components/ui/icon';
import { SearchHighlight } from './SearchHighlight';
import { getCategoryLabel } from './search.index';
import type { SearchCategoryId, SearchResult } from './types';

const CATEGORY_ICONS: Record<SearchCategoryId, IconName> = {
  pages: 'globe',
  services: 'layout-grid',
  industries: 'map-pin',
  'ai-solutions': 'brain',
  'case-studies': 'sparkles',
  pricing: 'trending-up',
  blog: 'quote',
};

interface SearchResultItemProps {
  readonly result: SearchResult;
  readonly query: string;
  readonly active: boolean;
  readonly id: string;
  readonly onSelect: () => void;
  readonly onHover: () => void;
}

export function SearchResultItem({
  result,
  query,
  active,
  id,
  onSelect,
  onHover,
}: SearchResultItemProps) {
  const { document } = result;

  return (
    <button
      type="button"
      id={id}
      role="option"
      aria-selected={active}
      className={['gs-item', active ? 'is-active' : ''].filter(Boolean).join(' ')}
      onClick={onSelect}
      onMouseEnter={onHover}
    >
      <span className="gs-item__icon" aria-hidden>
        <Icon name={CATEGORY_ICONS[document.category]} size="sm" className="h-[15px] w-[15px]" />
      </span>
      <span className="gs-item__content">
        <p className="gs-item__title">
          <SearchHighlight text={document.title} query={query} />
        </p>
        <p className="gs-item__desc">
          <SearchHighlight text={document.description} query={query} />
        </p>
      </span>
      <p className="gs-item__meta">{getCategoryLabel(document.category)}</p>
    </button>
  );
}
