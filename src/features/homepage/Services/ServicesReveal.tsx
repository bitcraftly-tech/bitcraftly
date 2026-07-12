"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ServicesRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function ServicesReveal({
  children,
  className,
  delayMs = 0,
}: ServicesRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("services-reveal", visible && "is-visible", className)}
      style={
        visible && delayMs > 0
          ? { transitionDelay: `${delayMs}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
