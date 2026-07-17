import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const projectRoot = process.cwd();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /**
   * Enable React Strict Mode
   * Helps detect potential problems during development.
   */
  reactStrictMode: true,

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
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  /**
   * Image Optimization
   */
  images: {
    formats: ["image/avif", "image/webp"],

    /** Explicit list — Logo (80) and Hero (55) use non-default qualities. */
    qualities: [55, 75, 80],

    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year

    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "bitcraftly.com",
        pathname: "/products/**",
      },
      {
        protocol: "https",
        hostname: "bitcraftly.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "bitcraftly.com",
        pathname: "/brand/**",
      },
    ],
  },

  /**
   * Production Security Headers
   */
 async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(), browsing-topics=()",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
  ];
},
};

export default withBundleAnalyzer(nextConfig);