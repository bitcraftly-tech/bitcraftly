"use client";

import { useEffect, useState } from "react";

const CSS_WAIT_MS = 2500;
const FONT_WAIT_MS = 1200;
const IMAGE_WAIT_MS = 3500;
const TOTAL_MAX_MS = 5000;
const REDUCED_MOTION_MAX_MS = 900;
const FADE_OUT_MS = 340;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | void> {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

function waitForStylesheets(): Promise<void> {
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  );

  // Next may inject <style> tags; if sheets already exist, treat CSS as ready.
  if (links.length === 0) {
    if (document.styleSheets.length > 0) {
      return new Promise((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
    }
    return Promise.resolve();
  }

  return Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve) => {
          try {
            if (link.sheet) {
              resolve();
              return;
            }
          } catch {
            /* cross-origin sheet access can throw */
          }

          const done = () => resolve();
          link.addEventListener("load", done, { once: true });
          link.addEventListener("error", done, { once: true });

          // If the resource finished before listeners attached
          if (link.rel === "stylesheet") {
            window.requestAnimationFrame(() => {
              try {
                if (link.sheet) resolve();
              } catch {
                /* keep waiting for load/error */
              }
            });
          }
        }),
    ),
  ).then(() => undefined);
}

function waitForFonts(): Promise<void> {
  if (!document.fonts?.ready) {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

function waitForImages(): Promise<void> {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Waits for CSS (and then fonts/images) before revealing the app.
 * Fail-open via timeouts so users are never stuck behind the splash.
 */
async function waitUntilBootReady(): Promise<void> {
  const maxMs = prefersReducedMotion() ? REDUCED_MOTION_MAX_MS : TOTAL_MAX_MS;

  await withTimeout(
    (async () => {
      await withTimeout(waitForStylesheets(), CSS_WAIT_MS);
      await withTimeout(waitForFonts(), FONT_WAIT_MS);
      await withTimeout(waitForImages(), IMAGE_WAIT_MS);
    })(),
    maxMs,
  );
}

function revealDocument(): void {
  const root = document.documentElement;
  root.classList.remove("bc-booting");
  root.classList.add("bc-app-ready");
  root.setAttribute("aria-busy", "false");
}

/**
 * Full-page boot splash — visible until CSS is applied and images have had
 * a chance to load. Hard navigations only (soft route changes skip this).
 */
export function AppBootSplash() {
  const [phase, setPhase] = useState<"booting" | "leaving" | "gone">("booting");

  useEffect(() => {
    let cancelled = false;
    let leaveTimer = 0;

    void (async () => {
      await waitUntilBootReady();
      if (cancelled) return;

      revealDocument();
      setPhase("leaving");
      leaveTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("gone");
      }, FADE_OUT_MS);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(leaveTimer);
    };
  }, []);

  if (phase === "gone") {
    return null;
  }

  return (
    <div
      id="bc-boot-splash"
      role="status"
      aria-live="polite"
      aria-busy={phase === "booting"}
      aria-label="Loading Bitcraftly"
      data-done={phase === "leaving" ? "true" : undefined}
    >
      <div className="bc-boot-splash__inner">
        <div className="bc-boot-splash__logo-wrap" aria-hidden>
          <span className="bc-boot-splash__ring bc-boot-splash__ring--delayed" />
          <span className="bc-boot-splash__ring" />
          <span className="bc-boot-splash__logo-glow" />
          {/* Native img — available before Next/Image hydrates; matches header brand icon. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bc-boot-splash__logo"
            src="/brand/icon.webp"
            alt=""
            width={28}
            height={28}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
