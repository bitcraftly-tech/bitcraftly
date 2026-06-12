"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { isAnalyticsEnabledClient, trackContactFormStart, trackPageView, trackWhatsAppClick } from "@/lib/analytics";

const WHATSAPP_HREF = /wa\.me|api\.whatsapp\.com/i;
const CONTACT_FORM_SELECTOR = "#contact-enquiry-form, form[data-analytics-form='contact']";

function resolveWhatsAppSource(anchor: HTMLAnchorElement): string {
  return (
    anchor.getAttribute("data-wa-source") ||
    anchor.getAttribute("data-analytics-source") ||
    anchor.id ||
    "whatsapp_link"
  );
}

/** SPA page views, WhatsApp link clicks, and contact form start events */
export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contactFormStarted = useRef(false);

  useEffect(() => {
    if (!isAnalyticsEnabledClient()) return;
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isAnalyticsEnabledClient()) return;

    function onDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!WHATSAPP_HREF.test(href)) return;

      trackWhatsAppClick({
        source: resolveWhatsAppSource(anchor),
        pagePath: window.location.pathname,
      });
    }

    function onContactFormFocusIn(event: FocusEvent) {
      if (contactFormStarted.current) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(CONTACT_FORM_SELECTOR)) return;

      contactFormStarted.current = true;
      const params = new URLSearchParams(window.location.search);
      trackContactFormStart({
        pageMode: params.get("intent") || "default",
        intent: params.get("intent") || undefined,
        service: params.get("service") || undefined,
      });
    }

    document.addEventListener("click", onDocumentClick, true);
    document.addEventListener("focusin", onContactFormFocusIn, true);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      document.removeEventListener("focusin", onContactFormFocusIn, true);
    };
  }, []);

  useEffect(() => {
    contactFormStarted.current = false;
  }, [pathname]);

  return null;
}
