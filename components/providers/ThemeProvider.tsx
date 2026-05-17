"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type ThemeValue = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

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

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [resolvedTheme, setResolvedTheme] = useState<ThemeValue>("light");

  useEffect(() => {
    const isPortfolio = window.location.pathname.startsWith("/portfolio/");
    if (isPortfolio) {
      setResolvedTheme("light");
      applyThemeToDom("light");
      return;
    }
    const storedTheme = window.localStorage.getItem("theme");
    const initialTheme: ThemeValue = storedTheme === "dark" ? "dark" : "light";
    setResolvedTheme(initialTheme);
    applyThemeToDom(initialTheme);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedTheme,
      setTheme: (theme: ThemeValue) => {
        setResolvedTheme(theme);
        window.localStorage.setItem("theme", theme);
        applyThemeToDom(theme);
      },
    }),
    [resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
