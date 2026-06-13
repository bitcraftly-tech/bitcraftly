"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import type { GeographicData } from "@/lib/analytics-dashboard/types";

type GeographicAnalyticsProps = {
  data: GeographicData;
};

/** Stylized India outline with city markers — lightweight SVG, no external map lib */
function IndiaMapSvg({ cities }: { cities: GeographicData["cities"] }) {
  const maxUsers = Math.max(...cities.map((c) => c.users), 1);

  const cityCoords: Record<string, { x: number; y: number }> = {
    "Delhi NCR": { x: 148, y: 95 },
    Bangalore: { x: 138, y: 248 },
    Mumbai: { x: 72, y: 178 },
    Hyderabad: { x: 128, y: 210 },
    Pune: { x: 88, y: 198 },
  };

  return (
    <svg viewBox="0 0 220 320" className="h-full w-full" aria-hidden>
      <path
        d="M108 18 C128 22 148 38 158 58 C168 72 178 88 182 108 C188 128 192 148 188 168 C184 188 176 208 168 228 C158 252 142 272 122 286 C102 298 82 304 68 296 C54 288 48 268 52 248 C56 228 62 208 72 188 C82 168 92 148 98 128 C102 108 100 88 96 68 C92 48 98 28 108 18 Z"
        fill="currentColor"
        className="text-[#2563EB]/8 dark:text-[#2563EB]/15"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ color: "#2563EB" }}
      />
      {cities.map((city) => {
        const pos = cityCoords[city.name];
        if (!pos) return null;
        const r = 4 + (city.users / maxUsers) * 10;
        return (
          <g key={city.name}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={r}
              fill="#2563EB"
              fillOpacity={0.25}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={4}
              fill="#2563EB"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function GeographicAnalytics({ data }: GeographicAnalyticsProps) {
  const sorted = [...data.cities].sort((a, b) => b.users - a.users);
  const max = sorted[0]?.users ?? 1;

  return (
    <section className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-[#2563EB]" />
        <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">Geographic Analytics</h3>
      </div>
      <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">Top cities in India</p>

      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        <div className="flex h-56 items-center justify-center rounded-xl bg-bg-secondary p-4 dark:bg-dark-bg-secondary lg:h-64">
          <IndiaMapSvg cities={data.cities} />
        </div>
        <div className="space-y-3">
          {sorted.map((city, index) => (
            <div key={city.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-text-primary dark:text-dark-text-primary">
                  {index + 1}. {city.name}
                </span>
                <span className="font-semibold text-[#2563EB]">{city.users.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(city.users / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
