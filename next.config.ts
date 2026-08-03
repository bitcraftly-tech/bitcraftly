import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import { buildSecurityHeaders } from './src/lib/security/security-headers';

const projectRoot = process.cwd();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /**
   * Enable React Strict Mode
   * Helps detect potential problems during development.
   */
  reactStrictMode: true,

  /**
   * Allow LAN / loopback hosts to load Next.js dig assets (HMR + client chunks).
   * Without this, phone QA via http://192.168.x.x:3000 gets SSR HTML but no
   * React hydration — hamburger / carousels appear frozen.
   * Hostnames only (no CIDR). Restart `next dig` after changing this list.
   * Optional: ALLOWED_DEV_ORIGINS=192.168.1.10,10.0.0.5
   */
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '192.168.29.173',
    ...(process.env.ALLOWED_DEV_ORIGINS?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []),
  ],

  /**
   * Enable gzip/brotli compression.
   */
  compress: true,

  /**
   * Turbopack Configuration
   * Prevents watching the wrong parent workspace.
   */
  turbopack: {
    root: projectRoot,
  },

  /**
   * Restrict output tracing to this application.
   */
  outputFileTracingRoot: projectRoot,

  /**
   * Prefer modern JS output — drop legacy polyfills for evergreen browsers.
   */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  /**
   * Image Optimization
   */
  images: {
    formats: ['image/avif', 'image/webp'],

    /** Explicit list — Logo (80) and Hero (55) use non-default qualities. */
    qualities: [55, 75, 80],

    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year

    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bitcraftly.com',
        pathname: '/products/**',
      },
      {
        protocol: 'https',
        hostname: 'bitcraftly.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'bitcraftly.com',
        pathname: '/brand/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },

  /**
   * Hide framework fingerprint in response headers.
   */
  poweredByHeader: false,

  /**
   * Production Security + Cache Headers
   */
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [...buildSecurityHeaders()],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
