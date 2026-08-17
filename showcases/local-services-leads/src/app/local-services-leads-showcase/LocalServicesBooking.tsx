'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { CONTAINER, SUPPORT_PHONE_DISPLAY } from '@/lib/constants';

import LocalServicesReveal from './LocalServicesReveal';
import { BOOKING_ASSURANCES, SERVICES, URGENCY_OPTIONS, ZONES } from './local-services.content';

type Step = 0 | 1 | 2;

type FormState = {
  service: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  notes: string;
};

const STEP_LABELS = ['Service', 'Contact', 'Confirm'] as const;

const INITIAL: FormState = {
  service: SERVICES[0].name,
  urgency: URGENCY_OPTIONS[0].id,
  name: '',
  phone: '',
  email: '',
  area: ZONES[0].name,
  notes: '',
};

/** Three-step booking wizard with progress rail and contact handoff. */
export default function LocalServicesBooking() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const progress = useMemo(() => ((step + 1) / STEP_LABELS.length) * 100, [step]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validateStep(current: Step): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (current === 0) {
      if (!form.service) nextErrors.service = 'Pick a service.';
      if (!form.urgency) nextErrors.urgency = 'Pick a preferred timing.';
    }

    if (current === 1) {
      if (!form.name.trim()) nextErrors.name = 'Name is required.';
      if (!form.phone.trim()) nextErrors.phone = 'Phone or WhatsApp is required.';
      else if (form.phone.replace(/\D/g, '').length < 10) {
        nextErrors.phone = 'Enter a valid phone number.';
      }
      if (!form.area.trim()) nextErrors.area = 'Locality helps us route the right crew.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(2, current + 1) as Step);
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1) as Step);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (step < 2) {
      goNext();
      return;
    }
    if (!validateStep(1)) {
      setStep(1);
      return;
    }

    const urgencyLabel =
      URGENCY_OPTIONS.find((option) => option.id === form.urgency)?.label ?? form.urgency;
    const messageParts = [
      form.notes.trim(),
      `Preferred timing: ${urgencyLabel}`,
      `Locality: ${form.area}`,
    ].filter(Boolean);

    const query = new URLSearchParams({
      intent: 'quote',
      source: 'local-services-leads-showcase',
      ...(form.name && { name: form.name }),
      ...(form.phone && { phone: form.phone }),
      ...(form.email && { email: form.email }),
      ...(form.service && { service: form.service }),
      ...(form.area && { area: form.area }),
      ...(messageParts.length > 0 && { message: messageParts.join(' · ') }),
    });

    router.push(`/contact?${query.toString()}`);
  }

  const urgencyLabel =
    URGENCY_OPTIONS.find((option) => option.id === form.urgency)?.label ?? form.urgency;

  return (
    <section
      id="booking"
      className="lsx-section lsx-booking scroll-mt-28"
      aria-labelledby="lsx-booking-heading"
    >
      <div className={CONTAINER}>
        <div className="lsx-booking__layout">
          <div className="lsx-booking__aside">
            <LocalServicesReveal>
              <p className="lsx-eyebrow">Booking request</p>
              <h2 id="lsx-booking-heading" className="lsx-title">
                Request a free visit
              </h2>
              <p className="lsx-lead">
                Three short steps — we route the right crew and send a written estimate on WhatsApp.
              </p>
            </LocalServicesReveal>

            <LocalServicesReveal delay={0.1}>
              <ul>
                {BOOKING_ASSURANCES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Icon size={16} strokeWidth={1.85} aria-hidden />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </LocalServicesReveal>
          </div>

          <LocalServicesReveal delay={0.12} className="lsx-wizard">
            <div className="lsx-wizard__head">
              <div>
                <p>
                  Step {step + 1} of {STEP_LABELS.length}
                </p>
                <strong>{STEP_LABELS[step]}</strong>
              </div>
              <strong aria-hidden>{Math.round(progress)}%</strong>
            </div>
            <div className="lsx-wizard__rail" aria-hidden>
              <motion.i
                animate={{ scaleX: progress / 100 }}
                transition={
                  reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }
                }
                style={{ transformOrigin: 'left center' }}
              />
            </div>

            <form onSubmit={handleSubmit} noValidate aria-label="Service booking request">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="lsx-wizard__step"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 ? (
                    <fieldset>
                      <legend className="lsx-wizard__legend">What do you need help with?</legend>
                      <div className="lsx-field" style={{ marginBottom: '1.1rem' }}>
                        <span id="lsx-service-label">Service</span>
                        <div
                          className="lsx-choice"
                          role="group"
                          aria-labelledby="lsx-service-label"
                        >
                          {SERVICES.map((service) => {
                            const Icon = service.icon;
                            return (
                              <button
                                key={service.id}
                                type="button"
                                aria-pressed={form.service === service.name}
                                onClick={() => update('service', service.name)}
                              >
                                <Icon size={15} strokeWidth={1.85} aria-hidden />
                                {service.name}
                              </button>
                            );
                          })}
                        </div>
                        {errors.service ? (
                          <span className="lsx-field__error" role="alert">
                            {errors.service}
                          </span>
                        ) : null}
                      </div>

                      <div className="lsx-field">
                        <span id="lsx-urgency-label">Preferred timing</span>
                        <div
                          className="lsx-choice"
                          role="group"
                          aria-labelledby="lsx-urgency-label"
                        >
                          {URGENCY_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              aria-pressed={form.urgency === option.id}
                              onClick={() => update('urgency', option.id)}
                            >
                              <span>
                                <strong style={{ display: 'block' }}>{option.label}</strong>
                                <small style={{ color: 'inherit', opacity: 0.7 }}>
                                  {option.hint}
                                </small>
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.urgency ? (
                          <span className="lsx-field__error" role="alert">
                            {errors.urgency}
                          </span>
                        ) : null}
                      </div>
                    </fieldset>
                  ) : null}

                  {step === 1 ? (
                    <fieldset>
                      <legend className="lsx-wizard__legend">Where should we reach you?</legend>
                      <div className="lsx-grid-2">
                        <div className="lsx-field">
                          <label htmlFor="lsx-name">Your name</label>
                          <input
                            id="lsx-name"
                            required
                            type="text"
                            value={form.name}
                            onChange={(event) => update('name', event.target.value)}
                            placeholder="Full name"
                            autoComplete="name"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'lsx-name-error' : undefined}
                          />
                          {errors.name ? (
                            <span id="lsx-name-error" className="lsx-field__error" role="alert">
                              {errors.name}
                            </span>
                          ) : null}
                        </div>
                        <div className="lsx-field">
                          <label htmlFor="lsx-phone">Phone / WhatsApp</label>
                          <input
                            id="lsx-phone"
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(event) => update('phone', event.target.value)}
                            placeholder="+91 …"
                            autoComplete="tel"
                            inputMode="tel"
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? 'lsx-phone-error' : undefined}
                          />
                          {errors.phone ? (
                            <span id="lsx-phone-error" className="lsx-field__error" role="alert">
                              {errors.phone}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="lsx-grid-2" style={{ marginTop: '0.85rem' }}>
                        <div className="lsx-field">
                          <label htmlFor="lsx-area">Locality</label>
                          <select
                            id="lsx-area"
                            value={form.area}
                            onChange={(event) => update('area', event.target.value)}
                            aria-invalid={Boolean(errors.area)}
                          >
                            {ZONES.map((zone) => (
                              <option key={zone.id} value={zone.name}>
                                {zone.name}
                              </option>
                            ))}
                          </select>
                          {errors.area ? (
                            <span className="lsx-field__error" role="alert">
                              {errors.area}
                            </span>
                          ) : null}
                        </div>
                        <div className="lsx-field">
                          <label htmlFor="lsx-email">Email (optional)</label>
                          <input
                            id="lsx-email"
                            type="email"
                            value={form.email}
                            onChange={(event) => update('email', event.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <div className="lsx-field" style={{ marginTop: '0.85rem' }}>
                        <label htmlFor="lsx-notes">Job details</label>
                        <textarea
                          id="lsx-notes"
                          rows={4}
                          value={form.notes}
                          onChange={(event) => update('notes', event.target.value)}
                          placeholder="What needs fixing, access notes, preferred slot…"
                        />
                      </div>
                    </fieldset>
                  ) : null}

                  {step === 2 ? (
                    <fieldset>
                      <legend className="lsx-wizard__legend">Confirm and send</legend>
                      <dl className="lsx-wizard__summary">
                        <div>
                          <dt>Service</dt>
                          <dd>{form.service}</dd>
                        </div>
                        <div>
                          <dt>Timing</dt>
                          <dd>{urgencyLabel}</dd>
                        </div>
                        <div>
                          <dt>Contact</dt>
                          <dd>
                            {form.name} · {form.phone}
                          </dd>
                        </div>
                        <div>
                          <dt>Locality</dt>
                          <dd>{form.area}</dd>
                        </div>
                        {form.notes.trim() ? (
                          <div>
                            <dt>Notes</dt>
                            <dd>{form.notes.trim()}</dd>
                          </div>
                        ) : null}
                      </dl>
                      <p className="lsx-wizard__note">
                        Showcase form — forwards to Bitcraftly contact with your enquiry context.
                        Prefer voice?{' '}
                        <a href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, '')}`}>
                          {SUPPORT_PHONE_DISPLAY}
                        </a>
                      </p>
                    </fieldset>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="lsx-wizard__actions">
                {step > 0 ? (
                  <button type="button" className="lsx-btn lsx-btn--ghost" onClick={goBack}>
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 2 ? (
                  <button type="button" className="lsx-btn lsx-btn--primary" onClick={goNext}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="lsx-btn lsx-btn--primary">
                    Send booking request
                  </button>
                )}
              </div>
            </form>
          </LocalServicesReveal>
        </div>
      </div>
    </section>
  );
}
