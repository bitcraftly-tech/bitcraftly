"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Download,
  MapPin,
  Shield,
  Sparkles,
  Trees,
  Building2,
  Lock,
} from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { DAYAL, HERO_DESCRIPTION, TRUST_HIGHLIGHTS } from "@/lib/dayal/data";

const TRUST_ICONS = [Lock, Shield, Sparkles, Trees, Building2] as const;

export default function DayalHero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!reduce &&
          Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#c8a46b]/40"
              style={{ left: `${8 + i * 7}%`, top: `${12 + (i % 5) * 14}%` }}
              animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <DayalReveal>
          <span className="inline-flex rounded-full bg-[#0b1633] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Premium Living. Prime Location.
          </span>
          <h1 className="dayal-serif mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-[#0b1633] sm:text-5xl lg:text-6xl">
            DAYAL BUILDERS
          </h1>
          <p className="dayal-serif mt-2 text-xl font-medium tracking-[0.2em] text-[#c8a46b] sm:text-2xl">
            PREMIUM TOWNSHIP
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#5c6478]">
            <MapPin className="h-4 w-4 text-[#c8a46b]" aria-hidden />
            {DAYAL.location}
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5c6478]">
            {HERO_DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="dayal-btn-primary">
              <Calendar className="h-4 w-4" />
              Book Site Visit
            </a>
            <a href="#contact" className="dayal-btn-outline">
              <Download className="h-4 w-4" />
              Download Brochure
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TRUST_HIGHLIGHTS.map((label, i) => {
              const Icon = TRUST_ICONS[i] ?? Shield;
              return (
                <li key={label} className="flex flex-col items-center text-center">
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a46b]/40 text-[#c8a46b]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-[#0b1633]/80">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </DayalReveal>

        <DayalReveal delay={0.15} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-[#0b1633]/20 ring-1 ring-[#0b1633]/10">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85"
              alt="Dayal City premium township rendering at dusk"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1633]/50 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-white px-5 py-4 shadow-xl sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#c8a46b]">RERA</p>
            <p className="dayal-serif text-lg font-semibold text-[#0b1633]">Approved</p>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
