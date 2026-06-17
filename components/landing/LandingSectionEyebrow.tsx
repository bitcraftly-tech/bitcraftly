import type { ReactNode } from "react";

type LandingSectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export default function LandingSectionEyebrow({ children, className = "" }: LandingSectionEyebrowProps) {
  return <p className={`lp-section-eyebrow ${className}`.trim()}>{children}</p>;
}
