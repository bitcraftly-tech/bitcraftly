import { AppBootSplash } from './AppBootSplash';
import { APP_BOOT_CRITICAL_CSS } from './boot-critical';
import { DemoBootSplash } from './DemoBootSplash';

export type BootSplashMode = 'brand' | 'demo';

/**
 * Root boot gate: inline CSS + splash UI.
 * Boot mode (brand vs demo) is set server-side via middleware + root layout —
 * no client script tag, which was breaking React.lazy hydration in the browser.
 */
export function AppBootShell({ mode, pathname = '' }: { mode: BootSplashMode; pathname?: string }) {
  return (
    <>
      <style
        id="bc-boot-critical-css"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_CRITICAL_CSS }}
      />
      <noscript>
        <style>{`html.bc-booting body > *,html.bc-demo-booting body > *{opacity:1!important;visibility:visible!important;pointer-events:auto!important}#bc-boot-splash,#bc-demo-boot-splash{display:none!important}`}</style>
      </noscript>
      {mode === 'demo' ? <DemoBootSplash active pathname={pathname} /> : <AppBootSplash />}
    </>
  );
}
