"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

import SessionTimeoutProvider from "@/components/session/SessionTimeoutProvider";

type AuthSessionProviderProps = {
  children: ReactNode;
};

export default function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
      <SessionTimeoutProvider>{children}</SessionTimeoutProvider>
    </SessionProvider>
  );
}
