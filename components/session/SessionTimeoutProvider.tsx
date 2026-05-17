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
    </>
  );
}
