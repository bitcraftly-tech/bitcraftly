"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RestaurantReservationForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("7:30 PM");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      intent: "consultation",
      source: "restaurant-website-showcase",
      ...(name && { name }),
      ...(phone && { phone }),
      ...(guests && { guests }),
      ...(date && { preferredDate: date }),
      ...(timeSlot && { timeSlot }),
    });
    router.push(`/contact?${q.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Name</span>
          <input
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-orange-500/45 focus:ring-2 focus:ring-orange-500/20"
            placeholder="Guest name"
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
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-orange-500/45 focus:ring-2 focus:ring-orange-500/20"
            placeholder="+91 …"
            autoComplete="tel"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Guests</span>
          <select
            value={guests}
            onChange={(ev) => setGuests(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
          >
            {["2", "3", "4", "5", "6+"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Date</span>
          <input
            required
            type="date"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Time</span>
          <select
            value={timeSlot}
            onChange={(ev) => setTimeSlot(ev.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dark-border-primary bg-dark-bg-secondary px-3 py-2.5 text-sm text-dark-text-primary outline-none focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
          >
            <option>6:30 PM</option>
            <option>7:30 PM</option>
            <option>8:30 PM</option>
            <option>9:30 PM</option>
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:brightness-110 sm:w-auto sm:px-10"
      >
        Request table · showcase
      </button>
      <p className="text-[10px] text-dark-text-tertiary">Redirects to Bitcraftly contact with reservation context.</p>
    </form>
  );
}
