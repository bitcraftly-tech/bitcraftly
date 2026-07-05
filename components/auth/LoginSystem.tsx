"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";
import { showErrorAlert, showInfoAlert, showSuccessAlert } from "@/lib/sweetAlert";

import { authInputClassName, isPrivilegedRole, portalHighlights } from "./loginShared";

export type LoginSystemProps = {
  googleEnabled: boolean;
  callbackUrl: string;
  presentation?: "page" | "modal";
  headerAction?: ReactNode;
  onBusyChange?: (busy: boolean) => void;
  onLoginSuccess?: () => void;
  titleId?: string;
};

export default function LoginSystem({
  googleEnabled,
  callbackUrl,
  presentation = "page",
  headerAction,
  onBusyChange,
  onLoginSuccess,
  titleId = "login-system-title",
}: LoginSystemProps) {
  const isModal = presentation === "modal";
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reason") !== "session_expired") return;
    void showInfoAlert("Your session ended for security. Please sign in again.");
    const url = new URL(window.location.href);
    url.searchParams.delete("reason");
    const qs = url.searchParams.toString();
    const path = qs ? `${url.pathname}?${qs}` : url.pathname;
    window.history.replaceState({}, "", path);
  }, []);

  useEffect(() => {
    onBusyChange?.(isSubmittingForm || isLoading);
  }, [isSubmittingForm, isLoading, onBusyChange]);

  const handleGoogleLogin = async () => {
    if (!googleEnabled) return;
    setIsLoading(true);
    await signIn("google", { callbackUrl: `/auth/redirect?callbackUrl=${encodeURIComponent(callbackUrl)}` });
    setIsLoading(false);
  };

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingForm(true);

    try {
      if (mode === "login") {
        if (!loginEmail.trim() || !loginPassword.trim()) {
          void showErrorAlert("Please enter email and password.");
          return;
        }
        const result = await signIn("credentials", {
          email: loginEmail.trim(),
          password: loginPassword,
          redirect: false,
        });
        if (result?.ok) {
          const session = await getSession();
          if (!isPrivilegedRole(session?.role)) {
            await signOut({ redirect: false });
            await showErrorAlert("Only admin, staff, or manager login is allowed.");
            router.replace("/login");
            return;
          }
          await showSuccessAlert("Login successful.");
          onLoginSuccess?.();
          router.push(callbackUrl);
        } else {
          await showErrorAlert("Invalid email or password.");
        }
        return;
      }

      if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
        void showErrorAlert("Please fill all signup fields.");
        return;
      }
      if (signupPassword.length < 6) {
        void showErrorAlert("Password must be at least 6 characters.");
        return;
      }

      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName.trim(),
          email: signupEmail.trim(),
          password: signupPassword,
        }),
      });

      if (!signupResponse.ok) {
        const errorPayload = await signupResponse.json().catch(() => null);
        void showErrorAlert(errorPayload?.message || "Signup failed. Please try again.");
        return;
      }

      const loginResult = await signIn("credentials", {
        email: signupEmail.trim(),
        password: signupPassword,
        redirect: false,
      });
      if (loginResult?.ok) {
        const session = await getSession();
        if (!isPrivilegedRole(session?.role)) {
          await signOut({ redirect: false });
          await showErrorAlert("Only admin, staff, or manager login is allowed.");
          router.replace("/login");
          return;
        }
        await showSuccessAlert("Account created successfully.");
        onLoginSuccess?.();
        router.push(callbackUrl);
      } else {
        await showSuccessAlert("Account created. Please log in.");
        setMode("login");
        setLoginEmail(signupEmail.trim());
        setLoginPassword("");
      }
    } catch (_error) {
      await showErrorAlert("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const loginDescription = isModal
    ? "Access your projects, analytics, and delivery dashboard."
    : "Sign in to manage projects, review analytics, and stay on top of every delivery — from one secure dashboard.";

  const signupDescription = isModal
    ? "Create your account to collaborate with the Bitcraftly team."
    : "Set up your account to collaborate on launches, track leads, and manage your digital presence with the Bitcraftly team.";

  const shellClassName = isModal
    ? "flex min-h-0 w-full flex-1 flex-col"
    : "w-full overflow-hidden rounded-3xl border border-indigo-500/20 bg-bg-card shadow-[0_24px_60px_-28px_rgba(79,70,229,0.35)] dark:border-indigo-500/25 dark:bg-dark-bg-card dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]";

  const headerClassName = isModal
    ? "shrink-0 border-b border-indigo-500/10 bg-gradient-to-r from-indigo-500/8 via-violet-500/4 to-transparent dark:from-indigo-500/12 dark:via-violet-500/8"
    : "border-b border-indigo-500/15 bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-transparent px-6 py-5 sm:px-7 dark:from-indigo-500/15 dark:via-violet-500/10";

  const bodyClassName = isModal
    ? "p-5 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
    : "p-6 pt-5 sm:p-7 sm:pt-6";

  const headerContent = (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400 sm:text-[11px] sm:tracking-[0.18em]">
        Bitcraftly Client Portal
      </p>
      <h1
        id={titleId}
        className={
          isModal
            ? "mt-1.5 font-[var(--font-playfair)] text-[1.375rem] font-semibold leading-snug tracking-tight text-text-primary dark:text-dark-text-primary sm:text-2xl"
            : "mt-2 font-[var(--font-playfair)] text-[1.75rem] font-semibold leading-tight tracking-tight text-text-primary dark:text-dark-text-primary sm:text-3xl"
        }
      >
        {mode === "login" ? "Welcome back" : "Create your workspace"}
      </h1>
      <p
        className={
          isModal
            ? "mt-1 text-[13px] leading-snug text-text-secondary dark:text-dark-text-secondary sm:text-sm"
            : "mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary"
        }
      >
        {mode === "login" ? loginDescription : signupDescription}
      </p>
    </>
  );

  const bodyContent = (
    <>
        {!isModal && mode === "login" ? (
          <ul className="mb-5 space-y-2.5">
            {portalHighlights.map(({ icon: Icon, label, detail }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-xl border border-border-primary/70 bg-bg-secondary/70 px-3.5 py-2.5 dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/70"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/25">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary">{label}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {callbackUrl.includes("/dashboard/analytics") ? (
          <p
            className={
              isModal
                ? "mb-3 rounded-lg border border-indigo-500/25 bg-indigo-50 px-3 py-2 text-[11px] leading-snug text-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200 sm:text-xs"
                : "mb-4 rounded-xl border border-indigo-500/25 bg-indigo-50 px-3.5 py-2.5 text-xs leading-relaxed text-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200"
            }
          >
            Sign in with your <strong>admin</strong> account to open Website Analytics after login.
          </p>
        ) : null}

        <div className="grid grid-cols-2 rounded-xl border border-border-primary bg-bg-secondary p-1 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition sm:py-2.5 ${mode === "login"
                ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-sm shadow-indigo-500/25"
                : "text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
              }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition sm:py-2.5 ${mode === "signup"
                ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-sm shadow-indigo-500/25"
                : "text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
              }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleEmailAuth} className={isModal ? "mt-4 space-y-2.5" : "mt-5 space-y-3"}>
          {mode === "signup" ? (
            <input
              type="text"
              value={signupName}
              onChange={(event) => setSignupName(event.target.value)}
              placeholder="Full Name"
              autoComplete="name"
              className={authInputClassName}
            />
          ) : null}
          <input
            type="email"
            value={mode === "login" ? loginEmail : signupEmail}
            onChange={(event) => (mode === "login" ? setLoginEmail(event.target.value) : setSignupEmail(event.target.value))}
            placeholder="Email Address"
            autoComplete="email"
            className={authInputClassName}
          />
          <PasswordInput
            value={mode === "login" ? loginPassword : signupPassword}
            onChange={(value) => (mode === "login" ? setLoginPassword(value) : setSignupPassword(value))}
            placeholder="Password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className={authInputClassName}
          />
          <button
            type="submit"
            disabled={isSubmittingForm}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(79,70,229,0.75)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmittingForm ? "Please wait..." : mode === "login" ? "Sign in with email" : "Create account"}
          </button>
        </form>

        <div className={isModal ? "my-4 flex items-center gap-3" : "my-5 flex items-center gap-3"}>
          <span className="h-px flex-1 bg-border-primary dark:bg-dark-border-primary" aria-hidden />
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">or</span>
          <span className="h-px flex-1 bg-border-primary dark:bg-dark-border-primary" aria-hidden />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={!googleEnabled || isLoading}
          className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border-primary bg-bg-card px-4 text-sm font-semibold text-text-primary transition hover:border-indigo-500/30 hover:bg-bg-secondary disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:border-indigo-500/35 dark:hover:bg-dark-bg-primary"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6s4.1 9.2 9.2 9.2c5.3 0 8.9-3.7 8.9-8.9 0-.6-.1-1.1-.2-1.7H12z"
            />
          </svg>
          {isLoading ? "Signing in..." : "Continue with Google"}
        </button>

        {!googleEnabled ? (
          <p className="mt-2.5 text-[11px] leading-snug text-red-600 dark:text-red-400 sm:text-xs">
            {isModal
              ? "Google sign-in is not configured on this environment."
              : "Google login is not configured. In Vercel → Environment Variables set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `NEXTAUTH_URL` (https://bitcraftly.com), and either `AUTH_SECRET` or `NEXTAUTH_SECRET`, then redeploy."}
          </p>
        ) : null}

        <p className={isModal ? "mt-4 text-center text-[13px] text-text-secondary dark:text-dark-text-secondary sm:text-sm" : "mt-6 text-center text-sm text-text-secondary dark:text-dark-text-secondary"}>
          {mode === "login" ? "New to Bitcraftly?" : "Already have access?"}{" "}
          {mode === "login" ? (
            <Link href="/contact" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300">
              Book a discovery call
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign in instead
            </button>
          )}
        </p>
    </>
  );

  return (
    <div className={shellClassName}>
      {isModal ? (
        <div className={headerClassName}>
          <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
            <div className="min-w-0 flex-1">{headerContent}</div>
            {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
          </div>
        </div>
      ) : (
        <div className={headerClassName}>{headerContent}</div>
      )}

      {isModal ? (
        <div className="bc-login-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className={bodyClassName}>{bodyContent}</div>
        </div>
      ) : (
        <div className={bodyClassName}>{bodyContent}</div>
      )}
    </div>
  );
}
