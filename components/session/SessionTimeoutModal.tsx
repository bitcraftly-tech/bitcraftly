"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

/** Primary countdown line: “Logging out in 60 seconds…” */
export function formatLogoutCountdownPhrase(ms: number): string {
  const sec = Math.max(0, Math.ceil(ms / 1000));
  if (sec <= 0) return "Logging out now…";
  return `Logging out in ${sec} second${sec === 1 ? "" : "s"}…`;
}

type SessionTimeoutModalProps = {
  open: boolean;
  mounted: boolean;
  remainingMs: number;
  totalWarningMs: number;
  onStayLoggedIn: () => void;
  onLogoutNow: () => void;
};

export function SessionTimeoutModal({
  open,
  mounted,
  remainingMs,
  totalWarningMs,
  onStayLoggedIn,
  onLogoutNow,
}: SessionTimeoutModalProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const timerId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropDur = reduceMotion ? 0 : 0.22;
  const panelDur = reduceMotion ? 0 : 0.24;

  const pct = totalWarningMs > 0 ? Math.min(100, Math.max(0, (remainingMs / totalWarningMs) * 100)) : 0;
  const urgentThreshold = Math.max(3_000, totalWarningMs * 0.35);
  const urgent = remainingMs > 0 && remainingMs <= urgentThreshold;

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (!open || !panelRef.current) return;
      if (e.key !== "Tab") return;
      const root = panelRef.current;
      const focusable = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [open]
  );

  useEffect(() => {
    if (!open) return;
    const stay = panelRef.current?.querySelector<HTMLButtonElement>('[data-session-stay]');
    stay?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onStayLoggedIn();
      }
      trapFocus(e);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onStayLoggedIn, trapFocus]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="sync">
      {open && (
        <motion.div
          key="session-timeout-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: backdropDur, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md dark:bg-black/60"
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            key="session-timeout-panel"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={`${descId} ${timerId}`}
            data-session-timeout-dialog=""
            className={`relative z-10 w-full max-w-[420px] rounded-2xl border border-border-primary bg-white/95 p-6 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)] ${urgent && !reduceMotion ? "ring-2 ring-violet-500/35 dark:ring-violet-400/30" : ""}`}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
            transition={{ duration: panelDur, ease: [0.16, 1, 0.3, 1] }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
              Your session is about to expire
            </p>
            <h2 id={titleId} className="mt-2 text-lg font-semibold tracking-tight text-text-primary dark:text-white">
              Session Expiring Soon
            </h2>
            <p id={descId} className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-zinc-400">
              Your login session is ending soon. For security reasons you’ll need to sign in again when it expires.
            </p>

            <div className="mt-5 space-y-2">
              <p
                id={timerId}
                aria-live="polite"
                aria-atomic="true"
                className="text-sm font-medium text-text-primary dark:text-zinc-100"
              >
                <span className="tabular-nums">{formatLogoutCountdownPhrase(remainingMs)}</span>
              </p>
              <div
                className={`relative h-2.5 w-full overflow-hidden rounded-full border border-black/[0.06] bg-zinc-200/90 dark:border-white/10 dark:bg-zinc-800 ${urgent && !reduceMotion ? "animate-pulse" : ""}`}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 h-full w-full rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 shadow-sm dark:from-violet-500 dark:via-violet-400 dark:to-indigo-500"
                  style={{ transformOrigin: "left center" }}
                  initial={false}
                  animate={{ scaleX: Math.max(0, pct / 100) }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "tween", ease: "linear", duration: 0.15 }
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                data-session-stay
                className="relative z-10 inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-border-primary bg-transparent px-4 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onStayLoggedIn();
                }}
              >
                Stay Logged In
              </button>
              <button
                type="button"
                data-session-logout
                className="relative z-10 inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 dark:bg-red-600 dark:hover:bg-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLogoutNow();
                }}
              >
                Logout Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
