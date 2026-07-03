"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getProviders } from "next-auth/react";
import { X } from "lucide-react";

import LoginSystem from "@/components/auth/LoginSystem";
import { safeCallbackUrl } from "@/components/auth/loginShared";

export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  callbackUrl?: string;
};

function useIsMobileSheet() {
  const [isMobileSheet, setIsMobileSheet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobileSheet(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isMobileSheet;
}

function releaseBodyScrollLock() {
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.documentElement.style.overflow = "";
}

export default function LoginModal({ open, onClose, callbackUrl = "/dashboard" }: LoginModalProps) {
  const reduceMotion = useReducedMotion();
  const isMobileSheet = useIsMobileSheet();
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);

  const resolvedCallbackUrl = safeCallbackUrl(callbackUrl);
  const motionEase = [0.22, 1, 0.36, 1] as const;
  const backdropDuration = reduceMotion ? 0 : 0.22;
  const panelDuration = reduceMotion ? 0 : 0.26;

  const requestClose = useCallback(() => {
    if (busy) return;
    onClose();
  }, [busy, onClose]);

  useEffect(() => {
    setMounted(true);
    return () => {
      releaseBodyScrollLock();
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    void getProviders().then((providers) => {
      if (!cancelled) setGoogleEnabled(Boolean(providers?.google));
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, requestClose]);

  const releaseScrollLock = useCallback(() => {
    releaseBodyScrollLock();
  }, []);

  if (!mounted) return null;

  const panelInitial = reduceMotion
    ? false
    : isMobileSheet
      ? { opacity: 0, y: "100%" }
      : { opacity: 0, y: 16, scale: 0.98 };

  const panelExit = reduceMotion
    ? { opacity: 0 }
    : isMobileSheet
      ? { opacity: 0, y: "100%" }
      : { opacity: 0, y: 12, scale: 0.98 };

  const closeButton = (
    <button
      type="button"
      onClick={requestClose}
      disabled={busy}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border-primary/80 bg-bg-card text-text-tertiary transition hover:border-indigo-500/25 hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border-primary/80 dark:bg-dark-bg-card dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
      aria-label="Close login dialog"
    >
      <X className="size-4" aria-hidden />
    </button>
  );

  return createPortal(
    <AnimatePresence mode="sync" onExitComplete={releaseScrollLock}>
      {open ? (
        <>
          <motion.button
            key="login-modal-backdrop"
            type="button"
            className="fixed inset-0 z-[9079] bg-[#111827]/45 backdrop-blur-[2px] dark:bg-black/55"
            aria-label="Close login dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: backdropDuration, ease: motionEase }}
            onClick={requestClose}
          />

          <div className="pointer-events-none fixed inset-0 z-[9080] flex items-end justify-center sm:items-center sm:p-4">
            <motion.div
              key="login-modal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="login-modal-title"
              className="pointer-events-auto relative flex w-full max-h-[min(90dvh,680px)] flex-col overflow-hidden rounded-t-[22px] border border-indigo-500/20 bg-bg-card shadow-[0_24px_60px_-28px_rgba(79,70,229,0.35)] dark:border-indigo-500/25 dark:bg-dark-bg-card dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] sm:max-h-[min(90dvh,640px)] sm:w-full sm:max-w-[460px] sm:rounded-[22px]"
              initial={panelInitial}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={panelExit}
              transition={{ duration: panelDuration, ease: motionEase }}
              onClick={(event) => event.stopPropagation()}
            >
              <LoginSystem
                presentation="modal"
                googleEnabled={googleEnabled}
                callbackUrl={resolvedCallbackUrl}
                titleId="login-modal-title"
                headerAction={closeButton}
                onBusyChange={setBusy}
                onLoginSuccess={onClose}
              />
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
