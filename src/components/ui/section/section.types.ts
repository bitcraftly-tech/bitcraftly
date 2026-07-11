import type { HTMLAttributes, ReactNode } from "react";

export type SectionBackground = "default" | "surface" | "muted" | "none";

export type SectionSpacing = "sm" | "md" | "lg" | "xl";

export type SectionElement = "section" | "div";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  spacing?: SectionSpacing;
  as?: SectionElement;
  children: ReactNode;
}
