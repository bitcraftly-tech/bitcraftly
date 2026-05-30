"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Skip fade-in — required for above-fold video (iOS blocks autoplay in opacity:0 parents) */
  instant?: boolean;
};

export default function DayalReveal({ children, className, delay = 0, id, instant = false }: Props) {
  const reduce = useReducedMotion();
  if (reduce || instant) return <div id={id} className={className}>{children}</div>;

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
