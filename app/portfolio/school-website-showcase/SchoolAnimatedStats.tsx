"use client";

import { Award, Calendar, Trophy, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { STATS_BAR } from "./school-demo-data";

const ICONS = { users: Users, award: Award, calendar: Calendar, trophy: Trophy } as const;

function parseStatValue(raw: string) {
  const num = parseInt(raw.replace(/\D/g, ""), 10);
  const suffix = raw.replace(/[0-9]/g, "");
  return { num: Number.isNaN(num) ? 0 : num, suffix };
}

function AnimatedStat({ value, label, icon, embedded }: (typeof STATS_BAR)[number] & { embedded?: boolean }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { num, suffix } = parseStatValue(value);
  const Icon = ICONS[icon as keyof typeof ICONS];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let started = false;

    const run = () => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - p) ** 3;
        setDisplay(Math.round(num * eased));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [num]);

  const valueClass = embedded ? "text-[var(--school-orange)]" : "text-white";

  return (
    <div ref={ref} className="flex items-center justify-center gap-3 px-3 py-5 sm:px-5 lg:py-6">
      <Icon className="h-7 w-7 shrink-0 text-[var(--school-orange)] sm:h-8 sm:w-8" strokeWidth={1.5} aria-hidden />
      <div className="text-left">
        <p className={`text-xl font-bold tabular-nums sm:text-2xl ${valueClass}`}>
          {display}
          {suffix}
        </p>
        <p className="text-xs font-medium text-white/90 sm:text-sm">{label}</p>
      </div>
    </div>
  );
}

type SchoolAnimatedStatsProps = {
  embedded?: boolean;
  floating?: boolean;
};

export default function SchoolAnimatedStats({ embedded = false, floating = false }: SchoolAnimatedStatsProps) {
  const grid = (
    <div className="grid grid-cols-2 sm:grid-cols-4">
      {STATS_BAR.map((s, i) => (
        <div
          key={s.label}
          className={`${i > 0 ? "border-white/25 sm:border-l" : ""} ${i === 2 ? "border-t border-white/25 sm:border-t-0" : ""}`}
        >
          <AnimatedStat {...s} embedded={embedded} />
        </div>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className="school-hero-stats-panel w-full px-1 pb-0 pt-1 sm:px-2">
        {grid}
      </div>
    );
  }

  if (floating) {
    return (
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4 sm:px-6">
        <div className="school-stats-float mx-auto max-w-6xl overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(15,39,68,0.35)]">
          {grid}
        </div>
      </div>
    );
  }

  return <div className="school-stats-bar text-white">{grid}</div>;
}
