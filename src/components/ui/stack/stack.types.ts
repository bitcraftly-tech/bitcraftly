import type { HTMLAttributes, ReactNode } from "react";

export type StackSpacing = "0" | "1" | "2" | "3" | "4" | "6" | "8";

export type StackAlign = "start" | "center" | "end" | "stretch";

export type StackElement = "div" | "section" | "ul" | "ol" | "nav";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  spacing?: StackSpacing;
  align?: StackAlign;
  as?: StackElement;
  children: ReactNode;
}
