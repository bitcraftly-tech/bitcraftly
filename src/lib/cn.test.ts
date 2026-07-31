import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('filters falsy values', () => {
    expect(cn('a', false, null, undefined, 'c')).toBe('a c');
  });

  it('returns an empty string when nothing is provided', () => {
    expect(cn()).toBe('');
  });
});
