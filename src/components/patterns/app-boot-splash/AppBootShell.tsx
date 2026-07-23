import Script from "next/script";
import { AppBootSplash } from "./AppBootSplash";
import {
  APP_BOOT_CRITICAL_CSS,
  APP_BOOT_INIT_SCRIPT,
} from "./boot-critical";

/**
 * Root boot gate: inline CSS + before-paint init script + splash UI.
 * Content stays hidden until CSS is ready; splash waits for images (with timeout).
 */
export function AppBootShell() {
  return (
    <>
      <style
        id="bc-boot-critical-css"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_CRITICAL_CSS }}
      />
      <Script
        id="bc-boot-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: APP_BOOT_INIT_SCRIPT }}
      />
      <noscript>
        <style>{`html.bc-booting body > *{opacity:1!important;visibility:visible!important;pointer-events:auto!important}#bc-boot-splash{display:none!important}`}</style>
      </noscript>
      <AppBootSplash />
    </>
  );
}
