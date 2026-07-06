"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { IS_STAGING, PRODUCTION_URL } from "@/lib/appEnv";

export default function StagingEnvironmentBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const syncBannerHeight = () => {
      document.documentElement.style.setProperty(
        "--bc-staging-banner-height",
        `${banner.getBoundingClientRect().height}px`,
      );
    };

    syncBannerHeight();
    const ro = new ResizeObserver(syncBannerHeight);
    ro.observe(banner);
    window.addEventListener("orientationchange", syncBannerHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", syncBannerHeight);
      document.documentElement.style.removeProperty("--bc-staging-banner-height");
    };
  }, []);

  if (!IS_STAGING) return null;

  return (
    <div
      ref={bannerRef}
      className="bc-staging-banner sticky top-0 z-[100] border-b border-amber-500/40 bg-amber-400 px-3 py-2 text-center text-xs font-semibold text-amber-950 sm:text-sm"
      role="status"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span>Staging environment — not production</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <Link href={PRODUCTION_URL} className="underline underline-offset-2 hover:text-amber-900">
          Go to live site
        </Link>
      </span>
    </div>
  );
}
