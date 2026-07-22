import { headers } from "next/headers";

const MOBILE_UA_PATTERN =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile Safari|Windows Phone/i;

const TABLET_UA_PATTERN = /iPad|Tablet|PlayBook|Silk/i;

const MOBILE_VIEWPORT_MAX_PX = 767;

/**
 * Pure UA / viewport-width check for tests and server detection.
 * Mobile phones and small viewports skip heavy hero artwork on the server.
 */
export function isMobileUserAgentString(
  userAgent: string,
  viewportWidthHeader?: string | null,
): boolean {
  const viewportWidth = viewportWidthHeader
    ? Number.parseInt(viewportWidthHeader, 10)
    : Number.NaN;

  if (
    !Number.isNaN(viewportWidth) &&
    viewportWidth <= MOBILE_VIEWPORT_MAX_PX
  ) {
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
 * Server-only mobile detection for responsive hero rendering.
 * Avoids client JS while preventing hero illustration HTML from shipping on phones.
 */
export async function isMobileUserAgent(): Promise<boolean> {
  const headerStore = await headers();

  return isMobileUserAgentString(
    headerStore.get("user-agent") ?? "",
    headerStore.get("sec-ch-viewport-width"),
  );
}
