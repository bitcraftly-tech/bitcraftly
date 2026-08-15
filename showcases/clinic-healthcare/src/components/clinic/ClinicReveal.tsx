'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealTag = 'div' | 'li' | 'article' | 'section';
type RevealDirection = 'up' | 'left' | 'right' | 'scale';

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before the reveal starts — used to stagger siblings. */
  delay?: number;
  direction?: RevealDirection;
  /** Render as a semantic element other than `div` (list items, cards…). */
  as?: RevealTag;
  /**
   * Horizontal rails / overflow clippers — skip opacity animation so off-screen
   * cards never look empty or collapsed.
   */
  rail?: boolean;
};

const OFFSETS: Record<RevealDirection, { x?: number; y?: number; scale?: number }> = {
  up: { y: 24 },
  left: { x: -28 },
  right: { x: 28 },
  scale: { scale: 0.96 },
};

/** Subtle scroll-in reveal shared by every Clinic & Healthcare section. */
export default function ClinicReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
  rail = false,
}: Props) {
  const reduceMotion = useReducedMotion();

  const MotionTag =
    as === 'li'
      ? motion.li
      : as === 'article'
        ? motion.article
        : as === 'section'
          ? motion.section
          : motion.div;

  if (reduceMotion || rail) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -32px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
