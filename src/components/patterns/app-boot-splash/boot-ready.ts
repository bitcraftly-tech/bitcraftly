/**
 * Shared boot readiness helpers for Bitcraftly + interactive-demo splashes.
 */

export const BOOT_CSS_WAIT_MS = 900;
export const BOOT_FONT_WAIT_MS = 600;
export const BOOT_IMAGE_WAIT_MS = 1200;
/** Hard ceiling — never trap the document behind the splash. */
export const BOOT_TOTAL_MAX_MS = 1400;
export const BOOT_HOME_MAX_MS = 700;
export const BOOT_REDUCED_MOTION_MAX_MS = 450;
export const BOOT_FADE_OUT_MS = 220;
/** DOM failsafe (runs even if React hydration stalls). */
export const BOOT_DOM_FAILSAFE_MS = 1200;

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
  const maxMs = prefersBootReducedMotion()
    ? BOOT_REDUCED_MOTION_MAX_MS
    : fast
      ? BOOT_HOME_MAX_MS
      : BOOT_TOTAL_MAX_MS;

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
}

export function revealBootedDocument(): void {
  const root = document.documentElement;
  root.classList.remove('bc-booting', 'bc-demo-booting');
  root.classList.add('bc-app-ready');
  root.removeAttribute('data-demo-boot');
  root.removeAttribute('data-demo-path');
  root.setAttribute('aria-busy', 'false');
}

/**
 * Inline DOM failsafe — reveals content even if the React splash island never hydrates.
 */
export const APP_BOOT_FAILSAFE_SCRIPT = `
(function () {
  try {
    window.setTimeout(function () {
      var root = document.documentElement;
      if (root.classList.contains('bc-app-ready')) return;
      root.classList.remove('bc-booting', 'bc-demo-booting');
      root.classList.add('bc-app-ready');
      root.setAttribute('aria-busy', 'false');
      var ids = ['bc-boot-splash', 'bc-demo-boot-splash'];
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) el.setAttribute('data-done', 'true');
      }
    }, ${BOOT_DOM_FAILSAFE_MS});
  } catch (_) {}
})();
`.trim();

export { isInteractiveDemoPath } from './boot-path';
