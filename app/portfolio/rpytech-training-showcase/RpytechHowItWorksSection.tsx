"use client";

import {
  Award,
  Calendar,
  Gem,
  GraduationCap,
  MapPin,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { RPYTECH_CONTAINER, RPYTECH_HOW_IT_WORKS } from "@/lib/rpytechShowcaseData";

import { useRpytechReveal } from "./useRpytechReveal";

const STEP_ICONS = {
  cert: Award,
  schedule: Calendar,
  training: GraduationCap,
  location: MapPin,
  exam: Monitor,
  future: Gem,
} as const;

type HiWStep = (typeof RPYTECH_HOW_IT_WORKS.left)[number] | (typeof RPYTECH_HOW_IT_WORKS.right)[number];

function HowItWorksStep({
  step,
  side,
  delay,
}: {
  step: HiWStep;
  side: "left" | "right";
  delay: number;
}) {
  const Icon = STEP_ICONS[step.icon];

  return (
    <article
      className={`rpytech-hiw-step rpytech-hiw-step--${side} rpytech-hiw-step--${step.tone} rpytech-reveal`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      <div className="rpytech-hiw-step-copy">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
      <div className="rpytech-hiw-step-icon" aria-hidden="true">
        <Icon className="size-6" strokeWidth={1.75} />
      </div>
    </article>
  );
}

export default function RpytechHowItWorksSection() {
  const { ref, visible } = useRpytechReveal(0.1);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className={`rpytech-hiw-section rpytech-page-section scroll-mt-28${visible ? " rpytech-hiw-section--visible" : ""}`}
    >
      <div className={RPYTECH_CONTAINER}>
        <p
          className="rpytech-section-label rpytech-section-label--left rpytech-reveal"
          style={{ "--reveal-delay": "0ms" } as CSSProperties}
        >
          {RPYTECH_HOW_IT_WORKS.label}
        </p>

        <div className="rpytech-hiw-layout">
          <div className="rpytech-hiw-col rpytech-hiw-col--left">
            {RPYTECH_HOW_IT_WORKS.left.map((step, index) => (
              <HowItWorksStep
                key={step.title}
                step={step}
                side="left"
                delay={120 + index * 90}
              />
            ))}
          </div>

          <div
            className="rpytech-hiw-center rpytech-reveal"
            style={{ "--reveal-delay": "200ms" } as CSSProperties}
          >
            <div className="rpytech-hiw-center-outer" aria-hidden="true">
              <span className="rpytech-hiw-center-arc rpytech-hiw-center-arc--tl" />
              <span className="rpytech-hiw-center-arc rpytech-hiw-center-arc--br" />
            </div>
            <div className="rpytech-hiw-center-ring">
              <div className="rpytech-hiw-center-inner">
                <Image
                  src={RPYTECH_HOW_IT_WORKS.centerImageUrl}
                  alt="RPYTech students ready for certification"
                  fill
                  className="rpytech-hiw-center-img"
                  sizes="(max-width: 900px) 70vw, 320px"
                />
              </div>
            </div>
          </div>

          <div className="rpytech-hiw-col rpytech-hiw-col--right">
            {RPYTECH_HOW_IT_WORKS.right.map((step, index) => (
              <HowItWorksStep
                key={step.title}
                step={step}
                side="right"
                delay={150 + index * 90}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
