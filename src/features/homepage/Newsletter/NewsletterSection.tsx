"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import {
  NEWSLETTER_COPY,
  NEWSLETTER_TRUST_ITEMS,
} from "./newsletter.constants";
import "./newsletter.css";
import "@/features/homepage/Footer/footer.css";

type FormStatus = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const router = useRouter();
  const headingId = "newsletter-section-heading";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Enter a valid work email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    // Brief loading state, then route to contact with prefilled email.
    await new Promise((resolve) => {
      window.setTimeout(resolve, 450);
    });

    setStatus("success");
    router.push(`/contact?email=${encodeURIComponent(trimmed)}&source=newsletter`);
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <section
      id="newsletter"
      aria-labelledby={headingId}
      className={cn(
        "footer-surface border-t border-b border-[var(--inverse-border)]",
        "py-[16px]",
      )}
    >
      <Container
        size="xl"
        className="max-w-[var(--container-xl)] px-[var(--space-4)]"
      >
        <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
          <p
            id={headingId}
            className={cn(
              "m-0 mb-[6px]",
              "font-sans text-[length:var(--font-size-lg)] font-[var(--font-weight-semibold)]",
              "leading-[var(--line-height-snug)] text-inverse-foreground",
            )}
          >
            {NEWSLETTER_COPY.title}
          </p>

          <p
            className={cn(
              "footer-muted m-0 mb-[var(--space-2)]",
              "font-sans text-[length:var(--font-size-sm)] font-[var(--font-weight-normal)]",
              "leading-[var(--line-height-snug)] sm:whitespace-nowrap",
            )}
          >
            {NEWSLETTER_COPY.description}
          </p>

          {isSuccess ? (
            <p
              className="newsletter-success m-0"
              role="status"
              aria-live="polite"
            >
              {NEWSLETTER_COPY.successMessage}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              aria-busy={isLoading}
              className="newsletter-form-shell flex h-[48px] w-full items-stretch overflow-hidden rounded-[var(--token-radius-xl)] p-0"
            >
              <label htmlFor="newsletter-section-email" className="sr-only">
                {NEWSLETTER_COPY.emailLabel}
              </label>

              <div className="relative min-w-0 flex-1">
                <span
                  className="pointer-events-none absolute top-1/2 left-[12px] -translate-y-1/2 text-muted"
                  aria-hidden
                >
                  <Icon name="mail" size="sm" className="h-[15px] w-[15px]" />
                </span>
                <input
                  id="newsletter-section-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  disabled={isLoading}
                  aria-invalid={status === "error"}
                  aria-describedby={
                    errorMessage ? "newsletter-section-error" : undefined
                  }
                  placeholder={NEWSLETTER_COPY.emailPlaceholder}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage(null);
                    }
                  }}
                  className={cn(
                    "newsletter-input",
                    "h-full w-full min-w-0",
                    "rounded-none",
                    "py-0 pr-[10px] pl-[36px]",
                    "font-sans text-[13px] text-left",
                    "disabled:cursor-not-allowed disabled:opacity-70",
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "newsletter-subscribe group/newsletter",
                  "inline-flex h-full shrink-0 items-center justify-center gap-[6px]",
                  "rounded-none rounded-r-[calc(var(--token-radius-xl)-1px)] px-[16px]",
                  "border-0 font-sans text-[13px] font-[var(--font-weight-semibold)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-80",
                )}
              >
                {isLoading
                  ? NEWSLETTER_COPY.loadingLabel
                  : NEWSLETTER_COPY.submitLabel}
                {!isLoading ? (
                  <Icon
                    name="arrow-right"
                    size="sm"
                    aria-hidden
                    className="h-[14px] w-[14px] transition-transform duration-[var(--duration-fast)] group-hover/newsletter:translate-x-[2px]"
                  />
                ) : null}
              </button>
            </form>
          )}

          {errorMessage ? (
            <p
              id="newsletter-section-error"
              className="newsletter-error m-0 mt-[8px]"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}

          <ul
            className={cn(
              "mt-[var(--space-2)] flex flex-wrap items-center justify-center",
              "gap-x-[var(--space-2)] gap-y-[var(--space-1)]",
            )}
          >
            {NEWSLETTER_TRUST_ITEMS.map((item) => (
              <li
                key={item}
                className={cn(
                  "inline-flex items-center gap-[5px]",
                  "font-sans text-[length:var(--font-size-xs)] font-[var(--font-weight-normal)]",
                  "leading-none text-inverse-muted",
                )}
              >
                <Icon
                  name="check"
                  size="sm"
                  aria-hidden
                  className="h-[11px] w-[11px] text-primary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
