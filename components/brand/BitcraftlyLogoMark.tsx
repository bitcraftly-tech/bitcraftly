"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { logoWrapVariants } from "@/components/loading/loaderMotion";

export type BitcraftlyLogoSize = "xs" | "nav" | "sm" | "loader" | "md" | "lg";

type BitcraftlyLogoMarkProps = {
  className?: string;
  size?: BitcraftlyLogoSize;
  animated?: boolean;
  /** Animated gradient through logo shape (loader) */
  colorShift?: boolean;
};

const SIZES_PX: Record<BitcraftlyLogoSize, number> = {
  xs: 28,
  nav: 32,
  sm: 40,
  loader: 38,
  md: 72,
  lg: 96,
};

export const LOGO_MARK_FRAME = "";

const LOGO_SRC = "/brand/bitcraftly-mark.png";

const MASK_STYLE = {
  WebkitMaskImage: `url(${LOGO_SRC})`,
  maskImage: `url(${LOGO_SRC})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

const SHIFT_GRADIENT =
  "linear-gradient(125deg, #7c3aed 0%, #a78bfa 22%, #4f46e5 45%, #111827 68%, #c4b5fd 85%, #7c3aed 100%)";

export default function BitcraftlyLogoMark({
  className = "",
  size = "md",
  animated = false,
  colorShift = false,
}: BitcraftlyLogoMarkProps) {
  const reduceMotion = useReducedMotion();
  const px = SIZES_PX[size];
  const useMotion = animated && !reduceMotion;
  const useColorShift = colorShift && !reduceMotion;

  const staticImage = (
    <Image
      src={LOGO_SRC}
      alt=""
      width={px}
      height={px}
      className={`block shrink-0 ${className}`}
      style={{ width: px, height: px }}
      priority={size === "lg" || size === "md" || size === "loader"}
      aria-hidden
    />
  );

  if (!useMotion && !useColorShift) {
    return staticImage;
  }

  const inner = useColorShift ? (
    <div className={`relative shrink-0 leading-none ${className}`} style={{ width: px, height: px }}>
      <div className="size-full" style={MASK_STYLE}>
        <motion.div
          className="size-full"
          style={{
            background: SHIFT_GRADIENT,
            backgroundSize: "280% 280%",
          }}
          animate={{
            backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"],
          }}
          transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
        />
      </div>
    </div>
  ) : (
    staticImage
  );

  if (!useMotion) {
    return inner;
  }

  return (
    <motion.div
      className="shrink-0 leading-none"
      variants={logoWrapVariants}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: 0.4 }}
      >
        {inner}
      </motion.div>
    </motion.div>
  );
}
