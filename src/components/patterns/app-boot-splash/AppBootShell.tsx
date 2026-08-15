import { AppBootSplash } from './AppBootSplash';
import { BootReadyPersistence } from './BootReadyPersistence';
import { APP_BOOT_CRITICAL_CSS } from './boot-critical';
import { APP_BOOT_FAILSAFE_SCRIPT } from './boot-ready';
import { DemoBootSplash } from './DemoBootSplash';

export type BootSplashMode = 'brand' | 'demo';

function buildBootInitScript(mode: BootSplashMode, pathname: string): string {
  const isDemo = mode === 'demo';
  const safePath = JSON.stringify(pathname || '');
  return `
(function () {
  try {
    var KEY = 'bc-boot-ready';
    var root = document.documentElement;
    var already = root.classList.contains('bc-app-ready');
    try { already = already || window.sessionStorage.getItem(KEY) === '1'; } catch (_) {}
    if (already) {
      root.classList.remove('bc-booting', 'bc-demo-booting');
      root.classList.add('bc-app-ready');
      root.removeAttribute('data-demo-boot');
      root.removeAttribute('data-demo-path');
      root.setAttribute('aria-busy', 'false');
      return;
    }
    var path = ${safePath} || location.pathname || '';
    var isDemo = ${isDemo ? 'true' : 'false'};
    root.classList.remove('bc-booting', 'bc-demo-booting');
    if (isDemo) {
      root.classList.add('bc-demo-booting');
      root.setAttribute('data-demo-boot', '1');
      root.setAttribute('data-demo-path', path);
    } else {
      root.classList.add('bc-booting');
      root.removeAttribute('data-demo-boot');
      root.removeAttribute('data-demo-path');
    }
    root.setAttribute('aria-busy', 'true');
  } catch (_) {}
})();
`.trim();
}

/**
 * Root boot gate: inline CSS + splash UI.
 * Boot mode (brand vs demo) is set server-side via middleware + root layout.
 * Failsafe script forces reveal if hydration stalls — never traps the page.
 *
 * Boot scripts use native inline `<script>` (not next/script) so they run during
 * HTML parse without going through next/script's React.lazy client-reference path,
 * which resolves to an invalid element type and crashes the root layout.
 *
 * BootReadyPersistence stops React from wiping `bc-app-ready` when `<html
 * className>` is re-applied from the server (looks like a reload loop).
 */
export function AppBootShell({ mode, pathname = '' }: { mode: BootSplashMode; pathname?: string }) {
  return (
    <>
      <style
        id="bc-boot-critical-css"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_CRITICAL_CSS }}
      />
      <script
        id="bc-boot-init"
        dangerouslySetInnerHTML={{ __html: buildBootInitScript(mode, pathname) }}
      />
      <script
        id="bc-boot-failsafe"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_FAILSAFE_SCRIPT }}
      />
      <noscript>
        <style>{`#bc-boot-splash,#bc-demo-boot-splash{display:none!important}`}</style>
      </noscript>
      <BootReadyPersistence />
      {mode === 'demo' ? <DemoBootSplash active pathname={pathname} /> : <AppBootSplash />}
    </>
  );
}
