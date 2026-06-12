"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import ContactFormTrigger from "@/components/contact/ContactFormTrigger";
import ContactMethodCards from "@/components/contact/ContactMethodCards";
import { ContactProjectFormModal } from "@/components/contact/ContactProjectFormModal";
import ContactSidebar from "@/components/contact/ContactSidebar";
import WhatsAppInquiryPanel from "@/components/landing/WhatsAppInquiryPanel";
import { CONTAINER } from "@/lib/constants";
import { CP_PAGE } from "@/lib/contactPageTheme";
import {
  BUDGET_OPTIONS,
  CONTACT_FORM,
  TIMELINE_OPTIONS,
} from "@/lib/leadGen";
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ContactContent() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestType, setRequestType] = useState<string>("");
  const [submitLabel, setSubmitLabel] = useState<string>(CONTACT_FORM.submitCta);
  const [whatsappMessage, setWhatsappMessage] = useState(WHATSAPP_MESSAGES.consultation);
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const timeline = useMemo(
    () => [
      "Fill the form (about 2 min)",
      "We reply on call/WhatsApp (same day)",
      "Free 15-min consultation with the founder",
      "Written scope + timeline before kickoff",
    ],
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const serviceRaw = params.get("service") || "";
    const service = serviceRaw.toLowerCase();
    const intent = (params.get("intent") || "").toLowerCase();
    const roleParam = params.get("role") || "";
    const source = (params.get("source") || "").toLowerCase();

    if (!service && !intent && !source) return;
    if (serviceRaw) setRequestType(serviceRaw);

    if (intent === "audit") {
      setSubmitLabel(CONTACT_FORM.submitAuditCta);
    } else if (intent === "consultation") {
      setSubmitLabel(CONTACT_FORM.submitCta);
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
      } else if (source === "pricing-card") {
        next.source = "Pricing Card CTA";
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
    if (openParam === "1" || openParam === "true" || window.location.hash === "#contact-form") {
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
    const extraLines = [
      values.websiteUrl.trim() ? `Website: ${values.websiteUrl.trim()}` : "",
      `Budget: ${values.budgetRange}`,
      `Timeline: ${values.timeline}`,
      requestType ? `Service/Request: ${requestType}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const fullMessage = [values.message.trim(), extraLines].filter(Boolean).join("\n\n");

    try {
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.fullName,
          business_name: values.businessName,
          business_type: values.businessType,
          phone: values.phone,
          email: values.email || undefined,
          message: fullMessage || undefined,
          source: values.source || undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; detail?: string }
        | null;
      if (!response.ok) {
        const errorMessage = payload?.detail || payload?.message || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }
      const successMessage = payload?.message || "Your contact form was submitted successfully.";
      setValues(initialValues);
      setErrors({});
      toast.success(successMessage);
      setFormOpen(false);
      await showSuccessAlert(successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
      await showErrorAlert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`${CP_PAGE} py-8 pb-24 md:py-10 md:pb-12`}>
      <div className={`${CONTAINER} grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10`}>
        <ContactSidebar
          timeline={timeline}
          contactCards={<ContactMethodCards whatsappMessage={whatsappMessage} />}
        />

        <section className="flex w-full min-w-0 flex-col gap-6 lg:col-span-7">
          <Suspense
            fallback={
              <div className="h-48 w-full animate-pulse border border-[#E5E7EB] bg-white" />
            }
          >
            <WhatsAppInquiryPanel variant="contact" className="w-full" />
          </Suspense>
          <ContactFormTrigger onOpen={openForm} requestType={requestType} />
        </section>
      </div>

      <ContactProjectFormModal
        open={formOpen}
        onClose={closeForm}
        values={values}
        errors={errors}
        requestType={requestType}
        submitLabel={submitLabel}
        whatsappMessage={whatsappMessage}
        isSubmitting={isSubmitting}
        businessTypes={businessTypes}
        sources={sources}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
