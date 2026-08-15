'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealTag = 'div' | 'li' | 'article' | 'section';
type RevealDirection = 'up' | 'left' | 'right' | 'scale';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  as?: RevealTag;
  /** Skip animation inside horizontal rails / overflow clippers. */
  rail?: boolean;
  id?: string;
};

const OFFSETS: Record<RevealDirection, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -24 },
  right: { x: 24 },
  scale: { scale: 0.96 },
};

/** Subtle scroll-in reveal for FitRally sections. */
export default function GymReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
  rail = false,
  id,
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
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
