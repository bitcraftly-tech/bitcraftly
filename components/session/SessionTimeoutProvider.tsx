"use client";

import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { SessionTimeoutModal } from "@/components/session/SessionTimeoutModal";
import { getSessionTimeoutConfig, throttleLeading } from "@/lib/sessionTimeoutConfig";

type SessionTimeoutProviderProps = {
  children: ReactNode;
};

export default function SessionTimeoutProvider({ children }: SessionTimeoutProviderProps) {
  const { status } = useSession();
  const [warningOpen, setWarningOpen] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [mounted, setMounted] = useState(false);

  const configRef = useRef(getSessionTimeoutConfig());
  const warningOpenRef = useRef(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningDeadlineRef = useRef<number | null>(null);
  const expiredRef = useRef(false);

  useEffect(() => setMounted(true), []);

  configRef.current = getSessionTimeoutConfig();

  useEffect(() => {
    warningOpenRef.current = warningOpen;
  }, [warningOpen]);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const clearWarningDeadline = useCallback(() => {
    warningDeadlineRef.current = null;
    expiredRef.current = false;
  }, []);

  const scheduleIdleTimer = useCallback(() => {
    clearInactivityTimer();
    const idle = configRef.current.idleMs;
    inactivityTimerRef.current = setTimeout(() => {
      const w = configRef.current.warningMs;
      warningDeadlineRef.current = Date.now() + w;
      setRemainingMs(w);
      setWarningOpen(true);
    }, idle);
  }, [clearInactivityTimer]);

  const dismissWarningAndExtend = useCallback(() => {
    setWarningOpen(false);
    clearWarningDeadline();
    scheduleIdleTimer();
  }, [clearWarningDeadline, scheduleIdleTimer]);

  const onActivity = useCallback(() => {
    if (warningOpenRef.current) {
      dismissWarningAndExtend();
      return;
    }
    scheduleIdleTimer();
  }, [dismissWarningAndExtend, scheduleIdleTimer]);

  const handleLogoutNow = useCallback(() => {
    setWarningOpen(false);
    clearWarningDeadline();
    clearInactivityTimer();
    void signOut({ callbackUrl: "/login" });
  }, [clearInactivityTimer, clearWarningDeadline]);

  useEffect(() => {
    if (status !== "authenticated") {
      clearInactivityTimer();
      clearWarningDeadline();
      setWarningOpen(false);
      return;
    }

    scheduleIdleTimer();

    const onMouseMove = throttleLeading(() => onActivity(), 500);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("click", onActivity);
    window.addEventListener("scroll", onActivity, { passive: true, capture: true });
    window.addEventListener("touchstart", onActivity, { passive: true });

    return () => {
      clearInactivityTimer();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("click", onActivity);
      window.removeEventListener("scroll", onActivity, true);
      window.removeEventListener("touchstart", onActivity);
    };
  }, [status, clearInactivityTimer, clearWarningDeadline, onActivity, scheduleIdleTimer]);

  useEffect(() => {
    if (!warningOpen || warningDeadlineRef.current == null) return;

    const deadline = warningDeadlineRef.current;
    expiredRef.current = false;

    const id = setInterval(() => {
      const left = Math.max(0, deadline - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        clearInterval(id);
        if (!expiredRef.current) {
          expiredRef.current = true;
          void signOut({ callbackUrl: "/login" });
        }
      }
    }, 100);

    return () => clearInterval(id);
  }, [warningOpen]);

  const totalWarningMs = configRef.current.warningMs;

  return (
    <>
      {children}
      <SessionTimeoutModal
        open={warningOpen}
        mounted={mounted}
        remainingMs={remainingMs}
        totalWarningMs={totalWarningMs}
        onStayLoggedIn={dismissWarningAndExtend}
        onLogoutNow={handleLogoutNow}
      />
    </>
  );
}
