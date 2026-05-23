"use client";

import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { ABOUT_EXTENDED, ABOUT_INTRO, PROPRIETOR } from "@/lib/dayal/data";

export default function DayalAboutTrust() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24">
      <div className="dayal-container">
        <DayalReveal>
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#0b1633]/8 ring-1 ring-[#0b1633]/5">
            <div className="grid lg:grid-cols-12">
              <div className="relative aspect-[5/6] w-full sm:aspect-[5/4] lg:col-span-4 lg:aspect-auto lg:min-h-[300px]">
                <Image
                  src={PROPRIETOR.image}
                  alt={PROPRIETOR.name}
                  fill
                  className="object-cover object-[center_32%] sm:object-[center_22%] lg:object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1633]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
                <div className="absolute bottom-6 left-6 right-6 text-white lg:bottom-8 lg:left-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a46b]">
                    {PROPRIETOR.role}
                  </p>
                  <h2 className="dayal-serif mt-1 text-2xl font-semibold">{PROPRIETOR.name}</h2>
                  <p className="mt-1 text-sm text-white/80">{PROPRIETOR.company}</p>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:col-span-8 lg:p-10">
                <p className="dayal-eyebrow tracking-[0.2em]">
                  About Dayal Builders
                </p>
                <h2 className="dayal-section-title mt-3 leading-snug">
                  The Prominent Entities In The Real Estate Industry In Jamshedpur
                </h2>
                <p className="dayal-body mt-5">{ABOUT_INTRO}</p>
                <p className="dayal-body mt-4">{ABOUT_EXTENDED}</p>
                <a
                  href="https://www.dayalbuilder.com/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dayal-btn-outline mt-8 inline-flex"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
