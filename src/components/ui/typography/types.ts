import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingElement;
  level?: Responsive<HeadingLevel>;
  children: ReactNode;
}

export type TextSize = 'sm' | 'base' | 'lg';

export type TextElement = 'p' | 'span' | 'div';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: Responsive<TextSize>;
  muted?: boolean;
  children: ReactNode;
}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}
