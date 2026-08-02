/**
 * Canonical site origin for metadata, sitemap, and robots.
 * Prefer NEXT_PUBLIC_SITE_URL; fall back to APP_URL, then production host.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://bitcraftly.com';

  return raw.replace(/\/$/, '');
}

export function getAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
