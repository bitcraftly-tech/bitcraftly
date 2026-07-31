import type { IconName } from '@/components/ui/icon';

export interface WhyBitcraftlyCard {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface WhyBitcraftlyCta {
  label: string;
  href: string;
}
