import type { ReactNode } from "react";
import type { HeadingLevel } from "@/components/ui/typography";

export type SectionHeaderAlign = "left" | "center";

export type SectionHeaderMaxWidth = "sm" | "md" | "lg";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: SectionHeaderAlign;
  maxWidth?: SectionHeaderMaxWidth;
  headingLevel?: HeadingLevel;
  id?: string;
  className?: string;
  children?: ReactNode;
}
