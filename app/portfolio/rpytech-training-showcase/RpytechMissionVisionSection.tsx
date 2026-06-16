"use client";

import { CheckCircle2, Eye, Target } from "lucide-react";
import type { CSSProperties } from "react";

import { RPYTECH_CONTAINER, RPYTECH_MISSION_VISION } from "@/lib/rpytechShowcaseData";

import { useRpytechReveal } from "./useRpytechReveal";

const MV_ICONS = {
  target: Target,
  eye: Eye,
} as const;

export default function RpytechMissionVisionSection() {
  const { ref, visible } = useRpytechReveal();

  const cards = [RPYTECH_MISSION_VISION.mission, RPYTECH_MISSION_VISION.vision] as const;

  return (
    <section
      id="mission-vision"
      ref={ref}
      className={`rpytech-mv-section rpytech-page-section scroll-mt-28${visible ? " rpytech-mv-section--visible" : ""}`}
    >
      <div className={RPYTECH_CONTAINER}>
        <p
          className="rpytech-section-label rpytech-reveal"
          style={{ "--reveal-delay": "0ms" } as CSSProperties}
        >
          {RPYTECH_MISSION_VISION.label}
        </p>
        <h2
          className="rpytech-section-title rpytech-reveal"
          style={{ "--reveal-delay": "60ms" } as CSSProperties}
        >
          {RPYTECH_MISSION_VISION.title}
        </h2>
        <div
          className="rpytech-section-divider rpytech-reveal"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        />

        <div className="rpytech-mv-grid">
          {cards.map((card, cardIndex) => {
            const Icon = MV_ICONS[card.icon];
            const tone = cardIndex === 0 ? "mission" : "vision";

            return (
              <article
                key={card.title}
                className={`rpytech-mv-card rpytech-mv-card--${tone} rpytech-reveal`}
                style={{ "--reveal-delay": `${180 + cardIndex * 120}ms` } as CSSProperties}
              >
                <div className="rpytech-mv-card-head">
                  <div className="rpytech-mv-icon" aria-hidden="true">
                    <Icon className="size-5" />
                  </div>
                  <h3>{card.title}</h3>
                </div>
                <p className="rpytech-mv-body">{card.body}</p>
                <ul className="rpytech-mv-points">
                  {card.points.map((point, pointIndex) => (
                    <li
                      key={point}
                      className="rpytech-mv-point rpytech-reveal"
                      style={
                        {
                          "--reveal-delay": `${320 + cardIndex * 120 + pointIndex * 70}ms`,
                        } as CSSProperties
                      }
                    >
                      <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
