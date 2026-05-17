"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { CONTAINER } from "@/lib/constants";

import { SchoolAdmissionForm } from "./SchoolAdmissionForm";
import { useSchoolDemo } from "./SchoolDemoContext";
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_HOURS, SCHOOL_PHONE, SCHOOL_PHONE_DISPLAY } from "./school-demo-data";

export default function SchoolContactSection() {
  const { openWhatsApp, bookCampusVisit } = useSchoolDemo();

  return (
    <section id="contact" className="school-bg-surface scroll-mt-28 border-t school-border py-14 lg:py-16">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="school-section-label">Get in Touch</p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--school-navy)]">Admissions & Enquiries</h2>
          <p className="school-text-muted mt-3 text-sm leading-relaxed">
            Reach our admissions desk for tours, fee structure and session 2026-27 registration.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <a
              href={`tel:${SCHOOL_PHONE}`}
              className="flex gap-4 rounded-xl border school-border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--school-accent-soft)] text-[var(--school-orange)]">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--school-muted)]">Call us</p>
                <p className="mt-0.5 font-bold text-[var(--school-navy)]">{SCHOOL_PHONE_DISPLAY}</p>
              </div>
            </a>
            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="flex gap-4 rounded-xl border school-border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--school-accent-soft)] text-[var(--school-orange)]">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--school-muted)]">Email</p>
                <p className="mt-0.5 font-semibold text-[var(--school-navy)]">{SCHOOL_EMAIL}</p>
              </div>
            </a>
            <div className="flex gap-4 rounded-xl border school-border bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--school-accent-soft)] text-[var(--school-orange)]">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--school-muted)]">Campus</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[var(--school-text)]">{SCHOOL_ADDRESS}</p>
                <p className="school-text-muted mt-1 text-xs">{SCHOOL_HOURS}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={openWhatsApp}
                className="school-btn-primary inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold uppercase"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </button>
              <button type="button" onClick={bookCampusVisit} className="school-btn-navy rounded-md px-5 py-2.5 text-sm font-bold uppercase">
                Book Campus Visit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border school-border bg-white p-5 shadow-md sm:p-6">
            <p className="text-lg font-bold text-[var(--school-navy)]">Quick Enquiry</p>
            <p className="school-text-muted mt-1 text-xs">Demo form · no data stored</p>
            <div className="mt-4">
              <SchoolAdmissionForm compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
