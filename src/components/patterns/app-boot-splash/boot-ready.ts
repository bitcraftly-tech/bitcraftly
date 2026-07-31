/**
 * Shared boot readiness helpers for Bitcraftly + interactive-demo splashes.
 */

export const BOOT_CSS_WAIT_MS = 2500;
export const BOOT_FONT_WAIT_MS = 1200;
export const BOOT_IMAGE_WAIT_MS = 3500;
export const BOOT_TOTAL_MAX_MS = 5000;
export const BOOT_REDUCED_MOTION_MAX_MS = 900;
export const BOOT_FADE_OUT_MS = 340;

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
export async function waitUntilBootReady(): Promise<void> {
  const maxMs = prefersBootReducedMotion() ? BOOT_REDUCED_MOTION_MAX_MS : BOOT_TOTAL_MAX_MS;

  await withBootTimeout(
    (async () => {
      await withBootTimeout(waitForStylesheets(), BOOT_CSS_WAIT_MS);
      await withBootTimeout(waitForFonts(), BOOT_FONT_WAIT_MS);
      await withBootTimeout(waitForImages(), BOOT_IMAGE_WAIT_MS);
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

export { isInteractiveDemoPath } from './boot-path';
