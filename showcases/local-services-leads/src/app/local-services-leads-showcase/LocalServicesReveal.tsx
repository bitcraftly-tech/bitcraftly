'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealTag = 'div' | 'li' | 'article' | 'section' | 'blockquote';
type RevealDirection = 'up' | 'left' | 'right' | 'scale';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  as?: RevealTag;
  id?: string;
};

const OFFSETS: Record<RevealDirection, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -24 },
  right: { x: 24 },
  scale: { scale: 0.96 },
};

/** Scroll-triggered reveal that fails open when the user prefers reduced motion. */
export default function LocalServicesReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
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
          : as === 'blockquote'
            ? motion.blockquote
            : motion.div;

  if (reduceMotion) {
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
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -48px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
