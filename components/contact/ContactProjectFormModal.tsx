"use client";

import { useCallback, useEffect, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";

import ContactProjectForm from "@/components/contact/ContactProjectForm";
import { whatsappUrl } from "@/lib/constants";
import { CP_BTN_PRIMARY } from "@/lib/contactPageTheme";
import { CONTACT_FORM } from "@/lib/leadGen";

export type ContactFormModalProps = {
  open: boolean;
  onClose: () => void;
  values: Parameters<typeof ContactProjectForm>[0]["values"];
  errors: Parameters<typeof ContactProjectForm>[0]["errors"];
  requestType: string;
  submitLabel: string;
  whatsappMessage: string;
  isSubmitting: boolean;
  businessTypes: readonly string[];
  sources: readonly string[];
  onChange: Parameters<typeof ContactProjectForm>[0]["onChange"];
  onBlur: Parameters<typeof ContactProjectForm>[0]["onBlur"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ContactProjectFormModal({
  open,
  onClose,
  requestType,
  submitLabel,
  whatsappMessage,
  isSubmitting,
  onSubmit,
  ...formProps
}: ContactFormModalProps) {
  const reduceMotion = useReducedMotion();
  const serviceTag = requestType ? requestType.replace(/\s*Development$/i, "").trim() : "";

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#111827]/40 backdrop-blur-[2px]"
            aria-label="Close enquiry form"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-[#E5E7EB] bg-white shadow-[0_24px_64px_rgba(17,24,39,0.14)] sm:max-w-3xl sm:rounded-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — matches written enquiry mockup */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#F3F4F6] px-5 py-5 sm:px-6 sm:py-6">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F46E5]">Written enquiry</p>
                <h2
                  id="contact-form-modal-title"
                  className="mt-1.5 font-[var(--font-playfair)] text-xl font-semibold text-[#111827] sm:text-2xl"
                >
                  Tell us about your project
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">{CONTACT_FORM.subheadline}</p>
              </div>
              <div className="flex shrink-0 items-start gap-2">
                {serviceTag ? (
                  <span className="hidden border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#4F46E5] sm:inline-flex">
                    {serviceTag}
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-9 items-center justify-center rounded-lg text-[#9CA3AF] transition hover:bg-[#F9FAFB] hover:text-[#111827]"
                  aria-label="Close"
                >
                  <X className="size-5" strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            </div>

            {/* Scrollable form */}
            <div className="contact-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6">
              <ContactProjectForm
                {...formProps}
                requestType={requestType}
                submitLabel={submitLabel}
                whatsappMessage={whatsappMessage}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
                layout="modal"
              />
            </div>

            {/* Sticky footer — purple CTA + privacy + WhatsApp */}
            <div className="shrink-0 border-t border-[#F3F4F6] bg-white px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-xs leading-relaxed text-[#6B7280]">
                Submit once — we reply same day on WhatsApp or call. No spam, no outsourced sales team.
              </p>
              <button
                type="submit"
                form="contact-enquiry-form"
                disabled={isSubmitting}
                className={`mt-4 ${CP_BTN_PRIMARY}`}
              >
                {isSubmitting ? "Sending…" : submitLabel}
                {!isSubmitting ? <ArrowRight className="size-4" aria-hidden /> : null}
              </button>
              <p className="mt-3 text-center text-xs text-[#9CA3AF]">{CONTACT_FORM.privacyNote}</p>
              <p className="mt-3 text-center text-sm">
                <a
                  href={whatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 font-semibold text-[#4F46E5] hover:underline"
                >
                  <span className="flex size-6 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10">
                    <MessageCircle className="size-3.5 text-[#25D366]" aria-hidden />
                  </span>
                  {CONTACT_FORM.whatsappAlternative} →
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
