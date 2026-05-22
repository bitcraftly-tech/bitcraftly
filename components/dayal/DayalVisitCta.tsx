"use client";

import { Calendar, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { DAYAL } from "@/lib/dayal/data";

export default function DayalVisitCta() {
  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    "Hi Dayal Builders, I would like to book a site visit at Dayal City, Govindpur."
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal>
          <div className="overflow-hidden rounded-2xl bg-[#0b1633] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <h2 className="dayal-serif text-3xl font-semibold text-white sm:text-4xl">
                  Book a Site Visit
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Experience Dayal City in person. Our team will guide you through the township,
                  sample flats, and amenities.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:max-w-xs">
                  <a href="#contact" className="dayal-btn-gold w-full">
                    <Calendar className="h-4 w-4" />
                    Book Site Visit
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dayal-btn-outline w-full border-white/40 text-white hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Talk on WhatsApp
                  </a>
                  <a
                    href={`tel:${DAYAL.phones[0].tel}`}
                    className="dayal-btn-outline w-full border-white/40 text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    Request a Callback
                  </a>
                </div>
              </div>
              <div className="relative min-h-[280px] lg:min-h-[360px]">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
                  alt="Dayal City entrance and towers"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0b1633]/40 lg:to-[#0b1633]/80" />
              </div>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
