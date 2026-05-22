"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import BitcraftlyLoader, { type LoaderTheme } from "@/components/loading/BitcraftlyLoader";
import { useTheme } from "@/components/providers/ThemeProvider";
import { LOADER_ALWAYS_ON, LOADER_ENABLED, LOADER_STORAGE_KEY, LOADER_TIMING } from "@/lib/loader/config";

type LoaderContextValue = {
  showLoader: (opts?: { durationMs?: number }) => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

type InitialPhase = "idle" | "loading" | "exiting" | "done";

function loaderTheme(pathname: string, resolvedTheme: "light" | "dark"): LoaderTheme {
  if (pathname.startsWith("/portfolio/")) return "light";
  return resolvedTheme;
}

function shouldSkipInitialLoader(): boolean {
  if (!LOADER_ENABLED) return true;
  if (LOADER_ALWAYS_ON) return false;
  try {
    return sessionStorage.getItem(LOADER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function initialLoaderPhase(): InitialPhase {
  return LOADER_ENABLED && !shouldSkipInitialLoader() ? "loading" : "done";
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const theme = loaderTheme(pathname, resolvedTheme);

  const [ready, setReady] = useState(false);
  const [initialPhase, setInitialPhase] = useState<InitialPhase>(initialLoaderPhase);
  const [routeLoading, setRouteLoading] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const prevPath = useRef<string | null>(null);
  const isFirstPathEffect = useRef(true);

  const finishInitial = useCallback(() => {
    if (!LOADER_ENABLED) {
      setInitialPhase("done");
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!LOADER_ALWAYS_ON) {
      try {
        sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    if (reducedMotion) {
      setInitialPhase("done");
      return;
    }
    setInitialPhase("exiting");
  }, []);

  useEffect(() => {
    setReady(true);
    if (!LOADER_ENABLED || shouldSkipInitialLoader()) {
      setInitialPhase("done");
      return;
    }

    const start = Date.now();
    let done = false;

    const complete = () => {
      if (done) return;
      done = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, LOADER_TIMING.initialMinMs - elapsed);
      window.setTimeout(finishInitial, wait);
    };

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    const fallback = window.setTimeout(complete, LOADER_TIMING.initialMaxMs);
    return () => {
      window.removeEventListener("load", complete);
      window.clearTimeout(fallback);
    };
  }, [finishInitial]);

  useEffect(() => {
    if (!LOADER_ENABLED || !ready || initialPhase !== "done") return;

    if (isFirstPathEffect.current) {
      isFirstPathEffect.current = false;
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setRouteLoading(true);
    const t = window.setTimeout(() => setRouteLoading(false), LOADER_TIMING.routeMs);
    return () => window.clearTimeout(t);
  }, [pathname, ready, initialPhase]);

  const showLoader = useCallback((opts?: { durationMs?: number }) => {
    setManualLoading(true);
    window.setTimeout(() => setManualLoading(false), opts?.durationMs ?? LOADER_TIMING.routeMs);
  }, []);

  const value = useMemo(() => ({ showLoader }), [showLoader]);

  const showInitial = LOADER_ENABLED && (initialPhase === "loading" || initialPhase === "exiting");
  const showRoute = LOADER_ENABLED && routeLoading && initialPhase === "done" && !manualLoading;
  const showManual = LOADER_ENABLED && manualLoading && initialPhase === "done";

  return (
    <LoaderContext.Provider value={value}>
      {LOADER_ENABLED ? (
        <>
          <BitcraftlyLoader
            show={showInitial}
            density="fullscreen"
            theme={theme}
            onExitComplete={() => {
              if (initialPhase === "exiting") setInitialPhase("done");
            }}
          />
          <BitcraftlyLoader show={showRoute} density="compact" theme={theme} />
          <BitcraftlyLoader show={showManual} density="compact" theme={theme} />
        </>
      ) : null}
      {children}
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
