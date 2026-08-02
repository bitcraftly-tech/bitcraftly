import { AppBootSplash } from './AppBootSplash';
import { APP_BOOT_CRITICAL_CSS } from './boot-critical';
import { APP_BOOT_FAILSAFE_SCRIPT } from './boot-ready';
import { DemoBootSplash } from './DemoBootSplash';

export type BootSplashMode = 'brand' | 'demo';

/**
 * Root boot gate: inline CSS + splash UI.
 * Boot mode (brand vs demo) is set server-side via middleware + root layout.
 * Failsafe script forces reveal if hydration stalls — never traps the page.
 */
export function AppBootShell({ mode, pathname = '' }: { mode: BootSplashMode; pathname?: string }) {
  return (
    <>
      <style
        id="bc-boot-critical-css"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_CRITICAL_CSS }}
      />
      <script
        id="bc-boot-failsafe"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_FAILSAFE_SCRIPT }}
      />
      <noscript>
        <style>{`#bc-boot-splash,#bc-demo-boot-splash{display:none!important}`}</style>
      </noscript>
      {mode === 'demo' ? <DemoBootSplash active pathname={pathname} /> : <AppBootSplash />}
    </>
  );
}
