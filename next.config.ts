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

  /** Isolated portfolio showcase packages under showcases/* */
  transpilePackages: [
    '@bitcraftly/showcase-shared',
    '@bitcraftly/showcase-dayal-builders',
    '@bitcraftly/showcase-clinic-healthcare',
    '@bitcraftly/showcase-gym-fitness',
    '@bitcraftly/showcase-school-website',
    '@bitcraftly/showcase-ecommerce-store',
    '@bitcraftly/showcase-claycraft-crockery',
    '@bitcraftly/showcase-restaurant-website',
    '@bitcraftly/showcase-restaurant-ai-chatbot',
    '@bitcraftly/showcase-society-management',
    '@bitcraftly/showcase-builder-real-estate',
    '@bitcraftly/showcase-local-services-leads',
    '@bitcraftly/showcase-toy-store',
    '@bitcraftly/showcase-rpytech-training',
    '@bitcraftly/showcase-react-video-demo',
  ],

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
   * `prisma generate` rewrites `src/generated/prisma` on every build, and that
   * folder lives inside the watched `src` tree. A build running next to
   * `next dev` would otherwise trigger Fast Refresh full page reloads.
   */
  webpack(config, { dev }) {
    if (!dev) {
      return config;
    }

    const currentIgnored = config.watchOptions?.ignored;
    const inherited = Array.isArray(currentIgnored)
      ? currentIgnored
      : typeof currentIgnored === 'string'
        ? [currentIgnored]
        : [];

    config.watchOptions = {
      ...config.watchOptions,
      ignored: [...inherited, '**/src/generated/**', '**/.next/**'],
    };

    return config;
  },

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
   * Legacy portfolio showcase path fixes.
   */
  async redirects() {
    return [
      {
        source: '/portfolio/toy--showcase',
        destination: '/portfolio/toy-showcase',
        permanent: true,
      },
      {
        source: '/portfolio/toy--showcase/:path*',
        destination: '/portfolio/toy-showcase/:path*',
        permanent: true,
      },
    ];
  },

  /**
   * Production Security + Cache Headers
   * Never set long-lived immutable Cache-Control on `/_next/static` in
   * development — Chrome keeps stale webpack chunks and full-page reloads.
   * Staging/production are fine because chunk hashes match the build.
   */
  async headers() {
    const security = {
      source: '/(.*)',
      headers: [...buildSecurityHeaders()],
    };

    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, max-age=0',
            },
            { key: 'Pragma', value: 'no-cache' },
            { key: 'Expires', value: '0' },
          ],
        },
        security,
      ];
    }

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
      security,
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
