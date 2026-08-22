/**
 * Shared boot readiness helpers for Bitcraftly + interactive-demo splashes.
 */

/** Survives React remounts / Fast Refresh within the same tab. */
const BOOT_READY_SESSION_KEY = 'bc-boot-ready';

/** In-memory flag — survives client remounts until full document reload. */
let bootRevealComplete = false;

export const BOOT_CSS_WAIT_MS = 900;
export const BOOT_FONT_WAIT_MS = 600;
export const BOOT_IMAGE_WAIT_MS = 1200;
/** Hard ceiling — never trap the document behind the splash. */
export const BOOT_TOTAL_MAX_MS = 1400;
export const BOOT_HOME_MAX_MS = 900;
export const BOOT_REDUCED_MOTION_MAX_MS = 450;
export const BOOT_FADE_OUT_MS = 220;
/** Keep splash visible long enough for the iOS ring/logo animation to read. */
export const BOOT_MIN_VISIBLE_MS = 750;
/** DOM failsafe (runs even if React hydration stalls). */
export const BOOT_DOM_FAILSAFE_MS = 1600;

export function withBootTimeout<T>(promise: Promise<T>, ms: number): Promise<T | void> {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

function waitForStylesheets(): Promise<void> {
  const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));

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
          link.addEventListener('load', done, { once: true });
          link.addEventListener('error', done, { once: true });

          if (link.rel === 'stylesheet') {
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
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

export function prefersBootReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Waits for CSS/fonts/images with fail-open timeouts. */
export async function waitUntilBootReady(options?: {
  /** Homepage: show brand splash briefly without waiting on heavy ATF images. */
  readonly fast?: boolean;
}): Promise<void> {
  const fast = options?.fast === true;
  const reduced = prefersBootReducedMotion();
  const maxMs = reduced ? BOOT_REDUCED_MOTION_MAX_MS : fast ? BOOT_HOME_MAX_MS : BOOT_TOTAL_MAX_MS;
  const startedAt = performance.now();

  await withBootTimeout(
    (async () => {
      await withBootTimeout(waitForStylesheets(), BOOT_CSS_WAIT_MS);
      await withBootTimeout(waitForFonts(), BOOT_FONT_WAIT_MS);
      if (!fast) {
        await withBootTimeout(waitForImages(), BOOT_IMAGE_WAIT_MS);
      }
    })(),
    maxMs,
  );

  /* Pad splash only off-homepage so LCP on `/` is not blocked by a minimum dwell. */
  if (!reduced && !fast) {
    const remaining = BOOT_MIN_VISIBLE_MS - (performance.now() - startedAt);
    if (remaining > 0) {
      await withBootTimeout(Promise.resolve(), remaining);
    }
  }
}

function readBootReadySession(): boolean {
  try {
    return window.sessionStorage.getItem(BOOT_READY_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function writeBootReadySession(): void {
  try {
    window.sessionStorage.setItem(BOOT_READY_SESSION_KEY, '1');
  } catch {
    /* private mode / blocked storage */
  }
}

/** True after the first successful reveal in this tab (or sticky session). */
export function hasBootRevealCompleted(): boolean {
  if (bootRevealComplete) return true;
  if (
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('bc-app-ready')
  ) {
    bootRevealComplete = true;
    return true;
  }
  if (typeof window !== 'undefined' && readBootReadySession()) {
    bootRevealComplete = true;
    return true;
  }
  return false;
}

/** Apply ready classes — safe to call repeatedly (also used when React wipes html.className). */
export function applyBootReadyClasses(): void {
  const root = document.documentElement;
  root.classList.remove('bc-booting', 'bc-demo-booting');
  root.classList.add('bc-app-ready');
  root.removeAttribute('data-demo-boot');
  root.removeAttribute('data-demo-path');
  root.setAttribute('aria-busy', 'false');
}

export function revealBootedDocument(): void {
  bootRevealComplete = true;
  writeBootReadySession();
  applyBootReadyClasses();
}

/**
 * Re-apply ready classes if React / RSC re-renders `<html className>` and wipes
 * `bc-app-ready` (looks like a full page reload — boot splash flashes again).
 */
export function persistBootReadyIfNeeded(): void {
  if (!hasBootRevealCompleted()) return;
  applyBootReadyClasses();
}

/**
 * Inline DOM failsafe — reveals content even if the React splash island never hydrates.
 * Also installs a MutationObserver so React re-applying `<html className>` cannot wipe
 * `bc-app-ready` (that flash looks like a full page reload).
 * Do NOT mutate splash `data-done` here: that attribute is owned by AppBootSplash and
 * changing it before hydrate causes a mismatch that can stall client islands (carousel).
 */
export const APP_BOOT_FAILSAFE_SCRIPT = `
(function () {
  try {
    var KEY = '${BOOT_READY_SESSION_KEY}';
    var root = document.documentElement;
    var applying = false;

    function shouldPersist() {
      if (root.classList.contains('bc-app-ready')) return true;
      try { return window.sessionStorage.getItem(KEY) === '1'; } catch (_) { return false; }
    }

    function persistReady() {
      if (applying || !shouldPersist()) return;
      if (
        root.classList.contains('bc-app-ready') &&
        !root.classList.contains('bc-booting') &&
        !root.classList.contains('bc-demo-booting')
      ) {
        return;
      }
      applying = true;
      try {
        root.classList.remove('bc-booting', 'bc-demo-booting');
        root.classList.add('bc-app-ready');
        root.removeAttribute('data-demo-boot');
        root.removeAttribute('data-demo-path');
        root.setAttribute('aria-busy', 'false');
        try { window.sessionStorage.setItem(KEY, '1'); } catch (_) {}
      } finally {
        applying = false;
      }
    }

    persistReady();
    if (!root.__bcBootPersistObs) {
      root.__bcBootPersistObs = new MutationObserver(persistReady);
      root.__bcBootPersistObs.observe(root, { attributes: true, attributeFilter: ['class'] });
    }

    if (root.classList.contains('bc-app-ready')) return;

    window.setTimeout(function () {
      if (root.classList.contains('bc-app-ready')) return;
      root.classList.remove('bc-booting', 'bc-demo-booting');
      root.classList.add('bc-app-ready');
      root.setAttribute('aria-busy', 'false');
      try { window.sessionStorage.setItem(KEY, '1'); } catch (_) {}
    }, ${BOOT_DOM_FAILSAFE_MS});
  } catch (_) {}
})();
`.trim();

export { isInteractiveDemoPath } from './boot-path';
