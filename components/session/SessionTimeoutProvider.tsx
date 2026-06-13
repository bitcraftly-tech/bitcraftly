"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";

import { useSessionExpiryWarning } from "@/hooks/useSessionExpiryWarning";

const SessionTimeoutModal = dynamic(
  () => import("@/components/session/SessionTimeoutModal").then((m) => ({ default: m.SessionTimeoutModal })),
  { ssr: false },
);

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
      {status === "authenticated" ? (
        <SessionTimeoutModal
          open={expiry.warningOpen}
          mounted={expiry.mounted}
          remainingMs={expiry.remainingMs}
          totalWarningMs={expiry.totalWarningMs}
          onStayLoggedIn={expiry.stayLoggedIn}
          onLogoutNow={expiry.logoutNow}
        />
      ) : null}
    </>
  );
}
