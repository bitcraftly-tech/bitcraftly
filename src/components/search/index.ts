export { CommandPalette } from './CommandPalette';
export type { CommandPaletteProps } from './CommandPalette';
export { GlobalSearch } from './GlobalSearch';
export type { GlobalSearchProps } from './GlobalSearch';
export { SearchDialog } from './SearchDialog';
export { SearchHighlight } from './SearchHighlight';
export { SearchResultItem } from './SearchResultItem';
export { SearchResultsGroup } from './SearchResultsGroup';
export { SearchEmptyState } from './SearchEmptyState';
export { SearchRecentList } from './SearchRecentList';
export { fuzzySearchDocuments } from './search.fuzzy';
export {
  getSearchIndex,
  SEARCH_CATEGORIES,
  SEARCH_MOCK_DOCUMENTS,
  getCategoryLabel,
} from './search.mock';
export { readRecentSearches, writeRecentSearch, clearRecentSearches } from './search.recent';
export type {
  SearchCategoryId,
  SearchCategoryMeta,
  SearchDocument,
  SearchGroup,
  SearchMatchRange,
  SearchResult,
} from './types';
