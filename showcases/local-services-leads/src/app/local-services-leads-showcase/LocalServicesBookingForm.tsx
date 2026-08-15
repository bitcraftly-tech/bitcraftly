'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LocalServicesBookingForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
      ...(email && { email }),
      ...(service && { service }),
      ...(area && { area }),
      ...(notes.trim() && { message: notes.trim() }),
    });
    router.push(`/contact?${q.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Service booking request">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sc-home-field">
          <label htmlFor="sc-home-name">Your name</label>
          <input
            id="sc-home-name"
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Full name"
            autoComplete="name"
          />
        </div>
        <div className="sc-home-field">
          <label htmlFor="sc-home-phone">Phone / WhatsApp</label>
          <input
            id="sc-home-phone"
            required
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            placeholder="+91 …"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sc-home-field">
          <label htmlFor="sc-home-service">Service</label>
          <select
            id="sc-home-service"
            value={service}
            onChange={(ev) => setService(ev.target.value)}
          >
            <option>Plumbing</option>
            <option>Electrician</option>
            <option>AC repair</option>
            <option>Deep cleaning</option>
            <option>Painting</option>
            <option>Carpentry</option>
          </select>
        </div>
        <div className="sc-home-field">
          <label htmlFor="sc-home-email">Email (optional)</label>
          <input
            id="sc-home-email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="sc-home-field">
        <label htmlFor="sc-home-area">Locality / pincode</label>
        <input
          id="sc-home-area"
          type="text"
          value={area}
          onChange={(ev) => setArea(ev.target.value)}
          placeholder="Bistupur · landmark"
          autoComplete="address-level2"
        />
      </div>

      <div className="sc-home-field">
        <label htmlFor="sc-home-notes">Job details</label>
        <textarea
          id="sc-home-notes"
          rows={4}
          value={notes}
          onChange={(ev) => setNotes(ev.target.value)}
          placeholder="What needs fixing, urgency, preferred slot…"
        />
      </div>

      <button
        type="submit"
        className="sc-home__btn sc-home__btn--primary w-full sm:w-auto sm:min-w-[14rem]"
      >
        Send booking request
      </button>
      <p className="text-[11px] text-[color:var(--sc-muted)]">
        Showcase form — forwards to Bitcraftly contact with your enquiry context.
      </p>
    </form>
  );
}
