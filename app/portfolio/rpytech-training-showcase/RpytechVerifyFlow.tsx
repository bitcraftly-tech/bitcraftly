"use client";

import { Award, FileText, Lightbulb, UserRound } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { RPYTECH_CONTAINER, RPYTECH_VERIFICATION } from "@/lib/rpytechShowcaseData";

import { useRpytechReveal } from "./useRpytechReveal";

const FLOW_ICONS = {
  student: Lightbulb,
  certificate: Award,
  marksheet: FileText,
  partner: UserRound,
} as const;

function flowDuration(value: number) {
  return Math.min(2200, 600 + Math.log10(Math.max(value, 10)) * 420);
}

function AnimatedFlowCount({
  value,
  active,
  delay,
}: {
  value: number;
  active: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      hasAnimated.current = true;
      setDisplay(value);
      return;
    }

    let raf = 0;
    const timeout = window.setTimeout(() => {
      hasAnimated.current = true;
      const duration = flowDuration(value);
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, value, delay]);

  return <span className="rpytech-verify-flow-count">{display.toLocaleString("en-IN")}</span>;
}

function VerifyConnector({ active, delay }: { active: boolean; delay: number }) {
  return (
    <div
      className={`rpytech-verify-connector${active ? " rpytech-verify-connector--active" : ""}`}
      style={{ "--connector-delay": `${delay}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 72 28" preserveAspectRatio="none">
        <path
          className="rpytech-verify-connector-path"
          d="M4 18 C24 2, 48 2, 68 18"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path className="rpytech-verify-connector-head" d="M62 14 L68 18 L62 22 Z" />
      </svg>
    </div>
  );
}

function scrollToTarget(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function RpytechVerifyFlow() {
  const { ref, visible } = useRpytechReveal(0.15);

  return (
    <section
      id="verification"
      ref={ref}
      className={`rpytech-verify-section rpytech-page-section scroll-mt-28${visible ? " rpytech-verify-section--visible" : ""}`}
    >
      <div className={RPYTECH_CONTAINER}>
        <p
          className="rpytech-section-label rpytech-reveal"
          style={{ "--reveal-delay": "0ms" } as CSSProperties}
        >
          VERIFY & PARTNER
        </p>
        <h2
          className="rpytech-section-title rpytech-reveal"
          style={{ "--reveal-delay": "60ms" } as CSSProperties}
        >
          Quick Verification & Partnership
        </h2>
        <div
          className="rpytech-section-divider rpytech-reveal"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        />

        <div className="rpytech-verify-flow">
          {RPYTECH_VERIFICATION.map((item, index) => {
            const Icon = FLOW_ICONS[item.icon];
            const stepDelay = 180 + index * 140;

            return (
              <div key={item.title} className="rpytech-verify-flow-item-wrap">
                <article
                  className={`rpytech-verify-flow-step rpytech-verify-flow-step--${item.tone} rpytech-reveal`}
                  style={{ "--reveal-delay": `${stepDelay}ms` } as CSSProperties}
                >
                  <div className="rpytech-verify-flow-icon" aria-hidden="true">
                    <Icon className="size-7" strokeWidth={1.75} />
                    <span className="rpytech-verify-flow-live">Live</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="rpytech-verify-flow-stat">
                    <AnimatedFlowCount value={item.count} active={visible} delay={stepDelay + 120} />
                    <span>{item.countLabel}</span>
                  </p>
                  <button
                    type="button"
                    className="rpytech-verify-flow-action"
                    onClick={() => scrollToTarget(item.targetId)}
                  >
                    {item.action}
                  </button>
                </article>

                {index < RPYTECH_VERIFICATION.length - 1 ? (
                  <VerifyConnector active={visible} delay={stepDelay + 80} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
