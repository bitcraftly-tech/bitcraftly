const isProduction = process.env.NODE_ENV === 'production';

/**
 * Production security headers for all routes.
 * CSP allows Next.js inline requirements while blocking framing and object embeds.
 */
export function buildSecurityHeaders(): ReadonlyArray<{
  key: string;
  value: string;
}> {
  const sentryConnectSrc = process.env.SENTRY_DSN ? ' https://*.ingest.sentry.io' : '';

  const contentSecurityPolicy = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    // Portfolio showcases embed Google Maps + YouTube demos
    "frame-src 'self' https://maps.google.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' https:${sentryConnectSrc}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    ...(isProduction ? ['upgrade-insecure-requests'] : []),
  ].join('; ');

  return [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains; preload',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Content-Security-Policy',
      value: contentSecurityPolicy,
    },
    {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin-allow-popups',
    },
    {
      key: 'Cross-Origin-Resource-Policy',
      value: 'same-site',
    },
    {
      key: 'X-Permitted-Cross-Domain-Policies',
      value: 'none',
    },
  ];
}
