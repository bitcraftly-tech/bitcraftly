"use client";

import type { ComponentType, FormEvent, ReactNode } from "react";
import { Building2, MessageSquare, User } from "lucide-react";

import { CP_BTN_PRIMARY, CP_CARD, CP_INPUT } from "@/lib/contactPageTheme";
import { BUDGET_OPTIONS, CONTACT_FORM, TIMELINE_OPTIONS } from "@/lib/leadGen";
import { whatsappUrl } from "@/lib/constants";

const MODAL_INPUT =
  "h-11 w-full min-w-0 rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/12";

const FIELD_WRAP = "flex min-w-0 flex-col gap-1.5";

function inputClass(hasError?: string, isModal?: boolean) {
  const base = isModal ? MODAL_INPUT : CP_INPUT;
  return hasError ? `${base} border-red-500 focus:border-red-500 focus:ring-red-500/12` : base;
}

type FormValues = {
  fullName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  websiteUrl: string;
  budgetRange: string;
  timeline: string;
  message: string;
  source: string;
};

type FieldName = keyof FormValues;
type FieldErrors = Partial<Record<FieldName, string>>;

type ContactProjectFormProps = {
  values: FormValues;
  errors: FieldErrors;
  requestType: string;
  submitLabel: string;
  whatsappMessage: string;
  isSubmitting: boolean;
  businessTypes: readonly string[];
  sources: readonly string[];
  onChange: (field: FieldName, value: string) => void;
  onBlur: (field: FieldName) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  layout?: "inline" | "modal";
  variant?: "full" | "quote";
  formEyebrow?: string;
  formTitle?: string;
  formSubheadline?: string;
};

