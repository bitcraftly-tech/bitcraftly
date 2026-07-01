"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { MOBILE_STICKY_CTA_PATHS } from "@/lib/mobileStickyCta";
import { whatsappUrl } from "@/lib/constants";
import { MOBILE_WHATSAPP_UX, WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

/** Mobile-only sticky conversion bar — homepage & key pages */
export default function MobileStickyCta() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const showOn = (MOBILE_STICKY_CTA_PATHS as readonly string[]).includes(pathname ?? "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showOn) return;

    const el = barRef.current;
    if (!el) return;

    const syncHeight = () => {
      const height = Math.min(Math.max(el.offsetHeight, 72), 120);
      document.documentElement.style.setProperty("--bc-mobile-sticky-h", `${height}px`);
    };

    syncHeight();

    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);
    window.addEventListener("orientationchange", syncHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", syncHeight);
      document.documentElement.style.removeProperty("--bc-mobile-sticky-h");
    };
  }, [showOn]);

  if (!showOn || !mounted) return null;

  return createPortal(
    <div
      ref={barRef}
      className="bc-mobile-sticky-cta fixed inset-x-0 bottom-0 z-[9020] border-t border-border-primary bg-bg-card px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)] sm:px-4 dark:border-dark-border-primary dark:bg-dark-bg-card dark:shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.45)] md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto max-w-lg">
        <div className="flex gap-2">
          <Link
            href="/contact?intent=consultation&source=mobile-sticky"
            className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-2 py-2.5 text-center text-[13px] font-semibold leading-tight text-white sm:text-sm"
          >
            {MOBILE_WHATSAPP_UX.stickyPrimary}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            data-wa-source="mobile-sticky-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-2 py-2.5 text-center text-[13px] font-semibold leading-tight text-[#128C7E] sm:text-sm dark:text-[#25D366]"
          >
            WhatsApp
          </Link>
        </div>
        <p className="mt-1 line-clamp-1 text-center text-[10px] text-text-tertiary dark:text-dark-text-tertiary">
          {MOBILE_WHATSAPP_UX.stickyHint}
        </p>
      </div>
    </div>,
    document.body,
  );
}
