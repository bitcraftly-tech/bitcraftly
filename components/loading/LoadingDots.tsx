"use client";

import { motion, useReducedMotion } from "framer-motion";

import { dotContainerVariants, dotVariants } from "@/components/loading/loaderMotion";

type LoadingDotsProps = {
  count?: number;
  size?: "sm" | "md";
  className?: string;
  animated?: boolean;
};

export default function LoadingDots({
  count = 5,
  size = "md",
  className = "",
  animated = true,
}: LoadingDotsProps) {
  const reduceMotion = useReducedMotion();
  const dotSize = size === "sm" ? "size-1.5" : "size-2 sm:size-2.5";
  const useMotion = animated && !reduceMotion;

  if (!useMotion) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`bc-loader-dot-fallback ${dotSize} rounded-full`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`flex items-center justify-center gap-2 ${className}`}
      variants={dotContainerVariants}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span key={i} className={`${dotSize} rounded-full bg-[#7c3aed]`} variants={dotVariants} custom={i} />
      ))}
    </motion.div>
  );
}
