export type SearchCategoryId =
  | 'pages'
  | 'services'
  | 'industries'
  | 'ai-solutions'
  | 'case-studies'
  | 'pricing'
  | 'blog';

export interface SearchCategoryMeta {
  readonly id: SearchCategoryId;
  readonly label: string;
}

export interface SearchDocument {
  readonly id: string;
  readonly category: SearchCategoryId;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly keywords: readonly string[];
}

export interface SearchMatchRange {
  readonly start: number;
  readonly end: number;
}

export interface SearchResult {
  readonly document: SearchDocument;
  readonly score: number;
  readonly titleMatches: readonly SearchMatchRange[];
  readonly descriptionMatches: readonly SearchMatchRange[];
}

export interface SearchGroup {
  readonly category: SearchCategoryId;
  readonly label: string;
  readonly results: readonly SearchResult[];
}
