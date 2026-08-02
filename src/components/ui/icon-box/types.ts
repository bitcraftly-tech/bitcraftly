import type { ReactNode } from 'react';
import type { Responsive } from '../typography/types';
import type { IconName } from '../icon/types';

export type IconBoxVariant = 'default' | 'primary' | 'secondary' | 'glass';

export type IconBoxSize = 'sm' | 'md' | 'lg';

export interface IconBoxProps {
  icon: IconName;
  variant?: IconBoxVariant;
  size?: Responsive<IconBoxSize>;
  className?: string;
  iconTitle?: string;
  children?: ReactNode;
}
