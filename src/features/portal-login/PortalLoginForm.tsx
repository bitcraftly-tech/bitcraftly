"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { PORTAL_LOGIN_LANDING } from "./portal-login.content";

type AuthMode = "signin" | "signup";

interface PortalLoginFormProps {
  callbackUrl: string;
}

/**
 * Client portal auth panel — UI mirrored from https://bitcraftly.com/login
 * (email/Google auth backend is not wired in this platform yet).
 */
export function PortalLoginForm({ callbackUrl }: PortalLoginFormProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const passwordId = useId();
  const nameId = useId();
  const emailId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      `Portal authentication is not connected in this environment yet. After sign-in you would continue to ${callbackUrl}.`,
    );
  }

  return (
    <div className="portal-login__panel-body">
      <ul className="portal-login__benefits" aria-label="Portal benefits">
        {PORTAL_LOGIN_LANDING.benefits.map((item) => (
          <li key={item.id} className="portal-login__benefit">
            <span className="portal-login__benefit-icon" aria-hidden>
              <Icon name={item.icon} size="sm" />
            </span>
            <span className="portal-login__benefit-copy">
              <span className="portal-login__benefit-title">{item.title}</span>
              <span className="portal-login__benefit-desc">
                {item.description}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div
        className="portal-login__mode"
        role="tablist"
        aria-label="Authentication mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signin"}
          className={cn(
            "portal-login__mode-btn",
            mode === "signin" && "portal-login__mode-btn--active",
          )}
          onClick={() => {
            setMode("signin");
            setNotice(null);
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          className={cn(
            "portal-login__mode-btn",
            mode === "signup" && "portal-login__mode-btn--active",
          )}
          onClick={() => {
            setMode("signup");
            setNotice(null);
          }}
        >
          Sign up
        </button>
      </div>

      <form className="portal-login__form" onSubmit={handleSubmit} noValidate>
        {mode === "signup" ? (
          <div className="portal-login__field">
            <label className="sr-only" htmlFor={nameId}>
              Full name
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              className="portal-login__input"
              required
            />
          </div>
        ) : null}

        <div className="portal-login__field">
          <label className="sr-only" htmlFor={emailId}>
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            className="portal-login__input"
            required
          />
        </div>

        <div className="portal-login__field portal-login__field--password">
          <label className="sr-only" htmlFor={passwordId}>
            Password
          </label>
          <input
            id={passwordId}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            placeholder="Password"
            className="portal-login__input portal-login__input--password"
            required
            minLength={8}
          />
          <button
            type="button"
            className="portal-login__password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            aria-controls={passwordId}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="portal-login__submit">
          {mode === "signin" ? "Sign in with email" : "Sign up with email"}
        </button>
      </form>

      {notice ? (
        <p className="portal-login__notice" role="status">
          {notice}
        </p>
      ) : null}

      <div className="portal-login__divider" aria-hidden>
        <span className="portal-login__divider-line" />
        <span className="portal-login__divider-label">or</span>
        <span className="portal-login__divider-line" />
      </div>

      <button
        type="button"
        className="portal-login__google"
        disabled
        aria-disabled="true"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="portal-login__google-icon">
          <path
            fill="#EA4335"
            d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6s4.1 9.2 9.2 9.2c5.3 0 8.9-3.7 8.9-8.9 0-.6-.1-1.1-.2-1.7H12z"
          />
        </svg>
        Continue with Google
      </button>

      <p className="portal-login__google-notice">
        {PORTAL_LOGIN_LANDING.googleNotice}
      </p>

      <p className="portal-login__footer">
        {PORTAL_LOGIN_LANDING.discoveryCta.prefix}{" "}
        <Link
          href={PORTAL_LOGIN_LANDING.discoveryCta.href}
          className="portal-login__footer-link"
        >
          {PORTAL_LOGIN_LANDING.discoveryCta.label}
        </Link>
      </p>
    </div>
  );
}
