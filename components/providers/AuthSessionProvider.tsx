"use client";

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const SessionTimeoutProvider = dynamic(() => import("@/components/session/SessionTimeoutProvider"), {
  ssr: false,
});

type AuthSessionProviderProps = {
  children: ReactNode;
};

export default function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(
        () => {
          if (!cancelled) setEnabled(true);
        },
        { timeout: 2800 },
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(() => {
      if (!cancelled) setEnabled(true);
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
      <SessionTimeoutProvider>{children}</SessionTimeoutProvider>
    </SessionProvider>
  );
}
