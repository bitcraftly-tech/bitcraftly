import type { HTMLAttributes, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export type ContainerElement = "div" | "section" | "main" | "article";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: ContainerSize;
  as?: ContainerElement;
  children: ReactNode;
}
