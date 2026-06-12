/** Runtime environment — production vs staging/preview */

const STAGING_HOSTS = new Set(["staging.bitcraftly.com", "www.staging.bitcraftly.com"]);

export function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://bitcraftly.com";
}

export function isStagingHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0].toLowerCase();
  return STAGING_HOSTS.has(hostname) || hostname.startsWith("staging.");
}

export const IS_STAGING =
  process.env.NEXT_PUBLIC_APP_ENV === "staging" ||
  process.env.VERCEL_ENV === "preview" ||
  isStagingHost(process.env.VERCEL_URL);

export const SITE_URL = resolveSiteUrl();
export const PRODUCTION_URL = "https://bitcraftly.com";
