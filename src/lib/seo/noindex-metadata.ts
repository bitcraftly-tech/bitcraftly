import type { Metadata } from 'next';

/** Prevent indexing of error and missing routes. */
export const NOINDEX_ROBOTS: NonNullable<Metadata['robots']> = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function createNoIndexMetadata(overrides: Metadata = {}): Metadata {
  return {
    ...overrides,
    robots: NOINDEX_ROBOTS,
  };
}
