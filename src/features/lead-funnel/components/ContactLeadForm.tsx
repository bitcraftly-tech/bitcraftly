"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/typography";
import { trackLeadEvent } from "../analytics";
import { LEAD_INTENT_OPTIONS } from "../lead-funnel.config";
import {
  contactLeadFormSchema,
  type ContactLeadFormValues,
} from "../contact-form.schema";
import type { LeadFunnelDefaults } from "../types";

interface ContactLeadFormProps {
  defaults?: LeadFunnelDefaults;
  headingId?: string;
}

function resolveIntent(
  value: string | undefined,
): ContactLeadFormValues["intent"] {
  const match = LEAD_INTENT_OPTIONS.find((option) => option.value === value);
  return match?.value ?? "consultation";
}

export function ContactLeadForm({
  defaults,
  headingId = "contact-lead-form-heading",
}: ContactLeadFormProps) {
  const formId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
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
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  async function onSubmit(values: ContactLeadFormValues) {
    try {
      // Architecture-ready: replace with API / server action when backend is wired.
      await new Promise((resolve) => setTimeout(resolve, 450));

      trackLeadEvent("form_submit_success", {
        source: defaults?.source ?? "contact-form",
        intent: values.intent,
        has_phone: Boolean(values.phone),
        has_company: Boolean(values.company),
        has_website: Boolean(values.website),
      });

      setSubmitted(true);
      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        intent: "consultation",
        message: "",
        website: "",
      });
    } catch {
      trackLeadEvent("form_submit_error", {
        source: defaults?.source ?? "contact-form",
        intent: values.intent,
      });
    }
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
        <h3 className="lead-funnel__success-title">Message received</h3>
        <p className="lead-funnel__success-text">
          Thanks — a Bitcraftly founder will reply within one business day. You
          can also continue on WhatsApp if you prefer a faster chat.
        </p>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
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
      <div className="lead-funnel__form-grid">
        <div className="lead-funnel__field">
          <Label htmlFor={`${formId}-name`} required>
            Full name
          </Label>
          <input
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            className="lead-funnel__input"
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={
              errors.name ? `${formId}-name-error` : undefined
            }
            {...register("name")}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="lead-funnel__error" role="alert">
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
            className="lead-funnel__input"
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
            {...register("email")}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="lead-funnel__error" role="alert">
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
            className="lead-funnel__input"
            aria-invalid={Boolean(errors.phone) || undefined}
            aria-describedby={
              errors.phone ? `${formId}-phone-error` : undefined
            }
            {...register("phone")}
          />
          {errors.phone ? (
            <p id={`${formId}-phone-error`} className="lead-funnel__error" role="alert">
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
            className="lead-funnel__input"
            {...register("company")}
          />
        </div>

        <div className="lead-funnel__field lead-funnel__field--full">
          <Label htmlFor={`${formId}-intent`} required>
            What do you need?
          </Label>
          <select
            id={`${formId}-intent`}
            className="lead-funnel__input"
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
          {errors.intent ? (
            <p id={`${formId}-intent-error`} className="lead-funnel__error" role="alert">
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

      <div className="lead-funnel__form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Send message
        </Button>
        <p className="lead-funnel__form-note">
          No spam. Founder-led reply within one business day.
        </p>
      </div>
    </form>
  );
}
