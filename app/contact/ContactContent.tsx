"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { CONTAINER } from "@/lib/constants";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

type ContactFormValues = {
  fullName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  message: string;
  source: string;
};

type FieldName = keyof ContactFormValues;
type FieldErrors = Partial<Record<FieldName, string>>;

const businessTypes = ["Restaurant", "Salon", "Clinic", "Gym", "Shop", "Other"];
const sources = ["WhatsApp", "Google", "Friend", "Social Media", "Smart Parking CTA", "Pricing Card CTA", "Other"];

const initialValues: ContactFormValues = {
  fullName: "",
  businessName: "",
  businessType: "Restaurant",
  phone: "",
  email: "",
  message: "",
  source: "WhatsApp",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function iconWrapper(path: React.ReactNode) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border-primary bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary">
      {path}
    </span>
  );
}

export default function ContactContent() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestType, setRequestType] = useState<string>("");

  const timeline = useMemo(
    () => [
      "Aap form bharo (2 min)",
      "Hum call/WhatsApp karein (same day)",
      "Free demo dekhein (15 min)",
      "48 hrs mein live",
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

    setValues((prev) => {
      const next = { ...prev };

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

      if (source === "smart-parking-cta") {
        next.source = "Smart Parking CTA";
      } else if (source === "pricing-card") {
        next.source = "Pricing Card CTA";
      }

      return next;
    });
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
          message: values.message || undefined,
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
    <main className="bg-bg-primary py-10 dark:bg-dark-bg-primary md:py-14">
      <div className={`${CONTAINER} grid grid-cols-1 gap-12 md:grid-cols-5`}>
        <section className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Get in touch</p>
          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl text-text-primary dark:text-dark-text-primary sm:text-5xl">Baat karte hain</h1>
          <p className="mt-4 text-sm leading-7 text-text-secondary dark:text-dark-text-secondary">
            Demo chahiye? Koi sawaal hai? Hum 24 ghante mein jawab dete hain.
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-border-primary bg-bg-card p-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
              {iconWrapper(
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current text-text-primary dark:text-dark-text-primary" aria-hidden="true">
                  <path d="M17.4 2.6A9.97 9.97 0 0010.3 0C4.9 0 .5 4.4.5 9.8c0 1.7.4 3.4 1.3 5L0 20l5.3-1.7c1.5.8 3.1 1.3 4.8 1.3h.1c5.4 0 9.8-4.4 9.8-9.8 0-2.6-1-5.1-2.6-7.2zM10.2 18c-1.4 0-2.8-.4-4-1.2l-.3-.2-3.1 1 1-3-.2-.3a8.3 8.3 0 01-1.3-4.4c0-4.4 3.6-8 8-8 2.1 0 4.1.8 5.7 2.4a8 8 0 012.3 5.7c0 4.4-3.6 8-8.1 8zm4.4-6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.1-.2.1-.4 0-.2-.1-.8-.3-1.5-.9a5.6 5.6 0 01-1-1.2c-.1-.2 0-.3.1-.4l.3-.3.2-.4c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.3-.3-.3-.5-.3h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.2.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.2-.5 1.4-1 .2-.5.2-.9.2-1 0-.1-.1-.1-.3-.2z" />
                </svg>,
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">WhatsApp</p>
                <a
                  href="https://wa.me/919667710954"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-text-primary hover:text-accent-primary dark:text-dark-text-primary"
                >
                  +91 96677 10954
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border-primary bg-bg-card p-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
              {iconWrapper(
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current text-text-primary dark:text-dark-text-primary" aria-hidden="true">
                  <path d="M2.5 4A2.5 2.5 0 000 6.5v7A2.5 2.5 0 002.5 16h15a2.5 2.5 0 002.5-2.5v-7A2.5 2.5 0 0017.5 4h-15zm0 1.5h15c.2 0 .5.1.7.2L10 10.9 1.8 5.7c.2-.1.4-.2.7-.2zm-1 2 8.1 5.1a.8.8 0 00.8 0l8.1-5.1v6a1 1 0 01-1 1h-15a1 1 0 01-1-1v-6z" />
                </svg>,
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Email</p>
                <a
                  href="mailto:hello@bitcraftly.com"
                  className="text-sm font-medium text-text-primary hover:text-accent-primary dark:text-dark-text-primary"
                >
                  hello@bitcraftly.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border-primary bg-bg-card p-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
              {iconWrapper(
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current text-text-primary dark:text-dark-text-primary" aria-hidden="true">
                  <path d="M10 0a6.8 6.8 0 00-6.8 6.8c0 4.9 6.1 12.6 6.4 12.9.2.2.5.2.7 0 .3-.3 6.4-8 6.4-12.9A6.8 6.8 0 0010 0zm0 9.8a3 3 0 110-6 3 3 0 010 6z" />
                </svg>,
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Location</p>
                <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Ghaziabad, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1A6B3C]" />
            Usually replies within 2 hours
          </div>

          <div className="mt-7 rounded-lg border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">What happens next?</p>
            <div className="mt-4 space-y-3">
              {timeline.map((step, index) => (
                <div key={step} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-bg-secondary text-xs font-semibold text-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="md:col-span-3">
          <div className="w-full rounded-lg border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-7">
            {requestType ? (
              <p className="mb-4 inline-flex rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-primary">
                Request Type: {requestType}
              </p>
            ) : null}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="fullName">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    value={values.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    className={`h-11 w-full rounded-lg border bg-bg-card px-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  />
                  {errors.fullName ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.fullName}</p> : null}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="businessName">
                    Business Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="businessName"
                    value={values.businessName}
                    onChange={(event) => handleChange("businessName", event.target.value)}
                    onBlur={() => handleBlur("businessName")}
                    className={`h-11 w-full rounded-lg border bg-bg-card px-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary ${
                      errors.businessName
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  />
                  {errors.businessName ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.businessName}</p> : null}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="businessType">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    value={values.businessType}
                    onChange={(event) => handleChange("businessType", event.target.value)}
                    onBlur={() => handleBlur("businessType")}
                    className={`h-11 w-full rounded-lg border bg-bg-card px-4 text-sm text-text-primary outline-none transition-colors dark:bg-dark-bg-secondary dark:text-dark-text-primary ${
                      errors.businessType
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  >
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.businessType ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.businessType}</p> : null}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="phone">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    value={values.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="10-digit Indian number"
                    className={`h-11 w-full rounded-lg border bg-bg-card px-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  />
                  {errors.phone ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.phone}</p> : null}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="email">
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    value={values.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`h-11 w-full rounded-lg border bg-bg-card px-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  />
                  {errors.email ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.email}</p> : null}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="message">
                    Message / What do you need?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={values.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    onBlur={() => handleBlur("message")}
                    className={`w-full rounded-lg border bg-bg-card px-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  />
                  {errors.message ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.message}</p> : null}
                </div>

                <div className="mb-5 flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary" htmlFor="source">
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    value={values.source}
                    onChange={(event) => handleChange("source", event.target.value)}
                    onBlur={() => handleBlur("source")}
                    className={`h-11 w-full rounded-lg border bg-bg-card px-4 text-sm text-text-primary outline-none transition-colors dark:bg-dark-bg-secondary dark:text-dark-text-primary ${
                      errors.source
                        ? "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        : "border-border-primary focus:border-accent-primary dark:border-dark-border-primary dark:focus:border-accent-primary"
                    }`}
                  >
                    {sources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  {errors.source ? <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.source}</p> : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 h-12 w-full rounded-lg bg-[#1A1916] px-4 text-sm font-semibold text-white transition hover:bg-[#1A1916]/92 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
