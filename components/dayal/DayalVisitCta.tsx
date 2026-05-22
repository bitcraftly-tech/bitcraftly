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
    <section id="contact" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal>
          <div className="overflow-hidden rounded-2xl bg-[#0b1633] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <h2 className="dayal-serif text-3xl font-semibold text-white sm:text-4xl">
                  Let&apos;s Discuss Your Next Project
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Have a vision in mind? Share your ideas with us — we&apos;re here to turn your
                  dream project into reality with expert planning and execution.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:max-w-xs">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dayal-btn-gold w-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Talk on WhatsApp
                  </a>
                  <a
                    href={`tel:${DAYAL.phones[0].tel}`}
                    className="dayal-btn-outline w-full border-white/40 text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {DAYAL.phones[0].display}
                  </a>
                </div>
              </div>

              <div className="relative bg-[#0b1633] p-8 lg:p-12">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-white">
                    <Calendar className="h-12 w-12 text-[#c8a46b]" />
                    <h3 className="dayal-serif mt-4 text-2xl font-semibold">Thank you!</h3>
                    <p className="mt-2 text-white/70">Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="relative z-10 space-y-4">
                    <label className="block text-sm text-white">
                      <span className="font-medium">First name *</span>
                      <input
                        required
                        name="firstName"
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#c8a46b]"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="block text-sm text-white">
                      <span className="font-medium">Phone *</span>
                      <input
                        required
                        type="tel"
                        name="phone"
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#c8a46b]"
                        placeholder="+91"
                      />
                    </label>
                    <label className="block text-sm text-white">
                      <span className="font-medium">Email</span>
                      <input
                        type="email"
                        name="email"
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#c8a46b]"
                        placeholder="you@email.com"
                      />
                    </label>
                    <button type="submit" className="dayal-btn-gold w-full">
                      Submit
                    </button>
                  </form>
                )}
                <div className="pointer-events-none absolute inset-0 opacity-20">
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
