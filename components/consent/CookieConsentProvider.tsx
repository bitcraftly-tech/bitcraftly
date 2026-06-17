"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import {
  acceptAllCookies,
  type CookieConsentRecord,
  readCookieConsent,
  rejectOptionalCookies,
  writeCookieConsent,
} from "@/lib/cookieConsent";

type CookieConsentContextValue = {
  ready: boolean;
  consent: CookieConsentRecord | null;
  showBanner: boolean;
  showManage: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  saveCustom: (prefs: { analytics: boolean; preferences: boolean; marketing: boolean }) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function shouldHideConsentBanner(pathname: string | null): boolean {
  return Boolean(
    pathname?.startsWith("/interactive-demos") || pathname?.startsWith("/portfolio/"),
  );
}

type CookieConsentProviderProps = {
  children: ReactNode;
};

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const pathname = usePathname();
  const hideOnPath = shouldHideConsentBanner(pathname);

  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showManage, setShowManage] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setConsent(stored);
    setShowBanner(!stored && !hideOnPath);
    setReady(true);
  }, [hideOnPath]);

  useEffect(() => {
    if (!ready || !consent || consent.preferences) return;
    try {
      window.localStorage.removeItem("theme");
      window.localStorage.removeItem("bitcraftly-chat-memory-v1");
    } catch {
      /* ignore */
    }
  }, [ready, consent]);

  const acceptAll = useCallback(() => {
    const next = acceptAllCookies();
    setConsent(next);
    setShowBanner(false);
    setShowManage(false);
  }, []);

  const rejectOptional = useCallback(() => {
    const next = rejectOptionalCookies();
    setConsent(next);
    setShowBanner(false);
    setShowManage(false);
  }, []);

  const saveCustom = useCallback((prefs: { analytics: boolean; preferences: boolean; marketing: boolean }) => {
    const next = writeCookieConsent({ status: "custom", ...prefs });
    setConsent(next);
    setShowBanner(false);
    setShowManage(false);
  }, []);

  const openSettings = useCallback(() => {
    setShowManage(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowManage(false);
    if (consent) setShowBanner(false);
  }, [consent]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ready,
      consent,
      showBanner,
      showManage,
      acceptAll,
      rejectOptional,
      saveCustom,
      openSettings,
      closeSettings,
    }),
    [ready, consent, showBanner, showManage, acceptAll, rejectOptional, saveCustom, openSettings, closeSettings],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
