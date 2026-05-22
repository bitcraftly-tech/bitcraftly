"use client";

import { Play } from "lucide-react";
import Image from "next/image";

import DayalCounter from "@/components/dayal/DayalCounter";
import DayalReveal from "@/components/dayal/DayalReveal";
import { METRICS } from "@/lib/dayal/data";

export default function DayalAboutTrust() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal>
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#0b1633]/8 ring-1 ring-[#0b1633]/5">
            <div className="grid lg:grid-cols-12">
              <div className="bg-[#0b1633] p-8 text-white lg:col-span-4 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a46b]">
                  About the Project
                </p>
                <h2 className="dayal-serif mt-3 text-2xl font-semibold leading-snug sm:text-3xl">
                  A New Standard of Modern Living
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Dayal Builders brings township-scale planning, premium finishes, and family-first
                  design to Govindpur — where trust meets contemporary architecture.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 p-8 sm:grid-cols-4 lg:col-span-5 lg:p-10">
                {METRICS.map((m) => (
                  <div key={m.label} className="text-center sm:text-left">
                    <p className="dayal-serif text-3xl font-bold text-[#0b1633] sm:text-4xl">
                      <DayalCounter value={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#5c6478]">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative min-h-[220px] lg:col-span-3">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                  alt="Dayal City township aerial view"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b1633]/40">
                  <button
                    type="button"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0b1633] shadow-lg transition hover:scale-105"
                    aria-label="Play project video"
                  >
                    <Play className="h-7 w-7 fill-[#0b1633]" />
                  </button>
                  <p className="mt-3 px-4 text-center text-xs font-medium text-white">
                    Explore Dayal City in 60 Seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
