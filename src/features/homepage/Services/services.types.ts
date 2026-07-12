import type { IconName } from "@/components/ui/icon";

export interface HomepageService {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  ctaLabel: string;
}
