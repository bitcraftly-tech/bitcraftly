'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import ShowcaseThemeToggle from '@/components/portfolio/ShowcaseThemeToggle';

type ThemeValue = 'light' | 'dark';

type ShowcaseThemeContextValue = {
  showcaseId: string;
  resolvedTheme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
};

const ShowcaseThemeContext = createContext<ShowcaseThemeContextValue | null>(null);

export function useShowcaseTheme() {
  const ctx = useContext(ShowcaseThemeContext);
  if (!ctx) {
    throw new Error('useShowcaseTheme must be used within ShowcaseScopedThemeProvider');
  }
  return ctx;
}

type ShowcaseScopedThemeProviderProps = {
  showcaseId: string;
  className?: string;
  children: ReactNode;
};

function storageKeyFor(id: string) {
  return `theme-showcase-${id}`;
}

export function ShowcaseScopedThemeProvider({
  showcaseId,
  className = '',
  children,
}: ShowcaseScopedThemeProviderProps) {
  const [resolvedTheme, setResolvedTheme] = useState<ThemeValue>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKeyFor(showcaseId));
    setResolvedTheme(stored === 'dark' ? 'dark' : 'light');
    setMounted(true);
  }, [showcaseId]);

  const setTheme = useCallback(
    (theme: ThemeValue) => {
      setResolvedTheme(theme);
      window.localStorage.setItem(storageKeyFor(showcaseId), theme);
    },
    [showcaseId],
  );

  const value = useMemo(
    () => ({ showcaseId, resolvedTheme, setTheme }),
    [showcaseId, resolvedTheme, setTheme],
  );

  return (
    <ShowcaseThemeContext.Provider value={value}>
      <div
        className={`${className} ${mounted && resolvedTheme === 'dark' ? 'dark' : ''}`.trim()}
        suppressHydrationWarning
        data-showcase-theme={mounted ? resolvedTheme : 'light'}
      >
        {children}
        <ShowcaseThemeToggle />
      </div>
    </ShowcaseThemeContext.Provider>
  );
}
