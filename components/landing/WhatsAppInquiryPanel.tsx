"use client";

import { useMemo, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  Calendar,
  ClipboardCheck,
  Clock,
  FileCheck,
  Globe,
  MessageCircle,
  Receipt,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

import { openWhatsApp } from "@/lib/openWhatsApp";
import { CP_CARD } from "@/lib/contactPageTheme";
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

const OPTION_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  consultation: Calendar,
  fastPackage: Zap,
  audit: ClipboardCheck,
  pricing: Receipt,
};

const QUAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  business: Building2,
  goal: Target,
  website: Globe,
  budget: Wallet,
  timeline: Clock,
  content: FileCheck,
};

type WhatsAppInquiryPanelProps = {
  variant?: "full" | "compact" | "contact";
  /** Shorter panel on /contact — hides qualification grids and extra copy */
  simplified?: boolean;
  className?: string;
};

export default function WhatsAppInquiryPanel({
  variant = "full",
  simplified = false,
  className = "",
}: WhatsAppInquiryPanelProps) {
  const searchParams = useSearchParams();
  const isContact = variant === "contact";
  const contextualMessage = useMemo(() => {
    const service = searchParams.get("service");
    const base = resolveWhatsAppMessage({
      source: searchParams.get("source"),
      service,
      intent: searchParams.get("intent"),
    });
    return service ? appendServiceToMessage(base, service) : base;
  }, [searchParams]);

  const openInquiryWhatsApp = (key: WhatsAppMessageKey) => {
    const msg = key === "default" ? contextualMessage : WHATSAPP_MESSAGES[key];
    openWhatsApp({
      message: msg,
      source: key === "default" ? "inquiry-panel-contextual" : `inquiry-panel-${key}`,
      messageKey: key,
    });
  };

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {INSTANT_INQUIRY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => openInquiryWhatsApp(opt.id)}
            className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#128C7E] transition hover:bg-[#25D366]/20"
          >
            {opt.shortLabel}
          </button>
        ))}
      </div>
    );
  }

  const shell = isContact
    ? `${CP_CARD} p-5 sm:p-6 ${className}`
    : `rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 p-5 dark:border-[#25D366]/20 dark:bg-[#25D366]/8 sm:p-6 ${className}`;

  const titleClass = isContact
    ? "text-xs font-bold uppercase tracking-[0.14em] text-[#128C7E]"
    : "text-xs font-semibold uppercase tracking-[0.14em] text-[#128C7E] dark:text-[#25D366]";

  const optionCard = isContact
    ? "flex min-h-[5rem] flex-col justify-center border border-[#E5E7EB] bg-white p-4 text-left transition hover:border-[#25D366]/40"
    : "flex min-h-[4.25rem] flex-col justify-center rounded-xl border border-border-primary bg-bg-card px-4 py-3 text-left transition hover:border-[#25D366]/40 dark:border-dark-border-primary dark:bg-dark-bg-card";

  const qualCard = isContact
    ? "flex min-h-[4rem] flex-col justify-center border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2.5"
    : "flex min-h-[3.5rem] flex-col justify-center rounded-lg border border-border-primary bg-bg-card/80 px-3 py-2.5 dark:border-dark-border-primary dark:bg-dark-bg-card/80";

  return (
    <div className={shell}>
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center bg-[#25D366]/15 text-[#25D366] ${isContact ? "" : "rounded-xl"}`}
        >
          <MessageCircle className="size-5" aria-hidden />
        </span>
        <div>
          <p className={titleClass}>{INSTANT_INQUIRY_FLOW.title}</p>
          <p className={`mt-1.5 text-sm leading-relaxed ${isContact ? "text-[#6B7280]" : "text-text-secondary dark:text-dark-text-secondary"}`}>
            {INSTANT_INQUIRY_FLOW.subtitle}
          </p>
          <p className={`mt-1 text-xs ${isContact ? "text-[#9CA3AF]" : "text-text-tertiary dark:text-dark-text-tertiary"}`}>
            {INSTANT_INQUIRY_FLOW.responsePromise}
          </p>
        </div>
      </div>

      {simplified && isContact ? null : (
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INSTANT_INQUIRY_OPTIONS.map((opt) => {
          const Icon = OPTION_ICONS[opt.id] ?? MessageCircle;
          return (
            <button key={opt.id} type="button" onClick={() => openInquiryWhatsApp(opt.id)} className={optionCard}>
              <Icon className={`mb-2 size-4 ${isContact ? "text-[#25D366]" : "text-[#128C7E]"}`} aria-hidden />
              <p className={`text-sm font-semibold ${isContact ? "text-[#111827]" : "text-text-primary dark:text-dark-text-primary"}`}>
                {opt.label}
              </p>
              <p className={`mt-1 text-xs ${isContact ? "text-[#6B7280]" : "text-text-secondary dark:text-dark-text-secondary"}`}>
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
      )}

      <button
        type="button"
        onClick={() => openInquiryWhatsApp("default")}
        className={`mt-5 flex w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a] ${isContact ? "" : "rounded-xl shadow-sm"}`}
      >
        <MessageCircle className="size-4" aria-hidden />
        {CONSULTATION_WHATSAPP_CTA.button}
      </button>
      <p className={`mt-2 text-center text-xs ${isContact ? "text-[#9CA3AF]" : "text-text-tertiary dark:text-dark-text-tertiary"}`}>
        {CONSULTATION_WHATSAPP_CTA.microcopy}
      </p>

      {simplified ? null : (
      <>
      <div className={`mt-6 border-t pt-5 ${isContact ? "border-[#E5E7EB]" : "border-border-primary/60 dark:border-dark-border-primary/60"}`}>
        <p className={`text-sm font-semibold ${isContact ? "text-[#111827]" : "text-text-primary dark:text-dark-text-primary"}`}>
          {TRUST_WHATSAPP_COPY.headline}
        </p>
        <p className={`mt-2 text-xs leading-relaxed ${isContact ? "text-[#6B7280]" : "text-text-secondary dark:text-dark-text-secondary"}`}>
          {TRUST_WHATSAPP_COPY.body}
        </p>
        <ul className="mt-3 space-y-2">
          {TRUST_WHATSAPP_COPY.points.map((p) => (
            <li key={p} className={`flex items-start gap-2 text-xs ${isContact ? "text-[#6B7280]" : "text-text-secondary dark:text-dark-text-secondary"}`}>
              <span className="font-bold text-[#25D366]" aria-hidden>
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
        <p className={`mt-3 text-xs italic ${isContact ? "text-[#9CA3AF]" : "text-text-tertiary dark:text-dark-text-tertiary"}`}>
          {TRUST_WHATSAPP_COPY.founderLine}
        </p>
      </div>

      <div className="mt-5">
        <p className={`text-xs font-semibold uppercase tracking-wide ${isContact ? "text-[#9CA3AF]" : "text-text-tertiary dark:text-dark-text-tertiary"}`}>
          Include in your message (qualifies faster)
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {QUALIFICATION_QUESTIONS.map((q) => {
            const QIcon = QUAL_ICONS[q.id] ?? FileCheck;
            return (
              <li key={q.id} className={qualCard}>
                <div className="flex items-start gap-2">
                  <QIcon className="mt-0.5 size-3.5 shrink-0 text-[#4F46E5]" aria-hidden />
                  <div>
                    <p className={`text-xs font-semibold ${isContact ? "text-[#111827]" : "text-text-primary dark:text-dark-text-primary"}`}>
                      {q.question}
                    </p>
                    <p className={`mt-0.5 text-[11px] ${isContact ? "text-[#9CA3AF]" : "text-text-tertiary dark:text-dark-text-tertiary"}`}>
                      {q.example}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`mt-5 rounded-xl border p-4 ${isContact ? "border-[#E5E7EB] bg-[#FAFAFA]" : "border-border-primary bg-bg-card/60 dark:border-dark-border-primary dark:bg-dark-bg-card/60"}`}>
        <p className={`text-sm font-semibold ${isContact ? "text-[#111827]" : "text-text-primary dark:text-dark-text-primary"}`}>
          {FOUNDER_RESPONSE_COPY.headline}
        </p>
        <ol className={`mt-3 space-y-2 text-xs ${isContact ? "text-[#6B7280]" : "text-text-secondary dark:text-dark-text-secondary"}`}>
          {FOUNDER_RESPONSE_COPY.items.map((item, i) => (
            <li key={item} className="flex gap-2">
              <span className="font-semibold text-[#4F46E5]">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
        <p className={`mt-2 text-xs ${isContact ? "text-[#9CA3AF]" : "text-text-tertiary dark:text-dark-text-tertiary"}`}>
          {FOUNDER_RESPONSE_COPY.hinglishNote}
        </p>
      </div>
      </>
      )}
    </div>
  );
}
