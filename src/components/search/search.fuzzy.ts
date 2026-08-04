import type { SearchMatchRange, SearchResult } from './types';
import type { SearchDocument } from './types';

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function findAllRanges(haystack: string, needle: string): SearchMatchRange[] {
  if (!needle) {
    return [];
  }

  const ranges: SearchMatchRange[] = [];
  let from = 0;

  while (from <= haystack.length) {
    const index = haystack.indexOf(needle, from);
    if (index === -1) {
      break;
    }
    ranges.push({ start: index, end: index + needle.length });
    from = index + needle.length;
  }

  return ranges;
}

/** Subsequence fuzzy score — higher is better. Returns -1 when no match. */
function fuzzySubsequenceScore(query: string, target: string): number {
  if (!query) {
    return 0;
  }

  let qi = 0;
  let score = 0;
  let streak = 0;
  let prevMatch = -2;

  for (let ti = 0; ti < target.length && qi < query.length; ti += 1) {
    if (target[ti] !== query[qi]) {
      streak = 0;
      continue;
    }

    streak += 1;
    score += 2 + streak;

    if (ti === 0 || target[ti - 1] === ' ' || target[ti - 1] === '-' || target[ti - 1] === '/') {
      score += 8;
    }

    if (ti === prevMatch + 1) {
      score += 4;
    }

    prevMatch = ti;
    qi += 1;
  }

  return qi === query.length ? score : -1;
}

function scoreDocument(query: string, document: SearchDocument): SearchResult | null {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return null;
  }

  const title = normalize(document.title);
  const description = normalize(document.description);
  const keywords = normalize(document.keywords.join(' '));
  const blob = `${title} ${description} ${keywords}`;

  let score = 0;

  if (title === normalizedQuery) {
    score += 120;
  } else if (title.startsWith(normalizedQuery)) {
    score += 90;
  } else if (title.includes(normalizedQuery)) {
    score += 70;
  }

  if (description.includes(normalizedQuery)) {
    score += 28;
  }

  if (keywords.includes(normalizedQuery)) {
    score += 36;
  }

  const fuzzy = fuzzySubsequenceScore(normalizedQuery, blob);
  if (fuzzy < 0 && score === 0) {
    return null;
  }

  if (fuzzy > 0) {
    score += fuzzy;
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    if (title.includes(token)) score += 12;
    if (description.includes(token)) score += 6;
    if (keywords.includes(token)) score += 8;
  }

  return {
    document,
    score,
    titleMatches: findAllRanges(title, normalizedQuery).length
      ? findAllRanges(title, normalizedQuery)
      : tokens.flatMap((token) => findAllRanges(title, token)),
    descriptionMatches: findAllRanges(description, normalizedQuery).length
      ? findAllRanges(description, normalizedQuery)
      : tokens.flatMap((token) => findAllRanges(description, token)),
  };
}

export function fuzzySearchDocuments(
  documents: readonly SearchDocument[],
  query: string,
  limit = 24,
): readonly SearchResult[] {
  const normalized = normalize(query);
  if (!normalized) {
    return [];
  }

  return documents
    .map((document) => scoreDocument(normalized, document))
    .filter((result): result is SearchResult => result !== null)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, limit);
}
