"use client";

import { Calendar, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { DAYAL, HERO_IMAGE } from "@/lib/dayal/data";

export default function DayalVisitCta() {
  const [submitted, setSubmitted] = useState(false);

  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    "Hi Dayal Builders, I would like to discuss my next project in Jamshedpur."
  )}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="dayal-section">
      <div className="dayal-container">
        <DayalReveal>
          <div className="dayal-cta-panel">
            <div className="grid lg:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-center p-8 lg:p-14">
                <p className="dayal-eyebrow dayal-eyebrow-light before:bg-[var(--dayal-gold)]">
                  Get in Touch
                </p>
                <h2 className="dayal-heading dayal-heading-lg dayal-heading-light mt-5">
                  Let&apos;s Discuss Your Next Project
                </h2>
                <div
                  className="mt-5 h-px w-16"
                  style={{ background: "linear-gradient(90deg, var(--dayal-gold), transparent)" }}
                />
                <p className="mt-6 text-sm leading-relaxed text-white/70">
                  Have a vision in mind? Share your ideas with us — we&apos;re here to turn your dream
                  project into reality with expert planning and execution.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:max-w-xs">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="dayal-btn-gold w-full">
                    <MessageCircle className="h-4 w-4" />
                    Talk on WhatsApp
                  </a>
                  <a href={`tel:${DAYAL.phones[0].tel}`} className="dayal-btn-outline dayal-btn-outline-light w-full">
                    <Phone className="h-4 w-4" />
                    {DAYAL.phones[0].display}
                  </a>
                </div>
              </div>

              <div className="relative p-8 lg:p-14">
                {submitted ? (
                  <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center text-center text-white">
                    <Calendar className="h-12 w-12" style={{ color: "var(--dayal-gold)" }} />
                    <h3 className="dayal-serif mt-5 text-2xl font-semibold">Thank you!</h3>
                    <p className="mt-2 text-white/70">Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="relative z-10 space-y-4">
                    <label className="block text-sm text-white">
                      <span className="font-medium">First name *</span>
                      <input required name="firstName" className="dayal-input mt-1.5" placeholder="Your name" />
                    </label>
                    <label className="block text-sm text-white">
                      <span className="font-medium">Phone *</span>
                      <input required type="tel" name="phone" className="dayal-input mt-1.5" placeholder="+91" />
                    </label>
                    <label className="block text-sm text-white">
                      <span className="font-medium">Email</span>
                      <input type="email" name="email" className="dayal-input mt-1.5" placeholder="you@email.com" />
                    </label>
                    <button type="submit" className="dayal-btn-gold w-full">
                      Submit
                    </button>
                  </form>
                )}
                <div className="pointer-events-none absolute inset-0 opacity-15">
                  <Image src={HERO_IMAGE} alt="" fill className="object-cover" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
