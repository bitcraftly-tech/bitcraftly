"use client";

import { useSession } from "next-auth/react";
import type { ReactNode } from "react";

import { SessionTimeoutModal } from "@/components/session/SessionTimeoutModal";
import { useSessionExpiryWarning } from "@/hooks/useSessionExpiryWarning";

type SessionTimeoutProviderProps = {
  children: ReactNode;
};

export default function SessionTimeoutProvider({ children }: SessionTimeoutProviderProps) {
  const { status } = useSession();
  const expiry = useSessionExpiryWarning({
    enabled: status === "authenticated",
  });

  return (
    <>
      {children}
      <SessionTimeoutModal
        open={expiry.warningOpen}
        mounted={expiry.mounted}
        remainingMs={expiry.remainingMs}
        totalWarningMs={expiry.totalWarningMs}
        onStayLoggedIn={expiry.stayLoggedIn}
        onLogoutNow={expiry.logoutNow}
      />
      {process.env.NODE_ENV === "development" && status === "authenticated" ? (
        <button
          type="button"
          title="Testing: session expiry modal ka UI dekhne ke liye"
          className="pointer-events-auto fixed bottom-24 left-4 z-[115] max-w-[min(100vw-2rem,220px)] rounded-xl border border-border-primary bg-bg-card/95 px-3 py-2 text-left text-xs font-medium leading-snug text-text-secondary shadow-lg backdrop-blur-md transition hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          onClick={() => expiry.previewSessionWarning()}
        >
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            Dev only
          </span>
          <span className="mt-0.5 block">Preview session warning UI</span>
        </button>
      ) : null}
    </>
  );
}
