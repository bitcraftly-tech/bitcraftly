"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type FadeInOnViewProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export default function FadeInOnView({ children, className = "", delayMs = 0 }: FadeInOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, []);

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
