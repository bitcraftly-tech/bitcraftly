"use client";

import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { ABOUT_EXTENDED, ABOUT_INTRO, PROPRIETOR } from "@/lib/dayal/data";

export default function DayalAboutTrust() {
  return (
    <section id="about" className="dayal-section dayal-section-ivory">
      <div className="dayal-container">
        <DayalReveal>
          <div className="dayal-card-premium">
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-[300px] lg:col-span-4">
                <Image
                  src={PROPRIETOR.image}
                  alt={PROPRIETOR.name}
                  fill
                  className="object-cover object-top"
                  sizes="33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--dayal-navy) 0%, transparent 55%), linear-gradient(to right, transparent 60%, var(--dayal-cream) 100%)",
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6 text-white lg:bottom-8 lg:left-8">
                  <p className="dayal-eyebrow !text-[var(--dayal-gold-light)] before:bg-[var(--dayal-gold)]">
                    {PROPRIETOR.role}
                  </p>
                  <h2 className="dayal-serif mt-2 text-2xl font-semibold">{PROPRIETOR.name}</h2>
                  <p className="mt-1 text-sm text-white/75">{PROPRIETOR.company}</p>
                </div>
              </div>

              <div className="p-8 lg:col-span-8 lg:p-12">
                <p className="dayal-eyebrow">About Dayal Builders</p>
                <h2 className="dayal-heading dayal-heading-lg mt-4">
                  The Prominent Entities In The Real Estate Industry In Jamshedpur
                </h2>
                <div className="dayal-gold-line mt-5" />
                <p className="mt-6 text-sm leading-relaxed dayal-text-muted sm:text-base">{ABOUT_INTRO}</p>
                <p className="mt-4 text-sm leading-relaxed dayal-text-muted sm:text-base">{ABOUT_EXTENDED}</p>
                <a
                  href="https://www.dayalbuilder.com/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dayal-btn-outline mt-10 inline-flex"
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
