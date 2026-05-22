import type { Variants } from "framer-motion";

import { LOADER_EASE, LOADER_SPRING } from "@/lib/loader/config";

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: LOADER_EASE } },
  exit: { opacity: 0, transition: { duration: 0.45, ease: LOADER_EASE } },
};

export const contentVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: LOADER_EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.4, ease: LOADER_EASE },
  },
};

/** Stagger: logo → title → tagline → dots → label */
export const loaderStackVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

export const loaderItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: LOADER_EASE },
  },
};

export const logoWrapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: LOADER_SPRING,
  },
};

/** Gentle float after logo appears */
export const logoFloatVariants: Variants = {
  visible: {
    y: [0, -5, 0],
    transition: {
      y: { duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: 0.35 },
    },
  },
};

export const logoGlowPulseVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: [0.35, 0.65, 0.35],
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 2.6, ease: "easeInOut", repeat: Infinity, delay: 0.2 },
  },
};

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: LOADER_EASE } },
};

export const brandTitleVariants: Variants = {
  hidden: { opacity: 0, y: 4, letterSpacing: "0.02em" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0em",
    transition: { duration: 0.45, ease: LOADER_EASE },
  },
};

export const labelPulseVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.45, 1, 0.45],
    transition: { duration: 1.8, ease: "easeInOut", repeat: Infinity, delay: 0.5 },
  },
};

export const dotContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 4 },
  visible: (i: number) => ({
    opacity: [0.4, 1, 0.4],
    scale: [0.8, 1.12, 0.8],
    y: [0, -3, 0],
    backgroundColor: "#7c3aed",
    transition: {
      duration: 1.15,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.08,
      delay: i * 0.1,
    },
  }),
};

export const shimmerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.35, 0.6, 0.35],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
  },
};

/** Aura — expanding rings from logo center */
export const auraRingVariants: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  visible: (i: number) => ({
    opacity: [0.55, 0],
    scale: [0.55, 1.35],
    transition: {
      duration: 2.4,
      ease: "easeOut",
      repeat: Infinity,
      delay: i * 0.75,
    },
  }),
};

export const auraOrbitVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    rotate: 360,
    transition: {
      opacity: { duration: 0.35, ease: LOADER_EASE },
      rotate: { duration: 3.6, ease: "linear", repeat: Infinity },
    },
  },
};

export const auraProgressVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.6 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.4, ease: LOADER_EASE },
  },
};

export const auraSweepVariants: Variants = {
  visible: {
    x: ["-120%", "220%"],
    transition: { duration: 1.35, ease: "easeInOut", repeat: Infinity },
  },
};
