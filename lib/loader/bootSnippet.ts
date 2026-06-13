import {
  LOADER_ALWAYS_ON,
  LOADER_ENABLED,
  LOADER_STORAGE_KEY,
} from "@/lib/loader/config";

/** Inline boot script — hides page until React loader mounts (avoids content flash on first paint). */
export function loaderBootScript(): string {
  if (!LOADER_ENABLED) return "";
  return `(function(){try{var alwaysOn=${LOADER_ALWAYS_ON ? "true" : "false"};if(!alwaysOn&&sessionStorage.getItem(${JSON.stringify(LOADER_STORAGE_KEY)})==="1"){var stale=document.getElementById("bc-static-loader");if(stale)stale.remove();document.documentElement.dataset.loader="done";return;}document.documentElement.classList.add("bc-loader-active");}catch(e){}})();`;
}
