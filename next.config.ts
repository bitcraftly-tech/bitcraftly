import type { NextConfig } from "next";

const projectRoot = process.cwd();

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
   * Image Optimization
   */
  images: {
    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year

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

export default nextConfig;