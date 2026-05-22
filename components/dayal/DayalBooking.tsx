"use client";

import { Calendar, MessageCircle, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { DAYAL } from "@/lib/dayal/data";

export default function DayalBooking() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    "Hi Dayal Builders, I would like to book a site visit at Govindpur."
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal>
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-[#0b1633]/8">
            <div className="grid lg:grid-cols-2">
              <div className="dayal-on-dark bg-[#0b1633] p-8 text-white lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a46b]">
                  Book Your Visit
                </p>
                <h2 className="dayal-serif mt-3 text-3xl font-semibold sm:text-4xl">
                  Experience Dayal City in Person
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Schedule a guided site tour, download the brochure, or speak with our sales
                  advisors — we respond within a few hours.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="dayal-btn-outline inline-flex">
                    <MessageCircle className="h-4 w-4" />
                    Talk on WhatsApp
                  </a>
                  <a href={`tel:${DAYAL.phones[0].tel}`} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-[#c8a46b]">
                    <Phone className="h-4 w-4" />
                    {DAYAL.phones[0].display}
                  </a>
                </div>
                <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/70">
                  <p className="font-semibold text-white">Calendly</p>
                  <p className="mt-1">Embed your scheduling link here for instant confirmations.</p>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Calendar className="h-12 w-12 text-[#c8a46b]" />
                    <h3 className="dayal-serif mt-4 text-2xl font-semibold text-[#0b1633]">
                      Thank you!
                    </h3>
                    <p className="mt-2 text-[#5c6478]">
                      Our team will contact you shortly to confirm your site visit.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <h3 className="dayal-serif text-xl font-semibold text-[#0b1633]">
                      Book Site Visit
                    </h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block text-sm">
                        <span className="font-medium text-[#0b1633]">Full Name</span>
                        <input
                          required
                          name="name"
                          className="mt-1.5 w-full rounded-lg border border-[#0b1633]/15 px-4 py-3 text-[#0b1633] outline-none transition focus:border-[#c8a46b] focus:ring-2 focus:ring-[#c8a46b]/25"
                          placeholder="Your name"
                        />
                      </label>
                      <label className="block text-sm">
                        <span className="font-medium text-[#0b1633]">Phone</span>
                        <input
                          required
                          type="tel"
                          name="phone"
                          className="mt-1.5 w-full rounded-lg border border-[#0b1633]/15 px-4 py-3 text-[#0b1633] outline-none transition focus:border-[#c8a46b] focus:ring-2 focus:ring-[#c8a46b]/25"
                          placeholder="+91"
                        />
                      </label>
                    </div>
                    <label className="block text-sm">
                      <span className="font-medium text-[#0b1633]">Email</span>
                      <input
                        type="email"
                        name="email"
                        className="mt-1.5 w-full rounded-lg border border-[#0b1633]/15 px-4 py-3 text-[#0b1633] outline-none transition focus:border-[#c8a46b] focus:ring-2 focus:ring-[#c8a46b]/25"
                        placeholder="you@email.com"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-[#0b1633]">Preferred Date</span>
                      <input
                        type="date"
                        name="date"
                        className="mt-1.5 w-full rounded-lg border border-[#0b1633]/15 px-4 py-3 text-[#0b1633] outline-none transition focus:border-[#c8a46b] focus:ring-2 focus:ring-[#c8a46b]/25"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-[#0b1633]">Message</span>
                      <textarea
                        name="message"
                        rows={3}
                        className="mt-1.5 w-full resize-none rounded-lg border border-[#0b1633]/15 px-4 py-3 text-[#0b1633] outline-none transition focus:border-[#c8a46b] focus:ring-2 focus:ring-[#c8a46b]/25"
                        placeholder="Interested in 2/3 BHK, loan assistance, etc."
                      />
                    </label>
                    <button type="submit" className="dayal-btn-primary w-full sm:w-auto">
                      <Calendar className="h-4 w-4" />
                      Book Site Visit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
