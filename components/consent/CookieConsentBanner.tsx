"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Cookie, X } from "lucide-react";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";

type CategoryKey = "analytics" | "preferences" | "marketing";

const CATEGORIES: {
  key: CategoryKey;
  title: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    key: "analytics",
    title: "Analytics",
    description: "Helps us understand traffic and improve the site (Google Analytics, visit counts).",
  },
  {
    key: "preferences",
    title: "Preferences",
    description: "Remembers theme choice and chat details so your experience feels personal.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "We do not use marketing cookies today. You can leave this off.",
  },
];

export default function CookieConsentBanner() {
  const { consent, showBanner, showManage, acceptAll, rejectOptional, saveCustom, openSettings, closeSettings } =
    useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState({
    analytics: true,
    preferences: true,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!consent) return;
    setPrefs({
      analytics: consent.analytics,
      preferences: consent.preferences,
      marketing: consent.marketing,
    });
  }, [consent]);

  if (!mounted || (!showBanner && !showManage)) return null;

  const panel = (
    <div
      className="bc-cookie-banner"
      role="dialog"
      aria-labelledby="bc-cookie-title"
      aria-describedby="bc-cookie-desc"
      aria-modal="false"
    >
      <div className="bc-cookie-banner__inner">
        <div className="bc-cookie-banner__head">
          <div className="bc-cookie-banner__icon" aria-hidden>
            <Cookie size={18} />
          </div>
          <div className="bc-cookie-banner__copy">
            <p id="bc-cookie-title" className="bc-cookie-banner__title">
              We use cookies
            </p>
            <p id="bc-cookie-desc" className="bc-cookie-banner__text">
              Essential cookies keep the site working. With your permission we also store analytics and
              preference data. Read our{" "}
              <Link href="/privacy" className="bc-cookie-banner__link">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {showManage ? (
            <button type="button" className="bc-cookie-banner__close" onClick={closeSettings} aria-label="Close cookie settings">
              <X size={16} />
            </button>
          ) : null}
        </div>

        {showManage ? (
          <div className="bc-cookie-banner__prefs">
            <div className="bc-cookie-banner__pref bc-cookie-banner__pref--locked">
              <div>
                <p className="bc-cookie-banner__pref-title">Necessary</p>
                <p className="bc-cookie-banner__pref-desc">Login, security, and consent choice — always on.</p>
              </div>
              <span className="bc-cookie-banner__always">Always on</span>
            </div>

            {CATEGORIES.map((category) => (
              <label key={category.key} className="bc-cookie-banner__pref">
                <div>
                  <p className="bc-cookie-banner__pref-title">{category.title}</p>
                  <p className="bc-cookie-banner__pref-desc">{category.description}</p>
                </div>
                <input
                  type="checkbox"
                  className="bc-cookie-banner__toggle"
                  checked={prefs[category.key]}
                  disabled={category.key === "marketing"}
                  onChange={(event) =>
                    setPrefs((current) => ({ ...current, [category.key]: event.target.checked }))
                  }
                />
              </label>
            ))}
          </div>
        ) : null}

        <div className="bc-cookie-banner__actions">
          {showManage ? (
            <>
              <button type="button" className="bc-cookie-btn bc-cookie-btn--ghost" onClick={rejectOptional}>
                Reject optional
              </button>
              <button
                type="button"
                className="bc-cookie-btn bc-cookie-btn--primary"
                onClick={() => saveCustom(prefs)}
              >
                Save preferences
              </button>
            </>
          ) : (
            <>
              <button type="button" className="bc-cookie-btn bc-cookie-btn--ghost" onClick={rejectOptional}>
                Reject optional
              </button>
              <button
                type="button"
                className="bc-cookie-btn bc-cookie-btn--ghost"
                onClick={() => {
                  setPrefs({ analytics: true, preferences: true, marketing: false });
                  openSettings();
                }}
              >
                Customize
              </button>
              <button type="button" className="bc-cookie-btn bc-cookie-btn--primary" onClick={acceptAll}>
                Accept all
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}
