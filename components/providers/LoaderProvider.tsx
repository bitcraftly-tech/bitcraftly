"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import { useTheme } from "@/components/providers/ThemeProvider";
import {
  LOADER_ALWAYS_ON,
  LOADER_ENABLED,
  LOADER_REVEAL,
  LOADER_STORAGE_KEY,
  LOADER_TIMING,
  loaderRevealTotalMs,
} from "@/lib/loader/config";
import { markRouteLoadingActive, markRouteLoadingDone } from "@/lib/loader/navigation";
import { LOADER_MOBILE_MAX_WIDTH_PX, LOADER_SKIP_ON_MOBILE } from "@/lib/loader/mobilePerf";
import type { LoaderTheme } from "@/components/loading/BitcraftlyLoader";

const BitcraftlyLoader = dynamic(() => import("@/components/loading/BitcraftlyLoader"), {
  ssr: false,
});

type LoaderContextValue = {
  showLoader: (opts?: { durationMs?: number }) => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

type InitialPhase = "loading" | "revealing" | "done";

function loaderTheme(pathname: string, resolvedTheme: "light" | "dark"): LoaderTheme {
  if (pathname.startsWith("/portfolio/") || pathname.startsWith("/dayal-builders")) return "light";
  return resolvedTheme;
}

function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${LOADER_MOBILE_MAX_WIDTH_PX}px)`).matches;
}

function shouldSkipInitialLoader(): boolean {
  if (!LOADER_ENABLED) return true;
  const pathname = window.location.pathname;
  if (pathname.startsWith("/portfolio/") || pathname.startsWith("/dayal-builders")) return true;
  if (LOADER_SKIP_ON_MOBILE && isMobileViewport()) return true;
  if (LOADER_ALWAYS_ON) return false;
  try {
    return sessionStorage.getItem(LOADER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markLoaderDone(): void {
  document.documentElement.dataset.loader = "done";
}

function markLoaderRevealing(): void {
  const root = document.documentElement;
  root.classList.remove("bc-loader-active");
  root.dataset.loader = "revealing";
  root.style.setProperty("--bc-loader-exit-ms", `${LOADER_TIMING.exitMs}ms`);
  root.style.setProperty("--bc-reveal-duration-ms", `${LOADER_REVEAL.durationMs}ms`);
}

function markLoaderActive(): void {
  const root = document.documentElement;
  root.classList.add("bc-loader-active");
  delete root.dataset.loader;
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const theme = loaderTheme(pathname, resolvedTheme);

  const [ready, setReady] = useState(false);
  const [initialPhase, setInitialPhase] = useState<InitialPhase>("done");
  const [routeLoading, setRouteLoading] = useState(false);
  const [skipRevealAnimation, setSkipRevealAnimation] = useState(false);
  const bootStarted = useRef(false);
  const routeStartedAt = useRef<number | null>(null);
  const initialPhaseRef = useRef(initialPhase);
  initialPhaseRef.current = initialPhase;

  const finishRouteLoading = useCallback(() => {
    routeStartedAt.current = null;
    setRouteLoading(false);
    markRouteLoadingDone();
  }, []);

  const beginRouteLoading = useCallback(() => {
    if (!LOADER_ENABLED || initialPhaseRef.current !== "done") return;
    if (routeStartedAt.current !== null) return;

    routeStartedAt.current = Date.now();
    setRouteLoading(true);
    markRouteLoadingActive();
  }, []);

  const finishInitial = useCallback(() => {
    if (!LOADER_ALWAYS_ON) {
      try {
        sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.documentElement.classList.remove("bc-loader-active");
      markLoaderDone();
      setInitialPhase("done");
      return;
    }

    markLoaderRevealing();
    setInitialPhase("revealing");

    window.setTimeout(() => {
      markLoaderDone();
      setInitialPhase("done");
    }, loaderRevealTotalMs());
  }, []);

  useLayoutEffect(() => {
    setReady(true);

    if (bootStarted.current) return;
    bootStarted.current = true;

    if (LOADER_ENABLED && LOADER_ALWAYS_ON) {
      try {
        sessionStorage.removeItem(LOADER_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }

    if (!LOADER_ENABLED || shouldSkipInitialLoader()) {
      document.documentElement.classList.remove("bc-loader-active");
      markLoaderDone();
      setSkipRevealAnimation(true);
      setInitialPhase("done");
      return;
    }

    markLoaderActive();
    setInitialPhase("loading");
  }, []);

  useEffect(() => {
    if (!LOADER_ENABLED || initialPhase !== "loading") return;

    const start = Date.now();
    let done = false;

    const complete = () => {
      if (done) return;
      done = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, LOADER_TIMING.initialMinMs - elapsed);
      window.setTimeout(finishInitial, wait);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", complete, { once: true });
    } else {
      complete();
    }

    const fallback = window.setTimeout(complete, LOADER_TIMING.initialMaxMs);
    return () => {
      document.removeEventListener("DOMContentLoaded", complete);
      window.clearTimeout(fallback);
    };
  }, [initialPhase, finishInitial]);

  const showLoader = useCallback((opts?: { durationMs?: number }) => {
    beginRouteLoading();
    window.setTimeout(finishRouteLoading, opts?.durationMs ?? LOADER_TIMING.routeMs);
  }, [beginRouteLoading, finishRouteLoading]);

  const value = useMemo(() => ({ showLoader }), [showLoader]);

  const showOverlay = ready && LOADER_ENABLED && routeLoading && initialPhase === "done";
  const contentReady = !LOADER_ENABLED || initialPhase === "revealing" || initialPhase === "done";

  return (
    <LoaderContext.Provider value={value}>
      {LOADER_ENABLED ? (
        <BitcraftlyLoader show={showOverlay} density="fullscreen" theme={theme} />
      ) : null}
      <div
        className={
          contentReady
            ? `bc-app-root bc-app-root--ready${skipRevealAnimation ? " bc-app-root--instant" : ""}`
            : "bc-app-root"
        }
      >
        {children}
      </div>
    </LoaderContext.Provider>
  );
}

export function useLoader(): LoaderContextValue {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return ctx;
}
