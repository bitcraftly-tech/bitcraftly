"use client";

import type { ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right";

type FadeInOnViewProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: RevealDirection;
  /** @deprecated Entrance animations disabled — content renders immediately. */
  eager?: boolean;
};

/** Passthrough wrapper — page content renders immediately with no scroll reveal. */
export default function FadeInOnView({ children, className = "" }: FadeInOnViewProps) {
  if (className) {
    return <div className={className.trim()}>{children}</div>;
  }
  return <>{children}</>;
}
