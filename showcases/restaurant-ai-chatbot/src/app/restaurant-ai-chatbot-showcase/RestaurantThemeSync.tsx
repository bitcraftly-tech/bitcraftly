'use client';

import { useEffect } from 'react';

import { useShowcaseTheme } from '@/components/providers/ShowcaseScopedThemeProvider';

/**
 * Mirrors the scoped showcase theme onto <html> so the pre-paint boot script and
 * the React state stay in sync (no light flash when reloading in dark mode).
 */
export default function RestaurantThemeSync() {
  const { resolvedTheme } = useShowcaseTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.raTheme = resolvedTheme;

    return () => {
      delete root.dataset.raTheme;
    };
  }, [resolvedTheme]);

  return null;
}
