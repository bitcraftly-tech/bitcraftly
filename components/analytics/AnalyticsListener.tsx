"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  trackBlogView,
  trackCallClick,
  trackContactFormStart,
  trackEmailClick,
  trackPageView,
  trackPortfolioView,
  trackPricingPageVisit,
  trackServicesPageVisit,
  trackWhatsAppClick,
} from "@/lib/analytics";

const WHATSAPP_HREF = /wa\.me|api\.whatsapp\.com/i;
const TEL_HREF = /^tel:/i;
const MAILTO_HREF = /^mailto:/i;
const CONTACT_FORM_SELECTOR = "#contact-enquiry-form, form[data-analytics-form='contact']";

function resolveSource(anchor: HTMLAnchorElement): string {
  return (
    anchor.getAttribute("data-wa-source") ||
    anchor.getAttribute("data-analytics-source") ||
    anchor.id ||
    "link"
  );
}

function trackPageIntent(pathname: string): void {
  if (pathname.startsWith("/pricing")) trackPricingPageVisit(pathname);
  else if (pathname.startsWith("/services")) trackServicesPageVisit(pathname);
  else if (pathname.startsWith("/portfolio")) trackPortfolioView(pathname);
  else if (pathname.startsWith("/blog")) trackBlogView(pathname);
}

/** SPA page views, engagement clicks, and contact form start events */
export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contactFormStarted = useRef(false);

  useEffect(() => {
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
    trackPageIntent(pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const source = resolveSource(anchor);
      const pagePath = window.location.pathname;

      if (WHATSAPP_HREF.test(href)) {
        trackWhatsAppClick({ source, pagePath });
        return;
      }

      if (TEL_HREF.test(href)) {
        trackCallClick(source, pagePath);
        return;
      }

      if (MAILTO_HREF.test(href)) {
        trackEmailClick(source, pagePath);
      }
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
