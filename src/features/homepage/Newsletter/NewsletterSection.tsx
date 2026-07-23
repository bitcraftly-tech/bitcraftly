"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { LeadHoneypotField } from "@/features/lead-funnel/components/LeadHoneypotField";
import {
  mapSubmitLeadFailureToUserMessage,
  submitLeadFromClient,
} from "@/features/lead-funnel/submit-lead.client";
import { trackLeadEvent } from "@/features/lead-funnel/analytics";
import {
  NEWSLETTER_COPY,
  NEWSLETTER_TRUST_ITEMS,
} from "./newsletter.constants";
/* newsletter.css loaded post-paint via MarketingDeferredCss */

type FormStatus = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const formId = useId();
  const pathname = usePathname();
  const headingId = "newsletter-section-heading";
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "error" && errorMessage) {
      errorRef.current?.focus();
    }
  }, [errorMessage, status]);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

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

    const result = await submitLeadFromClient({
      leadType: "newsletter",
      email: trimmed,
      _honeypot: honeypot,
      source: "newsletter",
      pagePath: pathname || "/",
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(mapSubmitLeadFailureToUserMessage(result));
      return;
    }

    trackLeadEvent("form_submit_success", {
      source: "newsletter",
      page_path: pathname || "/",
    });

    setConfirmationSent(result.confirmationSent);
    setStatus("success");
    setEmail("");
    setHoneypot("");
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const successMessage = confirmationSent
    ? NEWSLETTER_COPY.successMessageWithConfirmation
    : NEWSLETTER_COPY.successMessage;

  return (
    <section
      id="newsletter"
      aria-labelledby={headingId}
      className={cn(
        "newsletter-section footer-surface border-t border-b border-[var(--inverse-border)]",
      )}
    >
      <Container size="xl">
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
              "leading-[var(--line-height-snug)] md:whitespace-nowrap",
            )}
          >
            {NEWSLETTER_COPY.description}
          </p>

          {isSuccess ? (
            <p
              ref={successRef}
              className="newsletter-success m-0"
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              {successMessage}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              aria-busy={isLoading}
              className={cn(
                "newsletter-form-shell flex w-full flex-col overflow-hidden rounded-[var(--token-radius-xl)] p-0",
                "sm:h-[48px] sm:flex-row sm:items-stretch",
              )}
            >
              <LeadHoneypotField
                id={`${formId}-honeypot`}
                value={honeypot}
                onChange={setHoneypot}
              />

              <label htmlFor="newsletter-section-email" className="sr-only">
                {NEWSLETTER_COPY.emailLabel}
              </label>

              <div className="relative flex min-h-[44px] min-w-0 flex-1 items-center sm:min-h-0 sm:block">
                <span
                  className="pointer-events-none absolute top-1/2 left-[8px] -translate-y-1/2 text-muted sm:left-[12px]"
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
                    "h-[44px] w-full min-w-0 sm:h-full",
                    "rounded-none",
                    "py-0 pr-[8px] pl-[32px] sm:pr-[10px] sm:pl-[36px]",
                    "font-sans text-[13px] text-left leading-[44px] sm:leading-normal",
                    "disabled:cursor-not-allowed disabled:opacity-70",
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "newsletter-subscribe group/newsletter",
                  "inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-[6px] sm:h-full sm:w-auto",
                  "rounded-none rounded-b-[calc(var(--token-radius-xl)-1px)] px-[5px] sm:px-[16px]",
                  "sm:rounded-b-none sm:rounded-r-[calc(var(--token-radius-xl)-1px)]",
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
                    name="arrow-up-right"
                    size="sm"
                    aria-hidden
                    className="h-[14px] w-[14px] transition-transform duration-[var(--duration-fast)] group-hover/newsletter:translate-x-[2px] group-hover/newsletter:-translate-y-[2px]"
                  />
                ) : null}
              </button>
            </form>
          )}

          {errorMessage ? (
            <p
              ref={errorRef}
              id="newsletter-section-error"
              className="newsletter-error m-0 mt-[8px]"
              role="alert"
              tabIndex={-1}
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
