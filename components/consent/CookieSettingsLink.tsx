"use client";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";

export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={className || "hover:text-text-secondary dark:hover:text-dark-text-secondary"}
    >
      Cookies
    </button>
  );
}
