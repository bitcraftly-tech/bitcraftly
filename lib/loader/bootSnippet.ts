import {
  LOADER_ALWAYS_ON,
  LOADER_ENABLED,
  LOADER_STORAGE_KEY,
} from "@/lib/loader/config";
import { LOADER_MOBILE_MAX_WIDTH_PX, LOADER_SKIP_ON_MOBILE } from "@/lib/loader/mobilePerf";

/** Inline boot script — hides page until React loader mounts (avoids content flash on first paint). */
export function loaderBootScript(): string {
  if (!LOADER_ENABLED) return "";
  return `(function(){try{var skipMobile=${LOADER_SKIP_ON_MOBILE ? "true" : "false"};var mobile=skipMobile&&window.matchMedia&&window.matchMedia("(max-width: ${LOADER_MOBILE_MAX_WIDTH_PX}px)").matches;if(mobile){var el=document.getElementById("bc-static-loader");if(el)el.remove();document.documentElement.dataset.loader="done";return;}var alwaysOn=${LOADER_ALWAYS_ON ? "true" : "false"};if(!alwaysOn&&sessionStorage.getItem(${JSON.stringify(LOADER_STORAGE_KEY)})==="1"){var stale=document.getElementById("bc-static-loader");if(stale)stale.remove();document.documentElement.dataset.loader="done";return;}document.documentElement.classList.add("bc-loader-active");}catch(e){}})();`;
}
