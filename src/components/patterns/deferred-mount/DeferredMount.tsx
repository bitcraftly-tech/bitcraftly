"use client";

import { useEffect, useState, type ReactNode } from "react";

interface DeferredMountProps {
  children: ReactNode;
  /** Delay after window load / idle before mounting (ms). */
  delayMs?: number;
  /** Optional fallback while deferred (default: nothing). */
  fallback?: ReactNode;
}

/**
 * Mounts children after the browser is idle (or after load + delay).
 * Use for non-critical client chrome that should not compete with LCP/TBT.
 */
export function DeferredMount({
  children,
  delayMs = 1200,
  fallback = null,
}: DeferredMountProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const activate = () => {
      if (cancelled) return;
      timeoutId = window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, delayMs);
    };

    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => activate(), {
          timeout: 2500,
        });
      } else {
        activate();
      }
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("load", start);
    };
  }, [delayMs]);

  if (!ready) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
