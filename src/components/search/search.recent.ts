const STORAGE_KEY = 'bitcraftly.global-search.recent';
const MAX_RECENT = 8;

export function readRecentSearches(): readonly string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((item) => item.trim())
      .slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function writeRecentSearch(query: string): readonly string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const next = query.trim();
  if (!next) {
    return readRecentSearches();
  }

  const existing = readRecentSearches().filter((item) => item.toLowerCase() !== next.toLowerCase());
  const updated = [next, ...existing].slice(0, MAX_RECENT);

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore quota / private mode failures.
  }

  return updated;
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}
