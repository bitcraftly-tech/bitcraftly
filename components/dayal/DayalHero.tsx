"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Download,
  MapPin,
  Shield,
  Sparkles,
  HardHat,
  Building2,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { DAYAL, HERO_DESCRIPTION, HERO_IMAGE, TRUST_HIGHLIGHTS } from "@/lib/dayal/data";

const TRUST_ICONS = [HardHat, Building2, Sparkles, Shield, HeartHandshake] as const;

export default function DayalHero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="dayal-hero">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!reduce &&
          Array.from({ length: 16 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${6 + i * 6}%`,
                top: `${10 + (i % 6) * 12}%`,
                background: "var(--dayal-gold)",
                opacity: 0.35,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: 5 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </div>

      <div className="dayal-container relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <DayalReveal>
          <span className="dayal-pill">{DAYAL.tagline}</span>
          <h1 className="dayal-heading dayal-heading-xl dayal-serif mt-8">
            {DAYAL.brand.toUpperCase()}
          </h1>
          <p className="dayal-serif mt-3 text-xl font-medium tracking-[0.14em] sm:text-2xl dayal-gold-text">
            {DAYAL.heroHighlight}
          </p>
          <div className="dayal-gold-line mt-6" />
          <p className="mt-5 flex items-center gap-2 text-sm dayal-text-muted">
            <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--dayal-gold)" }} aria-hidden />
            {DAYAL.location}
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed dayal-text-muted">{HERO_DESCRIPTION}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="dayal-btn-primary">
              <Calendar className="h-4 w-4" />
              Let&apos;s Connect
            </a>
            <a
              href={DAYAL.website}
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-outline"
            >
              <Download className="h-4 w-4" />
              Visit Official Site
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {TRUST_HIGHLIGHTS.map((label, i) => {
              const Icon = TRUST_ICONS[i] ?? Shield;
              return (
                <li key={label} className="flex flex-col items-center text-center">
                  <span className="dayal-trust-icon mb-2.5">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide leading-tight opacity-80">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </DayalReveal>

        <DayalReveal delay={0.15} className="relative">
          <div className="dayal-image-frame aspect-[4/3]">
            <Image
              src={HERO_IMAGE}
              alt="Dayal Builders premium township — evening aerial view"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="dayal-float-card absolute -bottom-5 -left-5 hidden sm:block">
            <p className="dayal-eyebrow !text-[0.6rem] !tracking-[0.2em] before:w-4">Est.</p>
            <p className="dayal-serif mt-1 text-xl font-semibold">Jamshedpur</p>
            <p className="mt-0.5 text-xs dayal-text-muted">Premium Real Estate</p>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
