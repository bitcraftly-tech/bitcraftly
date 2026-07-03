"use client";

import type { ReactNode } from "react";

type SkipScrollRevealProps = {
  children: ReactNode;
};

/** Direct child of MarketingScrollMain — opts out of fade-in wrapper. */
export default function SkipScrollReveal({ children }: SkipScrollRevealProps) {
  return <div data-skip-scroll-reveal>{children}</div>;
}
