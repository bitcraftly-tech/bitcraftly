"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { useMobileStaticEntrance } from "@/hooks/useMobileStaticEntrance";

export type RevealDirection = "up" | "down" | "left" | "right";

type FadeInOnViewProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: RevealDirection;
  /** Above-the-fold — visible immediately for LCP (no opacity-0 until JS). */
  eager?: boolean;
};

export default function FadeInOnView({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  eager = false,
}: FadeInOnViewProps) {
  const staticEntrance = useMobileStaticEntrance();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(eager || staticEntrance);

  useEffect(() => {
    if (eager || staticEntrance) return;
    if (!ref.current) return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      setIsVisible(true);
      observer.disconnect();
    }, 1200);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [eager, staticEntrance]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-section reveal-section--${direction} ${isVisible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
