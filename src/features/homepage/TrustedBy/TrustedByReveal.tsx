"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TrustedByRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function TrustedByReveal({
  children,
  className,
  delayMs = 0,
}: TrustedByRevealProps) {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("trusted-by-reveal", visible && "is-visible", className)}
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
