import type { ReactNode } from 'react';

interface SearchHighlightProps {
  readonly text: string;
  readonly query: string;
  readonly className?: string;
}

function findCaseInsensitiveRanges(
  text: string,
  query: string,
): readonly { start: number; end: number }[] {
  const needle = query.trim();
  if (!needle) {
    return [];
  }

  const lowerText = text.toLowerCase();
  const tokens = needle
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const ranges: { start: number; end: number }[] = [];

  for (const token of tokens) {
    let from = 0;
    while (from <= lowerText.length) {
      const index = lowerText.indexOf(token, from);
      if (index === -1) {
        break;
      }
      ranges.push({ start: index, end: index + token.length });
      from = index + token.length;
    }
  }

  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: { start: number; end: number }[] = [];

  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (!last || range.start > last.end) {
      merged.push({ ...range });
    } else {
      last.end = Math.max(last.end, range.end);
    }
  }

  return merged;
}

export function SearchHighlight({ text, query, className }: SearchHighlightProps) {
  const ranges = findCaseInsensitiveRanges(text, query);

  if (ranges.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start > cursor) {
      nodes.push(text.slice(cursor, range.start));
    }
    nodes.push(
      <mark key={`${range.start}-${range.end}-${index}`} className="gs-mark">
        {text.slice(range.start, range.end)}
      </mark>,
    );
    cursor = range.end;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return <span className={className}>{nodes}</span>;
}
