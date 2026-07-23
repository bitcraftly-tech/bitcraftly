"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/typography";
import { trackLeadEvent } from "../analytics";
import { LEAD_INTENT_OPTIONS } from "../lead-funnel.config";
import {
  contactLeadFormSchema,
  type ContactLeadFormValues,
} from "../contact-form.schema";
import type { LeadFunnelDefaults } from "../types";
import { LeadHoneypotField } from "./LeadHoneypotField";
import {
  mapSubmitLeadFailureToUserMessage,
  submitLeadFromClient,
} from "../submit-lead.client";

interface ContactLeadFormProps {
  defaults?: LeadFunnelDefaults;
  headingId?: string;
  /** When incremented by channel CTAs, sync intent + focus the form. */
  intentFocusToken?: number;
}

const DISCOVERY_MESSAGE_PRESET =
  "I'd like to book a discovery call to discuss my project.\n\nGoals:\nTimeline:\nBudget (optional):";

const AUDIT_MESSAGE_PRESET =
  "I'd like a free website audit (speed, mobile UX, and conversion checklist).\n\nWebsite URL:\nMain problem:";

function resolveIntent(
  value: string | undefined,
): ContactLeadFormValues["intent"] {
  const match = LEAD_INTENT_OPTIONS.find((option) => option.value === value);
  return match?.value ?? "consultation";
}

