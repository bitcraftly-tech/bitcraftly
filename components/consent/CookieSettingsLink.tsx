"use client";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";

export default function CookieSettingsLink() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="hover:text-text-secondary dark:hover:text-dark-text-secondary"
    >
      Cookies
    </button>
  );
}
