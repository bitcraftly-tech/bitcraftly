"use client";

import { useEffect } from "react";

import { LOADER_ALWAYS_ON, LOADER_ENABLED, LOADER_STORAGE_KEY } from "@/lib/loader/config";
import { LOADER_MOBILE_MAX_WIDTH_PX, LOADER_SKIP_ON_MOBILE } from "@/lib/loader/mobilePerf";

function isPortfolioPath(pathname: string): boolean {
  return pathname.startsWith("/portfolio/") || pathname.startsWith("/dayal-builders");
}

function hideStaticLoader(): void {
  document.documentElement.dataset.loader = "done";
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

function runLoaderBoot(): void {
  if (!LOADER_ENABLED) {
    hideStaticLoader();
    return;
  }

  try {
    const pathname = window.location.pathname;

    if (isPortfolioPath(pathname)) {
      hideStaticLoader();
      return;
    }

    const skipMobile =
      LOADER_SKIP_ON_MOBILE &&
      window.matchMedia(`(max-width: ${LOADER_MOBILE_MAX_WIDTH_PX}px)`).matches;

    if (skipMobile) {
      hideStaticLoader();
      return;
    }

    if (!LOADER_ALWAYS_ON && window.sessionStorage.getItem(LOADER_STORAGE_KEY) === "1") {
      hideStaticLoader();
      return;
    }

    document.documentElement.classList.add("bc-loader-active");
  } catch {
    /* ignore */
  }
}

/** Theme + loader boot after hydration — never remove React-managed DOM nodes. */
export default function RootBootEffects() {
  useEffect(() => {
    runThemeInit();
    runLoaderBoot();
  }, []);

  return null;
}
