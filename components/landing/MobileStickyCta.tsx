"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { MOBILE_STICKY_CTA_PATHS } from "@/lib/mobileStickyCta";
import { whatsappUrl } from "@/lib/constants";
import { MOBILE_WHATSAPP_UX, WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

/** Pin fixed bar bottom edge to the visual viewport bottom (iOS Chrome/Safari). */
function syncStickyToVisualViewport(el: HTMLElement): void {
  const vv = window.visualViewport;
  el.style.bottom = "0px";
  el.style.transform = "translateZ(0)";
  void el.offsetHeight;

  if (!vv) return;

  const visualBottom = vv.offsetTop + vv.height;
  const shift = Math.round(visualBottom - el.getBoundingClientRect().bottom);
  if (Math.abs(shift) > 1) {
    el.style.transform = `translate3d(0, ${shift}px, 0)`;
  }
}

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

    const syncLayout = () => {
      el.style.bottom = "0px";
      el.style.transform = "translateZ(0)";
      const height = Math.min(Math.max(el.offsetHeight, 72), 120);
      document.documentElement.style.setProperty("--bc-mobile-sticky-h", `${height}px`);
      syncStickyToVisualViewport(el);
    };

    const clampScroll = () => {
      const vv = window.visualViewport;
      const viewportHeight = vv?.height ?? window.innerHeight;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
      if (window.scrollY > maxScroll + 1) {
        window.scrollTo(0, maxScroll);
      }
    };

    const onViewportChange = () => {
      syncLayout();
      clampScroll();
    };

    syncLayout();
    clampScroll();

    const ro = new ResizeObserver(onViewportChange);
    ro.observe(el);
    window.visualViewport?.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("scroll", onViewportChange);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("orientationchange", onViewportChange);
    window.addEventListener("scroll", onViewportChange, { passive: true });

    return () => {
      ro.disconnect();
      window.visualViewport?.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("orientationchange", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
      el.style.bottom = "";
      el.style.transform = "";
      document.documentElement.style.removeProperty("--bc-mobile-sticky-h");
    };
  }, [showOn]);

  if (!showOn || !mounted) return null;

  return createPortal(
    <div
      ref={barRef}
      className="bc-mobile-sticky-cta border-t border-border-primary bg-bg-card px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)] sm:px-4 dark:border-dark-border-primary dark:bg-dark-bg-card dark:shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.45)] md:hidden"
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
