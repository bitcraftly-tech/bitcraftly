import type { IconName } from "@/components/ui/icon";

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface ProcessCtaContent {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}
