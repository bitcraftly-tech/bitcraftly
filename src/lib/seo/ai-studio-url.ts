/**
 * Public URL for the Bitcraftly AI Studio app (separate deploy).
 * Local default assumes Studio web on port 3010 to avoid clashing with platform :3000.
 */
export function getAiStudioUrl(): string {
  const configured = process.env.NEXT_PUBLIC_AI_STUDIO_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, '');
  }
  return 'https://studio.bitcraftly.com';
}

export function getAiStudioPath(path = '/'): string {
  const base = getAiStudioUrl();
  if (!path || path === '/') {
    return base;
  }
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
