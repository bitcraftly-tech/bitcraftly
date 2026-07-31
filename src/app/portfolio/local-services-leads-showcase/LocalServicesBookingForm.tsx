'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LocalServicesBookingForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Plumbing');
  const [area, setArea] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      intent: 'quote',
      source: 'local-services-leads-showcase',
      ...(name && { name }),
      ...(phone && { phone }),
      ...(service && { service }),
      ...(area && { area }),
      ...(notes.trim() && { message: notes.trim() }),
    });
    router.push(`/contact?${q.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Your name
          </span>
          <input
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/20"
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Phone / WhatsApp
          </span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/20"
            placeholder="+91 …"
            autoComplete="tel"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Service
          </span>
          <select
            value={service}
            onChange={(ev) => setService(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
          >
            <option>Plumbing</option>
            <option>Electrician</option>
            <option>AC Repair</option>
            <option>Cleaning</option>
            <option>Painting</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Locality / pincode
          </span>
          <input
            type="text"
            value={area}
            onChange={(ev) => setArea(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
            placeholder="Area · landmark"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
          Job details
        </span>
        <textarea
          rows={3}
          value={notes}
          onChange={(ev) => setNotes(ev.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Urgency, property type, preferred slot…"
        />
      </label>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/25 transition hover:brightness-110 sm:w-auto sm:px-10"
      >
        Send booking request
      </button>
      <p className="text-[10px] text-dark-text-tertiary">
        Showcase — forwards to Bitcraftly contact with your enquiry context.
      </p>
    </form>
  );
}
