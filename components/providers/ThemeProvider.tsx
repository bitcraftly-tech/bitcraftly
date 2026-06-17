"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";
import { isPreferencesConsented } from "@/lib/cookieConsent";

type ThemeValue = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STATIC_LIGHT: ThemeContextValue = {
  resolvedTheme: "light",
  setTheme: () => {},
};

type ThemeProviderProps = {
  children: ReactNode;
};

function applyThemeToDom(theme: ThemeValue) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function ThemeProviderInner({ children }: ThemeProviderProps) {
  const { ready: consentReady, consent } = useCookieConsent();
  const [resolvedTheme, setResolvedTheme] = useState<ThemeValue>("light");

  useEffect(() => {
    if (!consentReady) return;

    const path = window.location.pathname;
    const isPortfolio = path.startsWith("/portfolio/") || path.startsWith("/dayal-builders");
    if (isPortfolio) {
      setResolvedTheme("light");
      applyThemeToDom("light");
      return;
    }

    const storedTheme = isPreferencesConsented(consent) ? window.localStorage.getItem("theme") : null;
    const initialTheme: ThemeValue = storedTheme === "dark" ? "dark" : "light";
    setResolvedTheme(initialTheme);
    applyThemeToDom(initialTheme);
  }, [consentReady, consent]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedTheme,
      setTheme: (theme: ThemeValue) => {
        setResolvedTheme(theme);
        applyThemeToDom(theme);
        if (isPreferencesConsented(consent)) {
          window.localStorage.setItem("theme", theme);
        }
      },
    }),
    [resolvedTheme, consent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(
        () => {
          if (!cancelled) setHydrated(true);
        },
        { timeout: 3200 },
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(() => {
      if (!cancelled) setHydrated(true);
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!hydrated) {
    return <ThemeContext.Provider value={STATIC_LIGHT}>{children}</ThemeContext.Provider>;
  }

  return <ThemeProviderInner>{children}</ThemeProviderInner>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
