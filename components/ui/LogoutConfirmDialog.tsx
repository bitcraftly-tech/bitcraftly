"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type LogoutConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function LogoutConfirmDialog({ open, onClose, onConfirm }: LogoutConfirmDialogProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const backdropDur = reduceMotion ? 0 : 0.2;
  const panelDur = reduceMotion ? 0 : 0.22;

  useEffect(() => setMounted(true), []);

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
    const cancelBtn = panelRef.current?.querySelector<HTMLButtonElement>('[data-logout-cancel]');
    cancelBtn?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      trapFocus(e);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, trapFocus]);

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
            key="logout-backdrop"
            role="presentation"
            aria-hidden
            className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-sm dark:bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: backdropDur, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={panelRef}
              key="logout-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="pointer-events-auto w-full max-w-[400px] rounded-2xl border border-border-primary bg-white p-6 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.18)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 10 }}
              transition={{ duration: panelDur, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id={titleId} className="text-lg font-semibold tracking-tight text-text-primary dark:text-white">
                Sign out?
              </h2>
              <p id={descId} className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-zinc-400">
                Are you sure you want to sign out from your account?
              </p>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  data-logout-cancel
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-border-primary bg-transparent px-4 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 dark:bg-red-600 dark:hover:bg-red-500"
                  onClick={() => {
                    onConfirm();
                  }}
                >
                  Sign Out
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
