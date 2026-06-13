"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MOBILE_STICKY_CTA_PATHS } from "@/lib/mobileStickyCta";
import { whatsappUrl } from "@/lib/constants";
import { MOBILE_STICKY_CTA } from "@/lib/leadGen";
import { MOBILE_WHATSAPP_UX, WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

/** Mobile-only sticky conversion bar — homepage & key pages */
export default function MobileStickyCta() {
  const pathname = usePathname();
  const showOn = (MOBILE_STICKY_CTA_PATHS as readonly string[]).includes(pathname ?? "");
  if (!showOn) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-border-primary bg-bg-card/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] backdrop-blur-md dark:border-dark-border-primary dark:bg-dark-bg-card/95 md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto max-w-lg">
        <div className="flex gap-2">
          <Link
            href="/contact?intent=consultation&source=mobile-sticky"
            className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] py-2.5 text-sm font-semibold text-white"
          >
            {MOBILE_WHATSAPP_UX.stickyPrimary}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            data-wa-source="mobile-sticky-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 py-2.5 text-sm font-semibold text-[#128C7E] dark:text-[#25D366]"
          >
            {MOBILE_WHATSAPP_UX.stickyWhatsApp}
          </Link>
        </div>
        <p className="mt-1 text-center text-[10px] text-text-tertiary dark:text-dark-text-tertiary">{MOBILE_WHATSAPP_UX.stickyHint}</p>
      </div>
    </div>
  );
}
