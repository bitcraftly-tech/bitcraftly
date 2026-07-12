import type { ReactNode } from "react";

export type TextLinkVariant = "default" | "primary" | "muted";

export type TextLinkIcon = "none" | "right-arrow" | "up-right";

export interface TextLinkProps {
  href: string;
  children: ReactNode;
  variant?: TextLinkVariant;
  icon?: TextLinkIcon;
  underlineOnHover?: boolean;
  external?: boolean;
  className?: string;
}
