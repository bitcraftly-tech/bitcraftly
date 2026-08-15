'use client';

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { SchoolAdmissionForm } from './SchoolAdmissionForm';
import { useSchoolDemo } from './SchoolDemoContext';
import {
  SCHOOL_ADDRESS,
  SCHOOL_EMAIL,
  SCHOOL_HOURS,
  SCHOOL_PHONE,
  SCHOOL_PHONE_DISPLAY,
} from './school-demo-data';

export default function SchoolContactSection() {
  const { openWhatsApp, bookCampusVisit } = useSchoolDemo();

  return (
    <section
      id="contact"
      className="school-bg-surface scroll-mt-28 border-t school-border py-16 lg:py-20"
    >
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="school-section-label">Get in Touch</p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--school-navy)]">
            Admissions &amp; Enquiries
          </h2>
          <p className="school-text-muted mt-3 text-sm leading-relaxed">
            Prefer a fuller enquiry? Share details below — or call, WhatsApp, or book a campus tour.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="space-y-3">
            <a
              href={`tel:${SCHOOL_PHONE}`}
              className="flex gap-4 rounded-2xl border school-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="school-tile__icon">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--school-muted)]">
                  Call us
                </p>
                <p className="mt-0.5 font-bold text-[var(--school-navy)]">{SCHOOL_PHONE_DISPLAY}</p>
              </div>
            </a>
            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="flex gap-4 rounded-2xl border school-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="school-tile__icon">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--school-muted)]">
                  Email
                </p>
                <p className="mt-0.5 font-semibold text-[var(--school-navy)]">{SCHOOL_EMAIL}</p>
              </div>
            </a>
            <div className="flex gap-4 rounded-2xl border school-border bg-white p-4 shadow-sm">
              <span className="school-tile__icon">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--school-muted)]">
                  Campus
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-[var(--school-text)]">
                  {SCHOOL_ADDRESS}
                </p>
                <p className="school-text-muted mt-1 text-xs">{SCHOOL_HOURS}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={openWhatsApp}
                className="school-btn-primary inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-wide"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={bookCampusVisit}
                className="school-btn-navy rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-wide"
              >
                Book Campus Tour
              </button>
            </div>
          </div>

          <div className="rounded-2xl border school-border bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,39,68,0.4)] sm:p-7">
            <p className="text-lg font-bold text-[var(--school-navy)]">Leave Enquiry</p>
            <p className="school-text-muted mt-1 text-xs">Demo form · no data stored</p>
            <div className="mt-5">
              <SchoolAdmissionForm compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
