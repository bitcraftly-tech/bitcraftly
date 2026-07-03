/** True when an anchor click will navigate to a different in-app URL. */
export function isInternalRouteNavigation(anchor: HTMLAnchorElement): boolean {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;

  const current = `${window.location.pathname}${window.location.search}`;
  const next = `${url.pathname}${url.search}`;
  return current !== next;
}

export function markRouteLoadingActive(): void {
  document.documentElement.classList.add("bc-route-loading");
}

export function markRouteLoadingDone(): void {
  document.documentElement.classList.remove("bc-route-loading");
}
