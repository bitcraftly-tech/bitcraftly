'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealTag = 'div' | 'li';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Render as a semantic list item when revealing `ul`/`ol` children */
  as?: RevealTag;
  /** Skip fade-in — required for above-fold video (iOS blocks autoplay in opacity:0 parents) */
  instant?: boolean;
};

export default function DayalReveal({
  children,
  className,
  delay = 0,
  id,
  as = 'div',
  instant = false,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce || instant) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const MotionTag = as === 'li' ? motion.li : motion.div;

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
