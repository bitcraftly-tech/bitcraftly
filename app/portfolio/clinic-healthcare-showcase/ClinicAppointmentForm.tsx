"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClinicAppointmentForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("General physician");
  const [preferredDate, setPreferredDate] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      intent: "consultation",
      source: "clinic-healthcare-showcase",
      ...(name && { name }),
      ...(phone && { phone }),
      ...(department && { department }),
      ...(preferredDate && { preferredDate }),
    });
    router.push(`/contact?${q.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Full name</span>
          <input
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-teal-500/45 focus:ring-2 focus:ring-teal-500/20"
            placeholder="Patient name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Phone</span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-teal-500/45 focus:ring-2 focus:ring-teal-500/20"
            placeholder="+91 …"
            autoComplete="tel"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Department</span>
          <select
            value={department}
            onChange={(ev) => setDepartment(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-teal-500/45 focus:ring-2 focus:ring-teal-500/20"
          >
            <option>General physician</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
            <option>Dermatology</option>
            <option>Diagnostics · imaging</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Preferred date</span>
          <input
            type="date"
            value={preferredDate}
            onChange={(ev) => setPreferredDate(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-teal-500/45 focus:ring-2 focus:ring-teal-500/20"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Brief notes</span>
        <textarea
          rows={3}
          className="mt-1.5 w-full resize-y rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-teal-500/45 focus:ring-2 focus:ring-teal-500/20"
          placeholder="Symptoms window · urgency · referral letter?"
        />
      </label>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-teal-600 via-teal-700 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:brightness-110 sm:w-auto sm:px-10"
      >
        Request appointment slot
      </button>
      <p className="text-[10px] text-dark-text-tertiary">
        Showcase form — redirects to Bitcraftly contact with enquiry context.
      </p>
    </form>
  );
}
