import type { HTMLAttributes, ReactNode } from "react";
import type { Responsive } from "../typography/types";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export type SectionBackground = "default" | "surface" | "muted" | "primary";

export type SectionElement = "section" | "main" | "article" | "aside";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: Responsive<SectionSpacing>;
  background?: SectionBackground;
  as?: SectionElement;
  children: ReactNode;
}
