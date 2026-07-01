/** Paths that show the mobile sticky CTA bar (must match MobileStickyCta). */
export const MOBILE_STICKY_CTA_PATHS = ["/", "/contact", "/portfolio"] as const;

export function hasMobileStickyCta(pathname: string | null): boolean {
  if (!pathname) return false;
  return (MOBILE_STICKY_CTA_PATHS as readonly string[]).includes(pathname);
}
