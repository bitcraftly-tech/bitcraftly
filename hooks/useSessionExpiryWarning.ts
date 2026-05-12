"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { getSessionExpiryWarningConfig } from "@/lib/sessionTimeoutConfig";

export const DEFAULT_SESSION_EXPIRED_SIGNOUT_URL = "/login?reason=session_expired";

export type UseSessionExpiryWarningOptions = {
  enabled: boolean;
  callbackUrl?: string;
};

export type UseSessionExpiryWarningResult = {
  mounted: boolean;
  warningOpen: boolean;
  remainingMs: number;
  totalWarningMs: number;
  stayLoggedIn: () => void;
  logoutNow: () => void;
  previewSessionWarning: () => void;
};

/**
 * Shows the session warning only when the NextAuth session is near **JWT/cookie expiry**
 * (`session.expires`), not based on mouse/keyboard idle time.
 */
export function useSessionExpiryWarning({
  enabled,
  callbackUrl = DEFAULT_SESSION_EXPIRED_SIGNOUT_URL,
}: UseSessionExpiryWarningOptions): UseSessionExpiryWarningResult {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [mounted, setMounted] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [totalWarningMs, setTotalWarningMs] = useState(() => getSessionExpiryWarningConfig().warningLeadMs);

  const configRef = useRef(getSessionExpiryWarningConfig());
  configRef.current = getSessionExpiryWarningConfig();

  const warningOpenRef = useRef(false);
  const snoozeUntilRef = useRef(0);
  const expiredHandledRef = useRef(false);
  const previewDeadlineRef = useRef<number | null>(null);
  /** Always read latest `session.expires` inside the 1s interval (avoid stale closures). */
  const sessionExpiresRef = useRef<string | undefined>(undefined);
  sessionExpiresRef.current = session?.expires;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    warningOpenRef.current = warningOpen;
  }, [warningOpen]);

  useEffect(() => {
    expiredHandledRef.current = false;
  }, [session?.expires]);

  const signOutAndGoToLogin = useCallback(async () => {
    await signOut({ redirect: false });
    router.replace(callbackUrl);
    router.refresh();
  }, [callbackUrl, router]);

  const stayLoggedIn = useCallback(async () => {
    previewDeadlineRef.current = null;
    warningOpenRef.current = false;
    setWarningOpen(false);
    snoozeUntilRef.current = Date.now() + 120_000;
    try {
      await update?.();
    } catch {
      /* ignore */
    }
  }, [update]);

  const logoutNow = useCallback(() => {
    previewDeadlineRef.current = null;
    warningOpenRef.current = false;
    setWarningOpen(false);
    expiredHandledRef.current = true;
    void signOutAndGoToLogin();
  }, [signOutAndGoToLogin]);

  const previewSessionWarning = useCallback(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (!enabled) return;
    const lead = configRef.current.warningLeadMs;
    previewDeadlineRef.current = Date.now() + lead;
    setTotalWarningMs(lead);
    setRemainingMs(lead);
    warningOpenRef.current = true;
    setWarningOpen(true);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || status !== "authenticated") {
      setWarningOpen(false);
      previewDeadlineRef.current = null;
      return;
    }

    const tick = () => {
      const now = Date.now();
      const lead = configRef.current.warningLeadMs;

      if (previewDeadlineRef.current != null) {
        const left = Math.max(0, previewDeadlineRef.current - now);
        setRemainingMs(left);
        if (left <= 0) {
          previewDeadlineRef.current = null;
          warningOpenRef.current = false;
          setWarningOpen(false);
        }
        return;
      }

      const expiresIso = sessionExpiresRef.current;
      if (!expiresIso) return;

      const expiresAt = new Date(expiresIso).getTime();
      if (Number.isNaN(expiresAt)) return;

      const msLeft = expiresAt - now;

      if (msLeft <= 0) {
        if (!expiredHandledRef.current) {
          expiredHandledRef.current = true;
          void signOutAndGoToLogin();
        }
        return;
      }

      expiredHandledRef.current = false;

      const inLeadWindow = msLeft <= lead;
      const pastSnooze = now >= snoozeUntilRef.current;

      if (inLeadWindow && pastSnooze) {
        if (!warningOpenRef.current) {
          setTotalWarningMs(lead);
          warningOpenRef.current = true;
          setWarningOpen(true);
        }
        setRemainingMs(msLeft);
      } else if (!inLeadWindow && warningOpenRef.current) {
        warningOpenRef.current = false;
        setWarningOpen(false);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [enabled, status, signOutAndGoToLogin]);

  return {
    mounted,
    warningOpen,
    remainingMs,
    totalWarningMs,
    stayLoggedIn,
    logoutNow,
    previewSessionWarning,
  };
}
