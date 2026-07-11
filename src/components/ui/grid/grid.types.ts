import type { HTMLAttributes, ReactNode } from "react";

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;

export type GridGap = "0" | "1" | "2" | "3" | "4" | "6" | "8";

export type GridElement = "div" | "section" | "ul" | "ol";

export interface GridResponsiveColumns {
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
  xl?: GridColumns;
}

export interface GridProps extends HTMLAttributes<HTMLElement> {
  cols?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
  xl?: GridColumns;
  gap?: GridGap;
  as?: GridElement;
  children: ReactNode;
}