export function ContactLeadForm({
  defaults,
  headingId = "contact-lead-form-heading",
  intentFocusToken = 0,
}: ContactLeadFormProps) {
  const formId = useId();
  const pathname = usePathname();
  const successRef = useRef<HTMLDivElement>(null);
  const submitErrorRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactLeadFormValues>({
    resolver: zodResolver(contactLeadFormSchema),
    defaultValues: {
      name: "",
      email: defaults?.email ?? "",
      phone: "",
      company: "",
      intent: resolveIntent(defaults?.intent),
      message: defaults?.service
        ? `Interested in: ${defaults.service}${defaults.budget ? `\nBudget: ${defaults.budget}` : ""}`
        : "",
      website: "",
    },
  });

  useEffect(() => {
    trackLeadEvent("form_view", {
      source: defaults?.source ?? "contact-form",
      intent: defaults?.intent ?? "consultation",
    });
  }, [defaults?.intent, defaults?.source]);

  useEffect(() => {
    if (!intentFocusToken || !defaults?.intent) return;

    const intent = resolveIntent(defaults.intent);
    setValue("intent", intent, { shouldDirty: true, shouldValidate: true });

    if (intent === "discovery") {
      setValue("message", DISCOVERY_MESSAGE_PRESET, { shouldDirty: true });
    } else if (intent === "audit") {
      setValue("message", AUDIT_MESSAGE_PRESET, { shouldDirty: true });
    }

    setSubmitted(false);
    setConfirmationSent(false);

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`${formId}-intent`)?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [intentFocusToken, defaults?.intent, formId, setValue]);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  useEffect(() => {
    if (submitError) {
      submitErrorRef.current?.focus();
    }
  }, [submitError]);

  async function onSubmit(values: ContactLeadFormValues) {
    setSubmitError(null);

    const result = await submitLeadFromClient({
      leadType: "contact",
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company,
      intent: values.intent,
      message: values.message,
      website: values.website,
      _honeypot: honeypot,
      source: defaults?.source ?? "contact-form",
      pagePath: pathname || "/contact",
    });

    if (!result.ok) {
      setSubmitError(mapSubmitLeadFailureToUserMessage(result));
      return;
    }

    trackLeadEvent("form_submit_success", {
      source: defaults?.source ?? "contact-form",
      intent: values.intent,
      has_phone: Boolean(values.phone),
      has_company: Boolean(values.company),
      has_website: Boolean(values.website),
    });

    setConfirmationSent(result.confirmationSent);
    setSubmitted(true);
    setHoneypot("");
    reset({
      name: "",
      email: "",
      phone: "",
      company: "",
      intent: "consultation",
      message: "",
      website: "",
    });
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="lead-funnel__success"
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <div className="lead-funnel__success-header">
          <span className="lead-funnel__success-icon" aria-hidden>
            <Icon name="check" size="sm" className="h-[16px] w-[16px]" />
          </span>
          <div className="lead-funnel__success-heading">
            <p className="lead-funnel__success-eyebrow">Submitted</p>
            <h3 className="lead-funnel__success-title">Message received</h3>
          </div>
        </div>

        <p className="lead-funnel__success-text">
          {confirmationSent
            ? "Thanks — we've sent a confirmation to your email. A Bitcraftly founder will reply within one business day. You can also continue on WhatsApp if you prefer a faster chat."
            : "Thanks — a Bitcraftly founder will reply within one business day. You can also continue on WhatsApp if you prefer a faster chat."}
        </p>

        <div className="lead-funnel__success-actions">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="lead-funnel__success-btn"
            onClick={() => {
              setSubmitted(false);
              setConfirmationSent(false);
            }}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="lead-funnel__form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby={headingId}
    >
      <LeadHoneypotField
        id={`${formId}-honeypot`}
        value={honeypot}
        onChange={setHoneypot}
      />

      {submitError ? (
        <div
          ref={submitErrorRef}
          className="lead-funnel__error lead-funnel__submit-error"
          role="alert"
          tabIndex={-1}
        >
          {submitError}
        </div>
      ) : null}

      <fieldset className="lead-funnel__fieldset">
        <legend className="lead-funnel__legend">Your details</legend>
        <div className="lead-funnel__form-grid">
          <div className="lead-funnel__field">
            <Label htmlFor={`${formId}-name`} required>
              Full name
            </Label>
            <input
              id={`${formId}-name`}
              type="text"
              autoComplete="name"
              placeholder="Jane Cooper"
              className="lead-funnel__input"
              aria-invalid={Boolean(errors.name) || undefined}
              aria-describedby={
                errors.name ? `${formId}-name-error` : undefined
              }
              {...register("name")}
            />
            {errors.name ? (
              <p
                id={`${formId}-name-error`}
                className="lead-funnel__error"
                role="alert"
              >
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="lead-funnel__field">
            <Label htmlFor={`${formId}-email`} required>
              Work email
            </Label>
            <input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              placeholder="jane@company.com"
              className="lead-funnel__input"
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              {...register("email")}
            />
            {errors.email ? (
              <p
                id={`${formId}-email-error`}
                className="lead-funnel__error"
                role="alert"
              >
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="lead-funnel__field">
            <Label htmlFor={`${formId}-phone`}>Phone / WhatsApp</Label>
            <input
              id={`${formId}-phone`}
              type="tel"
              autoComplete="tel"
              placeholder="+91…"
              className="lead-funnel__input"
              aria-invalid={Boolean(errors.phone) || undefined}
              aria-describedby={
                errors.phone ? `${formId}-phone-error` : undefined
              }
              {...register("phone")}
            />
            {errors.phone ? (
              <p
                id={`${formId}-phone-error`}
                className="lead-funnel__error"
                role="alert"
              >
                {errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="lead-funnel__field">
            <Label htmlFor={`${formId}-company`}>Company</Label>
            <input
              id={`${formId}-company`}
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc."
              className="lead-funnel__input"
              {...register("company")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="lead-funnel__fieldset">
        <legend className="lead-funnel__legend">Project details</legend>
        <div className="lead-funnel__form-grid">
          <div className="lead-funnel__field lead-funnel__field--full">
            <Label htmlFor={`${formId}-intent`} required>
              What do you need?
            </Label>
            <div className="lead-funnel__select-wrap">
              <select
                id={`${formId}-intent`}
                className="lead-funnel__input lead-funnel__select"
                aria-invalid={Boolean(errors.intent) || undefined}
                aria-describedby={
                  errors.intent ? `${formId}-intent-error` : undefined
                }
                {...register("intent")}
              >
                {LEAD_INTENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon
                name="chevron-down"
                size="sm"
                aria-hidden
                className="lead-funnel__select-icon h-[16px] w-[16px]"
              />
            </div>
            {errors.intent ? (
              <p
                id={`${formId}-intent-error`}
                className="lead-funnel__error"
                role="alert"
              >
                {errors.intent.message}
              </p>
            ) : null}
          </div>

          <div className="lead-funnel__field lead-funnel__field--full">
            <Label htmlFor={`${formId}-website`}>Website URL (optional)</Label>
            <input
              id={`${formId}-website`}
              type="url"
              inputMode="url"
              placeholder="https://"
              className="lead-funnel__input"
              {...register("website")}
            />
          </div>

          <div className="lead-funnel__field lead-funnel__field--full">
            <Label htmlFor={`${formId}-message`} required>
              How can we help?
            </Label>
            <textarea
              id={`${formId}-message`}
              rows={5}
              placeholder="Goals, timeline, constraints, or links that help us prepare…"
              className="lead-funnel__input lead-funnel__textarea"
              aria-invalid={Boolean(errors.message) || undefined}
              aria-describedby={
                errors.message ? `${formId}-message-error` : undefined
              }
              {...register("message")}
            />
            {errors.message ? (
              <p
                id={`${formId}-message-error`}
                className="lead-funnel__error"
                role="alert"
              >
                {errors.message.message}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      <div className="lead-funnel__form-actions">
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isSubmitting}
          disabled={isSubmitting}
          fullWidth
          className="lead-funnel__submit"
          iconRight={
            <Icon name="arrow-right" size="sm" className="h-[14px] w-[14px]" />
          }
        >
          Send message
        </Button>
        <ul className="lead-funnel__form-trust" aria-label="What happens next">
          <li className="lead-funnel__form-trust-item">
            <Icon
              name="check"
              size="sm"
              aria-hidden
              className="h-[13px] w-[13px] shrink-0 text-primary"
            />
            <span>Founder-led reply in 1 business day</span>
          </li>
          <li className="lead-funnel__form-trust-item">
            <Icon
              name="shield"
              size="sm"
              aria-hidden
              className="h-[13px] w-[13px] shrink-0 text-primary"
            />
            <span>No spam</span>
          </li>
        </ul>
      </div>
    </form>
  );
}
