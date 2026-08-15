'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuilderEnquiryForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Skyline residences');
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      intent: 'consultation',
      source: 'builder-real-estate-showcase',
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(interest && { interest }),
      ...(message.trim() && { message: message.trim() }),
    });
    router.push(`/contact?${q.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Full name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none ring-amber-500/0 transition focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Phone
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
            placeholder="+91 …"
            autoComplete="tel"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
            Interested in
          </span>
          <select
            value={interest}
            onChange={(ev) => setInterest(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
          >
            <option>Skyline residences</option>
            <option>Lake villas</option>
            <option>Investment / inventory</option>
            <option>Custom tower briefing</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
          Message
        </span>
        <textarea
          rows={3}
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
          placeholder="Budget band, timeline, configuration…"
        />
      </label>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-violet-600 via-violet-700 to-amber-600/90 py-3 text-sm font-semibold text-white shadow-[0_14px_44px_-14px_rgba(124,58,237,0.55)] transition hover:brightness-110 sm:w-auto sm:px-10"
      >
        Submit enquiry
      </button>
      <p className="text-[10px] text-dark-text-tertiary">
        Showcase form — submits to Bitcraftly contact with your details prefilled in the query
        string where supported.
      </p>
    </form>
  );
}
