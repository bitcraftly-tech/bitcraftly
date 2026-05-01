"use client";

import { FormEvent, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

type LoginContentProps = {
  googleEnabled: boolean;
};

export default function LoginContent({ googleEnabled }: LoginContentProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const isPrivilegedRole = (role?: string) => {
    const normalized = `${role ?? ""}`.toLowerCase();
    return normalized === "admin" || normalized === "staff";
  };

  const handleGoogleLogin = async () => {
    if (!googleEnabled) return;
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/auth/redirect" });
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
            toast.error("Only admin/staff login is allowed.");
            await showErrorAlert("Only admin/staff login is allowed.");
            router.replace("/login");
            return;
          }
          toast.success("Login successful.");
          await showSuccessAlert("Login successful.");
          router.push("/dashboard");
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
          toast.error("Only admin/staff login is allowed.");
          await showErrorAlert("Only admin/staff login is allowed.");
          router.replace("/login");
          return;
        }
        toast.success("Account created successfully.");
        await showSuccessAlert("Account created successfully.");
        router.push("/dashboard");
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
    <section className="bg-white py-8">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="rounded-2xl border border-[#1A1916]/10 bg-white p-7 shadow-[0_10px_40px_rgba(26,25,22,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1916]/65">Welcome back</p>
          <h1 className="mt-2 font-[var(--font-playfair)] text-3xl text-[#1A1916]">
            {mode === "login" ? "Login to Bitcraftly" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-[#1A1916]/70">
            {mode === "login"
              ? "Continue with your Gmail account or use email login."
              : "Sign up with your details or continue with Gmail."}
          </p>

          <div className="mt-5 grid grid-cols-2 rounded-lg border border-[#1A1916]/10 bg-[#F4F3F0] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                mode === "login" ? "bg-white text-[#1A1916] shadow-sm" : "text-[#1A1916]/70"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                mode === "signup" ? "bg-white text-[#1A1916] shadow-sm" : "text-[#1A1916]/70"
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
                className="h-11 w-full rounded-lg border border-[#1A1916]/20 px-3 text-sm outline-none transition focus:border-[#2B5CE6]"
              />
            ) : null}
            <input
              type="email"
              value={mode === "login" ? loginEmail : signupEmail}
              onChange={(event) => (mode === "login" ? setLoginEmail(event.target.value) : setSignupEmail(event.target.value))}
              placeholder="Email Address"
              className="h-11 w-full rounded-lg border border-[#1A1916]/20 px-3 text-sm outline-none transition focus:border-[#2B5CE6]"
            />
            <input
              type="password"
              value={mode === "login" ? loginPassword : signupPassword}
              onChange={(event) =>
                mode === "login" ? setLoginPassword(event.target.value) : setSignupPassword(event.target.value)
              }
              placeholder="Password"
              className="h-11 w-full rounded-lg border border-[#1A1916]/20 px-3 text-sm outline-none transition focus:border-[#2B5CE6]"
            />
            <button
              type="submit"
              disabled={isSubmittingForm}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#1A1916] px-4 text-sm font-semibold text-white transition hover:bg-[#1A1916]/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmittingForm ? "Please wait..." : mode === "login" ? "Login with Email" : "Create Account"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={!googleEnabled || isLoading}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#1A1916]/20 bg-white px-4 text-sm font-semibold text-[#1A1916] transition hover:border-[#1A1916]/40 disabled:cursor-not-allowed disabled:opacity-60"
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
            <p className="mt-3 text-xs text-red-600">
              Google login is not configured. In Vercel → Environment Variables set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`,
              `NEXTAUTH_URL` (https://bitcraftly.com), and either `AUTH_SECRET` or `NEXTAUTH_SECRET`, then redeploy.
            </p>
          ) : null}

          <p className="mt-5 text-center text-sm text-[#1A1916]/70">
            New here?{" "}
            <Link href="/contact" className="font-semibold text-[#2B5CE6] hover:underline">
              Book a demo
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
