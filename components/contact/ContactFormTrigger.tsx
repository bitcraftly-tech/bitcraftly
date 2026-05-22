"use client";

import { ArrowRight } from "lucide-react";

import { CP_BTN_PRIMARY, CP_CARD } from "@/lib/contactPageTheme";
import { CONTACT_FORM } from "@/lib/leadGen";

type ContactFormTriggerProps = {
  onOpen: () => void;
  requestType?: string;
};

export default function ContactFormTrigger({ onOpen, requestType }: ContactFormTriggerProps) {
  const serviceTag = requestType ? requestType.replace(/\s*Development$/i, "").trim() : "";

  return (
    <div id="contact-form" className={`scroll-mt-28 ${CP_CARD} p-5 sm:p-6`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F46E5]">Written enquiry</p>
      <h2 className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-[#111827] sm:text-2xl">
        Tell us about your project
      </h2>
      <p className="mt-1.5 text-sm text-[#6B7280]">{CONTACT_FORM.subheadline}</p>
      {serviceTag ? (
        <span className="mt-2 inline-block border border-[#E5E7EB] bg-[#FAFAFA] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
          {serviceTag}
        </span>
      ) : null}

      <button type="button" onClick={onOpen} className={`mt-5 ${CP_BTN_PRIMARY}`}>
        Open enquiry form
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </div>
  );
}
