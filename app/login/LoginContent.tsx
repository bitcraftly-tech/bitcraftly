"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import LoginSystem from "@/components/auth/LoginSystem";
import { safeCallbackUrl } from "@/components/auth/loginShared";

type LoginContentProps = {
  googleEnabled: boolean;
};

export default function LoginContent({ googleEnabled }: LoginContentProps) {
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(
    () => safeCallbackUrl(searchParams.get("callbackUrl")),
    [searchParams],
  );

  return (
    <section className="relative overflow-hidden bg-bg-primary pb-10 sm:pb-14 dark:bg-dark-bg-primary">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -20%, rgba(99, 102, 241, 0.14), transparent 60%), radial-gradient(ellipse 45% 35% at 100% 0%, rgba(124, 58, 237, 0.08), transparent 55%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-md px-6">
        <LoginSystem googleEnabled={googleEnabled} callbackUrl={callbackUrl} />
      </div>
    </section>
  );
}
