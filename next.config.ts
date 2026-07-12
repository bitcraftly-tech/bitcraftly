import type { NextConfig } from "next";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  // Parent folder has another lockfile; pin root to this app to avoid Turbopack
  // watching the wrong tree (can cause continuous Fast Refresh / remounts).
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  images: {
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
};

export default nextConfig;
