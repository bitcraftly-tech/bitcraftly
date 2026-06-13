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
  if (pathname.startsWith("/portfolio/") || pathname.startsWith("/dayal-builders")) return "light";
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
  if (!LOADER_ENABLED) return "done";
  return "loading";
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

    if (LOADER_ENABLED && LOADER_ALWAYS_ON) {
      try {
        sessionStorage.removeItem(LOADER_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }

    if (!LOADER_ENABLED || shouldSkipInitialLoader()) {
      setInitialPhase("done");
      return;
    }

    setInitialPhase("loading");
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
  }, [finishInitial]);

  /** Fallback if Framer exit callback never fires */
  useEffect(() => {
    if (initialPhase !== "exiting") return;
    const t = window.setTimeout(() => setInitialPhase("done"), LOADER_TIMING.exitMs + 200);
    return () => window.clearTimeout(t);
  }, [initialPhase]);

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

  /** Only visible while loading; exiting unmounts loader so fade-out + onExitComplete run */
  const showInitial = LOADER_ENABLED && initialPhase === "loading";
  const showRoute = LOADER_ENABLED && routeLoading && initialPhase === "done" && !manualLoading;
  const showManual = LOADER_ENABLED && manualLoading && initialPhase === "done";
  const showOverlay = showInitial || showRoute || showManual;
  const contentReady = !LOADER_ENABLED || initialPhase === "done";

  useEffect(() => {
    const root = document.documentElement;
    if (LOADER_ENABLED && initialPhase !== "done") {
      root.classList.add("bc-loader-active");
      delete root.dataset.loader;
    } else {
      root.classList.remove("bc-loader-active");
      root.dataset.loader = "done";
    }
    return () => root.classList.remove("bc-loader-active");
  }, [initialPhase]);

  /** Hand off first paint shell to the same React aura loader used on route clicks */
  useEffect(() => {
    if (!ready || !showOverlay) return;
    const staticLoader = document.getElementById("bc-static-loader");
    if (staticLoader) staticLoader.style.display = "none";
  }, [ready, showOverlay]);

  return (
    <LoaderContext.Provider value={value}>
      {LOADER_ENABLED ? (
        <BitcraftlyLoader
          show={showOverlay}
          density="fullscreen"
          theme={theme}
          onExitComplete={() => {
            setInitialPhase((phase) => (phase === "exiting" ? "done" : phase));
          }}
        />
      ) : null}
      <div className={contentReady ? "bc-app-root bc-app-root--ready" : "bc-app-root"}>{children}</div>
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