function FormSection({
  step,
  title,
  hint,
  icon: Icon,
  children,
  isModal,
}: {
  step: string;
  title: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  isModal?: boolean;
}) {
  if (isModal) {
    return (
      <section className="border-b border-[#F3F4F6] pb-7 last:border-b-0 last:pb-0">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
            {step}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Icon className="size-4 shrink-0 text-[#4F46E5]" aria-hidden />
              <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
            </div>
            <p className="mt-0.5 text-xs text-[#9CA3AF]">{hint}</p>
          </div>
        </div>
        <div className="space-y-5">{children}</div>
      </section>
    );
  }

  return (
    <section className="border-b border-[#F3F4F6] pb-7 last:border-b-0 last:pb-0">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
          {step}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-[#4F46E5]" aria-hidden />
            <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
          </div>
          <p className="mt-0.5 text-xs text-[#9CA3AF]">{hint}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export default function ContactProjectForm({
  values,
  errors,
  requestType,
  submitLabel,
  whatsappMessage,
  isSubmitting,
  businessTypes,
  sources,
  onChange,
  onBlur,
  onSubmit,
  layout = "inline",
  variant = "full",
  formEyebrow = "Written enquiry",
  formTitle = "Tell us about your project",
  formSubheadline = CONTACT_FORM.subheadline,
}: ContactProjectFormProps) {
  const isModal = layout === "modal";
  const isQuote = variant === "quote";
  const serviceTag = requestType ? requestType.replace(/\s*Development$/i, "").trim() : "";
  const labelClass = "text-sm font-medium text-[#374151]";

  const quoteFormBody = (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={FIELD_WRAP}>
          <label className={labelClass} htmlFor="fullName">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            autoComplete="name"
            placeholder="Your name"
            value={values.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            onBlur={() => onBlur("fullName")}
            className={inputClass(errors.fullName, isModal)}
          />
          {errors.fullName ? <p className="text-xs text-red-600">{errors.fullName}</p> : null}
        </div>
        <div className={FIELD_WRAP}>
          <label className={labelClass} htmlFor="phone">
            WhatsApp / phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="10-digit number"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            className={inputClass(errors.phone, isModal)}
          />
          {errors.phone ? <p className="text-xs text-red-600">{errors.phone}</p> : null}
        </div>
      </div>
      <div className={FIELD_WRAP}>
        <label className={labelClass} htmlFor="businessName">
          Business name <span className="text-red-500">*</span>
        </label>
        <input
          id="businessName"
          placeholder="Shop, clinic, brand, or company name"
          value={values.businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
          onBlur={() => onBlur("businessName")}
          className={inputClass(errors.businessName, isModal)}
        />
        {errors.businessName ? <p className="text-xs text-red-600">{errors.businessName}</p> : null}
      </div>
      <div className={FIELD_WRAP}>
        <label className={labelClass} htmlFor="message">
          Anything else? <span className="font-normal text-[#9CA3AF]">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="City, content ready yes/no, deadline…"
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          onBlur={() => onBlur("message")}
          className={`${inputClass(errors.message, isModal)} min-h-[88px] resize-y rounded-lg py-3`}
        />
        {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
      </div>
    </div>
  );

  const optionalClass = "font-normal text-[#9CA3AF]";

  const formBody = isQuote ? (
    quoteFormBody
  ) : (
    <>
      <FormSection
        step="01"
        title="Contact details"
        hint="How we reach you for consultation or audit."
        icon={User}
        isModal={isModal}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={FIELD_WRAP}>
            <label className={labelClass} htmlFor="fullName">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              autoComplete="name"
              placeholder="Your name"
              value={values.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              onBlur={() => onBlur("fullName")}
              className={inputClass(errors.fullName, isModal)}
            />
            {errors.fullName ? <p className="text-xs text-red-600">{errors.fullName}</p> : null}
          </div>
          <div className={FIELD_WRAP}>
            <label className={labelClass} htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="10-digit Indian number"
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              onBlur={() => onBlur("phone")}
              className={inputClass(errors.phone, isModal)}
            />
            {errors.phone ? <p className="text-xs text-red-600">{errors.phone}</p> : null}
          </div>
        </div>
        <div className={FIELD_WRAP}>
          <label className={labelClass} htmlFor="email">
            Email <span className={optionalClass}>(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => onBlur("email")}
            className={inputClass(errors.email, isModal)}
          />
          {errors.email ? <p className="text-xs text-red-600">{errors.email}</p> : null}
        </div>
      </FormSection>

      <FormSection
        step="02"
        title="Your business"
        hint="Industry and brand — helps us tailor the reply."
        icon={Building2}
        isModal={isModal}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={FIELD_WRAP}>
            <label className={labelClass} htmlFor="businessName">
              Business name <span className="text-red-500">*</span>
            </label>
            <input
              id="businessName"
              placeholder="Brand or company name"
              value={values.businessName}
              onChange={(e) => onChange("businessName", e.target.value)}
              onBlur={() => onBlur("businessName")}
              className={inputClass(errors.businessName, isModal)}
            />
            {errors.businessName ? <p className="text-xs text-red-600">{errors.businessName}</p> : null}
          </div>
          <div className={FIELD_WRAP}>
            <label className={labelClass} htmlFor="businessType">
              Business type
            </label>
            <select
              id="businessType"
              value={values.businessType}
              onChange={(e) => onChange("businessType", e.target.value)}
              onBlur={() => onBlur("businessType")}
              className={inputClass(errors.businessType, isModal)}
            >
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={FIELD_WRAP}>
          <label className={labelClass} htmlFor="websiteUrl">
            Current website <span className={optionalClass}>(optional)</span>
          </label>
          <input
            id="websiteUrl"
            type="url"
            placeholder="https://yourbusiness.com"
            value={values.websiteUrl}
            onChange={(e) => onChange("websiteUrl", e.target.value)}
            className={inputClass(undefined, isModal)}
          />
        </div>
      </FormSection>

      <FormSection
        step="03"
        title="Project scope"
        hint="Budget, timeline, and what you need built."
        icon={MessageSquare}
        isModal={isModal}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={FIELD_WRAP}>
            <label className={labelClass} htmlFor="budgetRange">
              Budget range
            </label>
            <select
              id="budgetRange"
              value={values.budgetRange}
              onChange={(e) => onChange("budgetRange", e.target.value)}
              className={inputClass(undefined, isModal)}
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className={FIELD_WRAP}>
            <label className={labelClass} htmlFor="timeline">
              Timeline
            </label>
            <select
              id="timeline"
              value={values.timeline}
              onChange={(e) => onChange("timeline", e.target.value)}
              className={inputClass(undefined, isModal)}
            >
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={FIELD_WRAP}>
          <label className={labelClass} htmlFor="message">
            What do you need?
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="e.g. New business website, redesign, ecommerce, AI chatbot, startup MVP…"
            value={values.message}
            onChange={(e) => onChange("message", e.target.value)}
            onBlur={() => onBlur("message")}
            className={`${inputClass(errors.message, isModal)} min-h-[120px] resize-y rounded-lg py-3`}
          />
          {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
        </div>
        <div className={FIELD_WRAP}>
          <label className={labelClass} htmlFor="source">
            How did you hear about us?
          </label>
          <select
            id="source"
            value={values.source}
            onChange={(e) => onChange("source", e.target.value)}
            onBlur={() => onBlur("source")}
            className={inputClass(errors.source, isModal)}
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </FormSection>
    </>
  );

  const formFooter = (
    <div className={isQuote ? "pt-2" : "border-t border-[#F3F4F6] pt-6"}>
      <p className="text-xs leading-relaxed text-[#6B7280]">
        {isQuote
          ? "Same day reply on WhatsApp or call · written quote before payment"
          : "Submit once — same day reply on WhatsApp or call. No spam, no outsourced sales team."}
      </p>
      <button type="submit" disabled={isSubmitting} className={`mt-4 ${CP_BTN_PRIMARY}`}>
        {isSubmitting ? "Sending…" : submitLabel}
      </button>
      <p className="mt-3 text-xs text-[#9CA3AF]">{CONTACT_FORM.privacyNote}</p>
      {isQuote ? null : (
        <p className="mt-3 text-center text-sm">
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#4F46E5] hover:underline"
          >
            {CONTACT_FORM.whatsappAlternative} →
          </a>
        </p>
      )}
    </div>
  );

  if (isModal) {
    return (
      <form id="contact-enquiry-form" onSubmit={onSubmit} noValidate className="min-w-0 space-y-7">
        {formBody}
      </form>
    );
  }

  return (
    <div id="contact-form" className={`w-full scroll-mt-28 ${CP_CARD} overflow-hidden`}>
      <div className="flex flex-col gap-3 border-b border-[#F3F4F6] px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:py-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F46E5]">{formEyebrow}</p>
          <h2 className="mt-1.5 font-[var(--font-playfair)] text-xl font-semibold text-[#111827] sm:text-2xl">{formTitle}</h2>
          <p className="mt-1.5 text-xs text-[#6B7280]">{formSubheadline}</p>
        </div>
        {serviceTag ? (
          <span className="inline-flex shrink-0 items-center border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#4F46E5]">
            {serviceTag}
          </span>
        ) : null}
      </div>
      <form onSubmit={onSubmit} noValidate className={`px-5 py-6 sm:px-6 sm:py-7 ${isQuote ? "space-y-5" : "space-y-7"}`}>
        {formBody}
        {formFooter}
      </form>
    </div>
  );
}
