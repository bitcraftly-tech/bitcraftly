import type { HTMLAttributes, ReactNode } from 'react';
import type { Responsive } from '../typography/types';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ContainerElement = 'div' | 'section' | 'main' | 'article';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: Responsive<ContainerSize>;
  as?: ContainerElement;
  children: ReactNode;
}
