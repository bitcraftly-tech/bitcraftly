"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import ContactFormTrigger from "@/components/contact/ContactFormTrigger";
import ContactMethodCards from "@/components/contact/ContactMethodCards";
import ContactProjectForm from "@/components/contact/ContactProjectForm";
import { ContactProjectFormModal } from "@/components/contact/ContactProjectFormModal";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactWhatsAppCompact from "@/components/contact/ContactWhatsAppCompact";
import MarketingSectionLink from "@/components/landing/MarketingSectionLink";
import WhatsAppInquiryPanel from "@/components/landing/WhatsAppInquiryPanel";
import { CONTAINER } from "@/lib/constants";
import { getContactModeCopy, getContactPageMode, type ContactPageMode } from "@/lib/contactPageModes";
import { CP_PAGE } from "@/lib/contactPageTheme";
import {
  BUDGET_OPTIONS,
  CONTACT_FORM,
  TIMELINE_OPTIONS,
} from "@/lib/leadGen";
import { trackContactFormSubmit } from "@/lib/analytics";
import { submitContactForm } from "@/lib/contact/contactClient";
import { logServerEvent } from "@/lib/logServerEvent";
import { resolveWhatsAppMessage, WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

type ContactFormValues = {
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

type FieldName = keyof ContactFormValues;
type FieldErrors = Partial<Record<FieldName, string>>;

const businessTypes = ["Restaurant", "Clinic", "Gym", "Shop", "Startup", "SaaS", "Coach", "Agency", "Salon", "Other"];
const sources = [
  "WhatsApp",
  "Google",
  "Friend",
  "Social Media",
  "Website Audit CTA",
  "Free Consultation CTA",
  "WhatsApp Floating CTA",
  "Pricing Card CTA",
  "Pricing Compare CTA",
  "Fast Package CTA",
  "Smart Parking CTA",
  "Other",
];

const initialValues: ContactFormValues = {
  fullName: "",
  businessName: "",
  businessType: "Startup",
  phone: "",
  email: "",
  websiteUrl: "",
  budgetRange: BUDGET_OPTIONS[0],
  timeline: TIMELINE_OPTIONS[3],
  message: "",
  source: "WhatsApp",
};

export default function ContactContent() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestType, setRequestType] = useState<string>("");
  const [submitLabel, setSubmitLabel] = useState<string>(CONTACT_FORM.submitCta);
  const [whatsappMessage, setWhatsappMessage] = useState(WHATSAPP_MESSAGES.consultation);
  const [formOpen, setFormOpen] = useState(false);
  const [pageMode, setPageMode] = useState<ContactPageMode>("default");

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const modeCopy = useMemo(() => getContactModeCopy(pageMode, requestType || undefined), [pageMode, requestType]);

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const serviceRaw = params.get("service") || "";
    const service = serviceRaw.toLowerCase();
    const intent = (params.get("intent") || "").toLowerCase();
    const roleParam = params.get("role") || "";
    const source = (params.get("source") || "").toLowerCase();

    const mode = getContactPageMode(intent || null, serviceRaw || null);
    setPageMode(mode);

    if (!service && !intent && !source) return;
    if (serviceRaw) setRequestType(serviceRaw);

    if (intent === "audit") {
      setSubmitLabel(CONTACT_FORM.submitAuditCta);
    } else if (intent === "consultation") {
      setSubmitLabel(CONTACT_FORM.submitCta);
    } else if (intent === "quote") {
      setSubmitLabel(CONTACT_FORM.submitQuoteCta);
    }

    setWhatsappMessage(
      resolveWhatsAppMessage({
        source: params.get("source"),
        service: serviceRaw || null,
        intent: params.get("intent"),
      }),
    );

    setValues((prev) => {
      const next = { ...prev };

      if (intent === "audit" && !next.message.trim()) {
        next.message =
          "I'd like a free website audit. My current website URL is: \n\nMain goals: ";
      }

      if (intent === "consultation" && !next.message.trim()) {
        next.message = "I'd like a free 15-minute consultation about my website/project.\n\nWhat I need: ";
      }

      if (service.includes("smart") || service.includes("parking")) {
        next.businessType = "Other";
        if (!next.message.trim()) {
          next.message = "I want a Smart Parking demo for my society/complex.";
        }
      }

      if (intent === "demo" && !next.message.trim()) {
        next.message = "I want to schedule a free demo.";
      }

      if (intent === "careers") {
        if (!next.message.trim()) {
          const roleLine =
            roleParam.trim().length > 0
              ? ` I'm applying for the ${roleParam.trim()} role at Bitcraftly. Portfolio / LinkedIn links are attached below.\n`
              : " I'm reaching out regarding career opportunities at Bitcraftly. Portfolio / GitHub links are below.\n";
          next.message = `Careers inquiry.${roleLine}`.trimEnd();
        }
        next.source = "Other";
      }

      const budgetParam = params.get("budget");
      if (budgetParam && BUDGET_OPTIONS.includes(budgetParam as (typeof BUDGET_OPTIONS)[number])) {
        next.budgetRange = budgetParam;
      }

      const messageParam = params.get("message");
      if (messageParam && !next.message.trim()) {
        next.message = `${messageParam}\n\nMore details about my project: `;
      }

      if ((source === "price-estimator" || source === "project-cost-calculator") && !next.message.trim()) {
        next.message = "I used the project cost calculator and would like a written quote.\n\nDetails: ";
      }

      if (source === "smart-parking-cta") {
        next.source = "Smart Parking CTA";
      } else if (source === "price-estimator" || source === "project-cost-calculator") {
        next.source = "Pricing Card CTA";
      } else if (source === "pricing-card" || source === "featured-package") {
        next.source = "Pricing Card CTA";
      } else if (source === "pricing-compare") {
        next.source = "Pricing Compare CTA";
      } else if (source === "fast-package" || source.includes("fast-packages")) {
        next.source = "Fast Package CTA";
      } else if (source.includes("audit")) {
        next.source = "Website Audit CTA";
      } else if (source.includes("consultation") || source.includes("free-consultation")) {
        next.source = "Free Consultation CTA";
      }

      return next;
    });

    const openParam = params.get("form") || params.get("openForm");
    const useInlineForm = mode === "quote" && Boolean(serviceRaw);
    if (
      !useInlineForm &&
      (openParam === "1" || openParam === "true" || window.location.hash === "#contact-form")
    ) {
      setFormOpen(true);
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#contact-form") setFormOpen(true);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const validateField = (field: FieldName, value: string): string => {
    if (field === "fullName") {
      if (value.trim().length < 2) return "Full name must be at least 2 characters.";
    }
    if (field === "businessName") {
      if (!value.trim()) return "Business name is required.";
    }
    if (field === "phone") {
      const digits = value.replace(/\D/g, "");
      if (!/^\d{10}$/.test(digits)) return "Enter a valid 10-digit Indian phone number.";
    }
    if (field === "email") {
      if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
    }
    return "";
  };

  const validateAll = (): FieldErrors => {
    const nextErrors: FieldErrors = {};
    (Object.keys(values) as FieldName[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });
    return nextErrors;
  };

  const handleBlur = (field: FieldName) => {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const handleChange = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      const invalidElement = document.getElementById(firstInvalidField);
      invalidElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      invalidElement?.focus();
      return;
    }

    setIsSubmitting(true);
    const isQuoteSubmit = pageMode === "quote" && Boolean(requestType);
    const extraLines = isQuoteSubmit
      ? `Package: ${requestType}`
      : [
          values.websiteUrl.trim() ? `Website: ${values.websiteUrl.trim()}` : "",
          `Budget: ${values.budgetRange}`,
          `Timeline: ${values.timeline}`,
          requestType ? `Service/Request: ${requestType}` : "",
        ]
          .filter(Boolean)
          .join("\n");
    const fullMessage = [values.message.trim(), extraLines].filter(Boolean).join("\n\n");

    try {
      const payload = await submitContactForm({
        name: values.fullName,
        business_name: values.businessName,
        business_type: values.businessType,
        phone: values.phone,
        email: values.email || undefined,
        message: fullMessage || undefined,
        source: values.source || undefined,
      });

      const successMessage = payload.message || "Your contact form was submitted successfully.";
      const params = new URLSearchParams(window.location.search);
      trackContactFormSubmit({
        pageMode,
        intent: params.get("intent") || undefined,
        service: requestType || params.get("service") || undefined,
        leadSource: values.source || undefined,
        businessType: values.businessType || undefined,
      });
      logServerEvent({
        eventName: "form_submit",
        source: values.source || "contact_form",
        pagePath: window.location.pathname,
        payload: {
          name: values.fullName,
          phone: values.phone,
          email: values.email,
          businessName: values.businessName,
          businessType: values.businessType,
          message: fullMessage,
          service: requestType || params.get("service") || undefined,
          intent: params.get("intent") || undefined,
          lead_source: values.source,
        },
      });
      setValues(initialValues);
      setErrors({});
      setFormOpen(false);
      await showSuccessAlert(successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      await showErrorAlert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFocusedQuote = pageMode === "quote" && Boolean(requestType);
  const isFocusedFlow = pageMode !== "default";

  const formProps = {
    values,
    errors,
    requestType,
    submitLabel,
    whatsappMessage,
    isSubmitting,
    businessTypes,
    sources,
    onChange: handleChange,
    onBlur: handleBlur,
    onSubmit: handleSubmit,
    formEyebrow: modeCopy.formEyebrow,
    formTitle: modeCopy.formTitle,
    formSubheadline: modeCopy.formSubheadline,
  };

  return (
    <main className={`${CP_PAGE} py-8 pb-24 md:py-10 md:pb-12`}>
      <div className={`${CONTAINER} grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10`}>
        <ContactSidebar
          headline={modeCopy.headline}
          subheadline={modeCopy.subheadline}
          timeline={modeCopy.timeline}
          mode={pageMode}
          serviceName={requestType}
          contactCards={<ContactMethodCards whatsappMessage={whatsappMessage} />}
        />

        <section className={`flex w-full min-w-0 flex-col gap-6 lg:col-span-7 ${isFocusedQuote ? "order-1 lg:order-2" : ""}`}>
          {isFocusedQuote ? (
            <>
              <MarketingSectionLink
                path="/pricing"
                sectionId="pricing-compare"
                className="inline-flex text-sm font-semibold text-[#4F46E5] hover:underline"
              >
                ← Change package
              </MarketingSectionLink>
              <ContactProjectForm {...formProps} layout="inline" variant="quote" />
              <ContactWhatsAppCompact message={whatsappMessage} service={requestType} />
            </>
          ) : isFocusedFlow ? (
            <>
              <ContactProjectForm {...formProps} layout="inline" />
              <ContactWhatsAppCompact message={whatsappMessage} service={requestType} />
            </>
          ) : (
            <>
              <ContactFormTrigger onOpen={openForm} requestType={requestType} />
              <Suspense
                fallback={
                  <div className="h-48 w-full animate-pulse border border-[#E5E7EB] bg-white" />
                }
              >
                <WhatsAppInquiryPanel variant="contact" simplified className="w-full" />
              </Suspense>
            </>
          )}
        </section>
      </div>

      <ContactProjectFormModal open={formOpen && !isFocusedQuote} onClose={closeForm} {...formProps} />
    </main>
  );
}
