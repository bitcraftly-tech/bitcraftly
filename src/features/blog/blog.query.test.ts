import { describe, expect, it } from 'vitest';
import { isBlogListingIndexable } from './blog.query';

describe('isBlogListingIndexable', () => {
  it('keeps the base /blog hub indexable when no listing params are present', () => {
    expect(isBlogListingIndexable({})).toBe(true);
  });

  it.each([
    { category: 'nextjs' },
    { tag: 'SEO' },
    { q: 'vitals' },
    { page: '2' },
    { page: '1' },
    { q: '' },
  ])('marks parameterized listing state %j as noindex', (params) => {
    expect(isBlogListingIndexable(params)).toBe(false);
  });
});
