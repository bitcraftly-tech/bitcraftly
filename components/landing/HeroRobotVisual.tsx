"use client";

import Image from "next/image";

import { MASCOT } from "@/lib/mascotAssets";

const FLOATING_CARDS = [
  { label: "React.js", icon: "⚛️", className: "lp-hero-float--react" },
  { label: "Next.js", icon: "▲", className: "lp-hero-float--next" },
  { label: "AI Solutions", icon: "✨", className: "lp-hero-float--ai" },
  { label: "Performance", icon: "⚡", className: "lp-hero-float--perf" },
  { label: "SEO Optimized", icon: "🔍", className: "lp-hero-float--seo" },
] as const;

export default function HeroRobotVisual() {
  return (
    <div className="lp-hero-robot" aria-hidden>
      <div className="lp-hero-robot__glow lp-hero-robot__glow--primary" />
      <div className="lp-hero-robot__glow lp-hero-robot__glow--secondary" />
      <div className="lp-hero-robot__stage">
        {FLOATING_CARDS.map((card) => (
          <div key={card.label} className={`lp-hero-float-card ${card.className}`}>
            <span className="lp-hero-float-card__icon">{card.icon}</span>
            <span className="lp-hero-float-card__label">{card.label}</span>
          </div>
        ))}
        <Image
          src={MASCOT.hero}
          alt=""
          width={480}
          height={560}
          priority
          className="lp-hero-robot__img"
        />
      </div>
    </div>
  );
}
