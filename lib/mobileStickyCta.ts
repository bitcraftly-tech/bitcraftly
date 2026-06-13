/** Paths that show the mobile sticky CTA bar (must match MobileStickyCta). */
export const MOBILE_STICKY_CTA_PATHS = ["/", "/contact", "/portfolio"] as const;

export function hasMobileStickyCta(pathname: string | null): boolean {
  if (!pathname) return false;
  return (MOBILE_STICKY_CTA_PATHS as readonly string[]).includes(pathname);
}

/** Footer clearance above fixed sticky bar + iOS home indicator (inside footer, not below it). */
export const FOOTER_STICKY_CLEARANCE_CLASS =
  "max-md:pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))]";
