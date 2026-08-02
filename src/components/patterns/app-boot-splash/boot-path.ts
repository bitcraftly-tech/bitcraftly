/** Pure path helpers — safe for server + client. */

export function isInteractiveDemoPath(pathname: string): boolean {
  if (pathname.startsWith('/interactive-demos/')) return true;
  if (!pathname.startsWith('/portfolio/')) return false;
  // `/portfolio` alone redirects to /work — not a demo shell
  return pathname.length > '/portfolio/'.length;
}
