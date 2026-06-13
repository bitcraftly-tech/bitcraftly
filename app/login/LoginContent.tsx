"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";
import PasswordInput from "@/components/ui/PasswordInput";

type LoginContentProps = {
  googleEnabled: boolean;
};

const authInputClassName =
  "h-11 w-full rounded-lg border border-border-primary bg-bg-card px-3 text-sm text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary";

function safeCallbackUrl(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
}

export default function LoginContent({ googleEnabled }: LoginContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(
    () => safeCallbackUrl(searchParams.get("callbackUrl")),
    [searchParams],
  );
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
    toast.info("Your session ended for security. Please sign in again.");
    const url = new URL(window.location.href);
    url.searchParams.delete("reason");
    const qs = url.searchParams.toString();
    const path = qs ? `${url.pathname}?${qs}` : url.pathname;
    window.history.replaceState({}, "", path);
  }, []);

  const isPrivilegedRole = (role?: string) => {
    const normalized = `${role ?? ""}`.toLowerCase();
    return normalized === "admin" || normalized === "staff" || normalized === "manager";
  };

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
          toast.error("Please enter email and password.");
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
            toast.error("Only admin, staff, or manager login is allowed.");
            await showErrorAlert("Only admin, staff, or manager login is allowed.");
            router.replace("/login");
            return;
          }
          toast.success("Login successful.");
          await showSuccessAlert("Login successful.");
          router.push(callbackUrl);
        } else {
          toast.error("Invalid email or password.");
          await showErrorAlert("Invalid email or password.");
        }
        return;
      }

      if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
        toast.error("Please fill all signup fields.");
        return;
      }
      if (signupPassword.length < 6) {
        toast.error("Password must be at least 6 characters.");
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
        toast.error(errorPayload?.message || "Signup failed. Please try again.");
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
          toast.error("Only admin, staff, or manager login is allowed.");
          await showErrorAlert("Only admin, staff, or manager login is allowed.");
          router.replace("/login");
          return;
        }
        toast.success("Account created successfully.");
        await showSuccessAlert("Account created successfully.");
        router.push(callbackUrl);
      } else {
        toast.success("Account created. Please log in.");
        await showSuccessAlert("Account created. Please log in.");
        setMode("login");
        setLoginEmail(signupEmail.trim());
        setLoginPassword("");
      }
    } catch (_error) {
      toast.error("Something went wrong. Please try again.");
      await showErrorAlert("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <section className="bg-bg-primary py-8 dark:bg-dark-bg-primary">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="rounded-2xl border border-border-primary bg-bg-card p-7 shadow-[0_10px_40px_rgba(26,25,22,0.06)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
            Bitcraftly Portal
          </p>
          <h1 className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">
            {mode === "login" ? "Welcome back to Bitcraftly Portal" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
            {mode === "login"
              ? "Manage your websites, projects and business tools in one place."
              : "Sign up with your details or continue with Gmail."}
          </p>

          {callbackUrl.includes("/dashboard/analytics") ? (
            <p className="mt-3 rounded-lg border border-indigo-500/25 bg-indigo-50 px-3 py-2 text-xs text-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200">
              Sign in with your <strong>admin</strong> account to open Website Analytics after login.
            </p>
          ) : null}

          <div className="mt-5 grid grid-cols-2 rounded-lg border border-border-primary bg-bg-secondary p-1 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-bg-card text-text-primary shadow-sm dark:bg-dark-bg-card dark:text-dark-text-primary"
                  : "text-text-secondary dark:text-dark-text-secondary"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-bg-card text-text-primary shadow-sm dark:bg-dark-bg-card dark:text-dark-text-primary"
                  : "text-text-secondary dark:text-dark-text-secondary"
              }`}
            >
              Signup
            </button>
          </div>

          <form onSubmit={handleEmailAuth} className="mt-4 space-y-3">
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
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#1A1916] px-4 text-sm font-semibold text-white transition hover:bg-[#1A1916]/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-600 dark:hover:bg-violet-500"
            >
              {isSubmittingForm ? "Please wait..." : mode === "login" ? "Login with Email" : "Create Account"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={!googleEnabled || isLoading}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-border-primary bg-bg-card px-4 text-sm font-semibold text-text-primary transition hover:border-border-secondary disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6s4.1 9.2 9.2 9.2c5.3 0 8.9-3.7 8.9-8.9 0-.6-.1-1.1-.2-1.7H12z"
              />
            </svg>
            {isLoading ? "Signing in..." : "Continue with Gmail"}
          </button>

          {!googleEnabled ? (
            <p className="mt-3 text-xs text-red-600 dark:text-red-400">
              Google login is not configured. In Vercel → Environment Variables set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`,
              `NEXTAUTH_URL` (https://bitcraftly.com), and either `AUTH_SECRET` or `NEXTAUTH_SECRET`, then redeploy.
            </p>
          ) : null}

          <p className="mt-5 text-center text-sm text-text-secondary dark:text-dark-text-secondary">
            New here?{" "}
            <Link href="/contact" className="font-semibold text-accent-primary hover:underline dark:text-indigo-400 dark:hover:text-indigo-300">
              Book a demo
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
