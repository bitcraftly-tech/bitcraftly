'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import {
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  X,
} from 'lucide-react';

import { CLINIC_DEPARTMENTS, CLINIC_DOCTORS } from './clinic-data';

export default function ClinicAppointmentForm() {
  const uid = useId();
  const titleId = `${uid}-success-title`;
  const descId = `${uid}-success-desc`;
  const closeRef = useRef<HTMLButtonElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function resetForm() {
    setName('');
    setPhone('');
    setEmail('');
    setDepartment('');
    setDoctor('');
    setPreferredDate('');
    setMessage('');
  }

  function closeSuccess() {
    setSubmitted(false);
    queueMicrotask(() => submitRef.current?.focus());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetForm();
    setSubmitted(true);
  }

  useEffect(() => {
    if (!submitted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSubmitted(false);
        queueMicrotask(() => submitRef.current?.focus());
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [submitted]);

  const fieldId = (key: string) => `${uid}-${key}`;

  return (
    <>
      <form onSubmit={handleSubmit} className="cl-appointment-form" noValidate={false}>
        <div className="cl-appointment-form__row">
          <div className="cl-field-group">
            <label className="cl-label" htmlFor={fieldId('name')}>
              Full Name <span className="cl-label__req" aria-hidden>*</span>
            </label>
            <input
              id={fieldId('name')}
              className="cl-field"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="cl-field-group">
            <label className="cl-label" htmlFor={fieldId('phone')}>
              Phone Number <span className="cl-label__req" aria-hidden>*</span>
            </label>
            <input
              id={fieldId('phone')}
              className="cl-field"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 90000 00000"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="cl-field-group">
            <label className="cl-label" htmlFor={fieldId('email')}>
              Email
            </label>
            <input
              id={fieldId('email')}
              className="cl-field"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="cl-appointment-form__row">
          <div className="cl-field-group">
            <label className="cl-label" htmlFor={fieldId('department')}>
              Department <span className="cl-label__req" aria-hidden>*</span>
            </label>
            <div className="cl-field-shell">
              <select
                id={fieldId('department')}
                className={`cl-field cl-field--select${department ? ' cl-field--filled' : ''}`}
                required
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              >
                <option value="">Select Department</option>
                {CLINIC_DEPARTMENTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="cl-field-shell__icon" aria-hidden />
            </div>
          </div>

          <div className="cl-field-group">
            <label className="cl-label" htmlFor={fieldId('doctor')}>
              Doctor
            </label>
            <div className="cl-field-shell">
              <select
                id={fieldId('doctor')}
                className={`cl-field cl-field--select${doctor ? ' cl-field--filled' : ''}`}
                value={doctor}
                onChange={(event) => setDoctor(event.target.value)}
              >
                <option value="">Select Doctor</option>
                {CLINIC_DOCTORS.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name} — {item.speciality}
                  </option>
                ))}
              </select>
              <ChevronDown className="cl-field-shell__icon" aria-hidden />
            </div>
          </div>

          <div className="cl-field-group">
            <label className="cl-label" htmlFor={fieldId('date')}>
              Preferred Date
            </label>
            <div className="cl-field-shell">
              <input
                id={fieldId('date')}
                className={`cl-field cl-field--date${preferredDate ? ' cl-field--filled' : ''}`}
                type="date"
                value={preferredDate}
                onChange={(event) => setPreferredDate(event.target.value)}
              />
              <CalendarDays className="cl-field-shell__icon" aria-hidden />
            </div>
          </div>
        </div>

        <div className="cl-field-group cl-field-group--full">
          <label className="cl-label" htmlFor={fieldId('message')}>
            Your Message
          </label>
          <textarea
            id={fieldId('message')}
            className="cl-field cl-field--textarea"
            rows={4}
            placeholder="Symptoms, urgency or referral details (optional)"
            aria-describedby={fieldId('note')}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className="cl-appointment-form__footer">
          <button ref={submitRef} type="submit" className="cl-btn cl-btn--primary">
            <CalendarCheck className="h-4 w-4" aria-hidden />
            Book Appointment
          </button>
          <p id={fieldId('note')} className="cl-appointment-form__note">
            Showcase form — your request is confirmed on this page for demo purposes.
          </p>
        </div>
      </form>

      {submitted ? (
        <div className="cl-success" role="presentation">
          <button
            type="button"
            className="cl-success__backdrop"
            aria-label="Dismiss success message"
            onClick={closeSuccess}
          />
          <div
            className="cl-success__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
          >
            <button
              ref={closeRef}
              type="button"
              className="cl-success__close"
              aria-label="Close"
              onClick={closeSuccess}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <span className="cl-success__icon" aria-hidden>
              <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
            </span>
            <h3 id={titleId} className="cl-h3 mt-4">
              Appointment request submitted
            </h3>
            <p id={descId} className="cl-body mt-2">
              Thank you. Our care desk will confirm your slot within one working hour.
            </p>
            <button type="button" className="cl-btn cl-btn--primary mt-6" onClick={closeSuccess}>
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
