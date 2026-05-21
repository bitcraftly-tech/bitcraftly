"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { whatsappUrl } from "@/lib/constants";
import {
  CONSULTATION_WHATSAPP_CTA,
  FOUNDER_RESPONSE_COPY,
  INSTANT_INQUIRY_FLOW,
  INSTANT_INQUIRY_OPTIONS,
  QUALIFICATION_QUESTIONS,
  TRUST_WHATSAPP_COPY,
  WHATSAPP_MESSAGES,
  appendServiceToMessage,
  resolveWhatsAppMessage,
  type WhatsAppMessageKey,
} from "@/lib/whatsappFunnel";

type WhatsAppInquiryPanelProps = {
  variant?: "full" | "compact";
  className?: string;
};

export default function WhatsAppInquiryPanel({ variant = "full", className = "" }: WhatsAppInquiryPanelProps) {
  const searchParams = useSearchParams();
  const contextualMessage = useMemo(() => {
    const service = searchParams.get("service");
    const base = resolveWhatsAppMessage({
      source: searchParams.get("source"),
      service,
      intent: searchParams.get("intent"),
    });
    return service ? appendServiceToMessage(base, service) : base;
  }, [searchParams]);

  const openWhatsApp = (key: WhatsAppMessageKey) => {
    const msg = key === "default" ? contextualMessage : WHATSAPP_MESSAGES[key];
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
  };

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {INSTANT_INQUIRY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => openWhatsApp(opt.id)}
            className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#128C7E] transition hover:bg-[#25D366]/20 dark:text-[#25D366]"
          >
            {opt.shortLabel}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 p-5 dark:border-[#25D366]/20 dark:bg-[#25D366]/8 sm:p-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#128C7E] dark:text-[#25D366]">{INSTANT_INQUIRY_FLOW.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{INSTANT_INQUIRY_FLOW.subtitle}</p>
      <p className="mt-2 text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary">{INSTANT_INQUIRY_FLOW.responsePromise}</p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {INSTANT_INQUIRY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => openWhatsApp(opt.id)}
            className="rounded-xl border border-border-primary bg-bg-card px-4 py-3 text-left transition hover:border-[#25D366]/40 dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{opt.label}</p>
            <p className="mt-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">{opt.description}</p>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => window.open(whatsappUrl(contextualMessage), "_blank", "noopener,noreferrer")}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a] sm:w-auto"
      >
        {CONSULTATION_WHATSAPP_CTA.button}
      </button>
      <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">{CONSULTATION_WHATSAPP_CTA.microcopy}</p>

      <div className="mt-6 border-t border-border-primary/60 pt-5 dark:border-dark-border-primary/60">
        <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{TRUST_WHATSAPP_COPY.headline}</p>
        <p className="mt-2 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{TRUST_WHATSAPP_COPY.body}</p>
        <ul className="mt-3 space-y-1.5">
          {TRUST_WHATSAPP_COPY.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
              <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                ✔
              </span>
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs italic text-text-tertiary dark:text-dark-text-tertiary">{TRUST_WHATSAPP_COPY.founderLine}</p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
          Include in your message (qualifies faster)
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {QUALIFICATION_QUESTIONS.map((q) => (
            <li key={q.id} className="rounded-lg border border-border-primary bg-bg-card/80 px-3 py-2 dark:border-dark-border-primary dark:bg-dark-bg-card/80">
              <p className="text-xs font-semibold text-text-primary dark:text-dark-text-primary">{q.question}</p>
              <p className="text-[11px] text-text-tertiary dark:text-dark-text-tertiary">{q.example}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-border-primary bg-bg-card/60 p-4 dark:border-dark-border-primary dark:bg-dark-bg-card/60">
        <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{FOUNDER_RESPONSE_COPY.headline}</p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-xs text-text-secondary dark:text-dark-text-secondary">
          {INSTANT_INQUIRY_FLOW.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">{FOUNDER_RESPONSE_COPY.hinglishNote}</p>
      </div>
    </div>
  );
}
