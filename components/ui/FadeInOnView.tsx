"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type FadeInOnViewProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Above-the-fold — visible immediately for LCP (no opacity-0 until JS). */
  eager?: boolean;
};

export default function FadeInOnView({ children, className = "", delayMs = 0, eager = false }: FadeInOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
