import type { HTMLAttributes, ReactNode } from "react";
import type { Responsive } from "../typography/types";

export type CardVariant = "default" | "outlined" | "elevated" | "glass";

export type CardPadding = "none" | "baseline" | "sm" | "md" | "lg";

export type CardElement = "div" | "article" | "section" | "aside" | "li";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  padding?: Responsive<CardPadding>;
  as?: CardElement;
  children: ReactNode;
}
