"use client";

import { useEffect } from "react";

function isPortfolioPath(pathname: string): boolean {  return pathname.startsWith("/portfolio/") || pathname.startsWith("/dayal-builders");
}

function runThemeInit(): void {
  try {
    const pathname = window.location.pathname;
    if (isPortfolioPath(pathname)) {
      document.documentElement.classList.remove("dark");
      return;
    }
    const theme = window.localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch {
    /* ignore */
  }
}

/** Theme init after hydration — loader boot is handled by LoaderProvider. */
export default function RootBootEffects() {
  useEffect(() => {
    runThemeInit();
  }, []);

  return null;
}
