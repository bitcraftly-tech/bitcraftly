"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

export function formatSessionRemaining(ms: number): string {
  const sec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m > 0) return `${m}:${s.toString().padStart(2, "0")}`;
  return `${sec} second${sec === 1 ? "" : "s"}`;
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
  const urgent = remainingMs <= 15_000 && remainingMs > 0;

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
        <>
          <motion.div
            key="session-timeout-backdrop"
            role="presentation"
            aria-hidden
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-md dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: backdropDur, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="fixed inset-0 z-[111] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={panelRef}
              key="session-timeout-panel"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={`${descId} ${timerId}`}
              className={`pointer-events-auto w-full max-w-[420px] rounded-2xl border border-border-primary bg-white/95 p-6 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)] ${urgent && !reduceMotion ? "ring-2 ring-violet-500/35 dark:ring-violet-400/30" : ""}`}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
              transition={{ duration: panelDur, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id={titleId} className="text-lg font-semibold tracking-tight text-text-primary dark:text-white">
                Session Expiring Soon
              </h2>
              <p id={descId} className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-zinc-400">
                You&apos;ve been inactive for a while. For security reasons, your session will expire soon.
              </p>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between gap-3 text-xs font-medium text-text-secondary dark:text-zinc-400">
                  <span id={timerId} aria-live="polite" aria-atomic="true">
                    Time remaining:{" "}
                    <span className="tabular-nums text-text-primary dark:text-zinc-100">{formatSessionRemaining(remainingMs)}</span>
                  </span>
                </div>
                <div
                  className={`relative h-2.5 w-full overflow-hidden rounded-full bg-bg-secondary dark:bg-zinc-800 ${urgent && !reduceMotion ? "animate-pulse" : ""}`}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 shadow-sm dark:from-violet-500 dark:via-violet-400 dark:to-indigo-500"
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "tween", ease: "linear", duration: 0.12 }
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  data-session-stay
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-border-primary bg-transparent px-4 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  onClick={onStayLoggedIn}
                >
                  Stay Logged In
                </button>
                <button
                  type="button"
                  data-session-logout
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 dark:bg-red-600 dark:hover:bg-red-500"
                  onClick={onLogoutNow}
                >
                  Logout Now
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
