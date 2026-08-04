'use client';

import { useState, type FormEvent } from 'react';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { DISCOVERY_LEAD_META } from './discovery.content';
import type { DiscoveryLead } from './types';

const submitClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[50px] px-[22px]',
});

interface DiscoveryLeadFormProps {
  readonly onSubmit: (lead: DiscoveryLead) => void;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(lead: DiscoveryLead): FieldErrors {
  const errors: FieldErrors = {};

  if (!lead.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!lead.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.email = 'Enter a valid email.';
  }
  if (!lead.phone.trim() || lead.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Enter a valid phone number.';
  }

  return errors;
}

export function DiscoveryLeadForm({ onSubmit }: DiscoveryLeadFormProps) {
  const [lead, setLead] = useState<DiscoveryLead>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(lead);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      name: lead.name.trim(),
      email: lead.email.trim(),
      phone: lead.phone.trim(),
      company: lead.company.trim(),
    });
  };

  return (
    <div className="df-card">
      <p className="df-eyebrow">{DISCOVERY_LEAD_META.eyebrow}</p>
      <h2 className="df-title">{DISCOVERY_LEAD_META.title}</h2>
      <p className="df-desc">{DISCOVERY_LEAD_META.description}</p>

      <form className="df-form" onSubmit={handleSubmit} noValidate>
        <div className="df-field">
          <label htmlFor="discovery-lead-name">Name</label>
          <input
            id="discovery-lead-name"
            name="name"
            autoComplete="name"
            value={lead.name}
            onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'discovery-lead-name-error' : undefined}
          />
          {errors.name ? (
            <p id="discovery-lead-name-error" className="df-field__error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="df-field">
          <label htmlFor="discovery-lead-email">Email</label>
          <input
            id="discovery-lead-email"
            name="email"
            type="email"
            autoComplete="email"
            value={lead.email}
            onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'discovery-lead-email-error' : undefined}
          />
          {errors.email ? (
            <p id="discovery-lead-email-error" className="df-field__error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="df-field">
          <label htmlFor="discovery-lead-phone">Phone</label>
          <input
            id="discovery-lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={lead.phone}
            onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'discovery-lead-phone-error' : undefined}
          />
          {errors.phone ? (
            <p id="discovery-lead-phone-error" className="df-field__error" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="df-field">
          <label htmlFor="discovery-lead-company">Company</label>
          <input
            id="discovery-lead-company"
            name="company"
            autoComplete="organization"
            value={lead.company}
            onChange={(event) =>
              setLead((current) => ({ ...current, company: event.target.value }))
            }
          />
        </div>

        <div className="df-actions">
          <button type="submit" className={submitClassName}>
            <span>{DISCOVERY_LEAD_META.submitLabel}</span>
            <ButtonArrow className="text-[15px]" />
          </button>
        </div>
      </form>
    </div>
  );
}
