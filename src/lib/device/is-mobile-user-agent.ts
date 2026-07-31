import { headers } from 'next/headers';

const MOBILE_UA_PATTERN =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile Safari|Windows Phone/i;

const TABLET_UA_PATTERN = /iPad|Tablet|PlayBook|Silk/i;

/** Matches Tailwind `lg` — phones + tablets hide right-side hero artwork. */
const COMPACT_HERO_VIEWPORT_MAX_PX = 1023;

/**
 * Pure UA / viewport-width check for tests and server detection.
 * Phones, tablets, and compact viewports skip heavy hero artwork on the server.
 */
export function isMobileUserAgentString(
  userAgent: string,
  viewportWidthHeader?: string | null,
): boolean {
  const viewportWidth = viewportWidthHeader ? Number.parseInt(viewportWidthHeader, 10) : Number.NaN;

  if (!Number.isNaN(viewportWidth) && viewportWidth <= COMPACT_HERO_VIEWPORT_MAX_PX) {
    return true;
  }

  if (MOBILE_UA_PATTERN.test(userAgent)) {
    return true;
  }

  if (TABLET_UA_PATTERN.test(userAgent)) {
    return true;
  }

  return false;
}

/**
 * Server-only compact-device detection for responsive hero rendering.
 * Avoids client JS while preventing hero illustration HTML from shipping on
 * phones and tablets (viewport ≤1023px or mobile/tablet UA).
 */
export async function isMobileUserAgent(): Promise<boolean> {
  const headerStore = await headers();

  return isMobileUserAgentString(
    headerStore.get('user-agent') ?? '',
    headerStore.get('sec-ch-viewport-width'),
  );
}
