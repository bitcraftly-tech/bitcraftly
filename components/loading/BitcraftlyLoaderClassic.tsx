"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import BitcraftlyLogoMark from "@/components/brand/BitcraftlyLogoMark";
import LoadingDots from "@/components/loading/LoadingDots";
import {
  brandTitleVariants,
  contentVariants,
  labelPulseVariants,
  loaderItemVariants,
  loaderStackVariants,
  logoGlowPulseVariants,
  overlayVariants,
  shimmerVariants,
  textVariants,
} from "@/components/loading/loaderMotion";
import { CONTENT_WIDTH_CLASSIC, GLOW, loaderShell, resolveLayout } from "@/components/loading/loaderShared";
import type { BitcraftlyLoaderProps } from "@/components/loading/loaderTypes";
import { LOADER_COPY } from "@/lib/loader/config";

export default function BitcraftlyLoaderClassic({
  show,
  instantEnter = false,
  variant,
  density: densityProp,
  theme: themeProp,
  onExitComplete,
}: BitcraftlyLoaderProps) {
  const reduceMotion = useReducedMotion();
  const motionOn = !reduceMotion;
  const { density, theme } = resolveLayout(variant, densityProp, themeProp);
  const { overlay, card, title, tagline, label, isCompact } = loaderShell(theme, density, CONTENT_WIDTH_CLASSIC);
  const logoSize = isCompact ? "sm" : "loader";
  const logoColorShift = motionOn && !isCompact;

  const m = (variants: typeof contentVariants) => (motionOn ? variants : undefined);
  const init = motionOn && !instantEnter ? "hidden" : false;
  const anim = motionOn ? "visible" : false;

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {show ? (
        <motion.div
          key={`loader-classic-${density}-${theme}`}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${overlay}`}
          variants={m(overlayVariants)}
          initial={init}
          animate={anim}
          exit={motionOn ? "exit" : undefined}
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label={`Loading ${LOADER_COPY.brand}`}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: GLOW[theme] }}
            variants={m(shimmerVariants)}
            initial={init}
            animate={anim}
            aria-hidden
          />

          <motion.div
            className={`relative z-10 mx-auto flex shrink-0 flex-col items-center text-center ${card}`}
            variants={m(contentVariants)}
            initial={init}
            animate={anim}
            exit={motionOn ? "exit" : undefined}
          >
            <motion.div
              className="flex flex-col items-center gap-0"
              variants={m(loaderStackVariants)}
              initial={init}
              animate={anim}
            >
              <motion.div variants={m(loaderItemVariants)} className="relative leading-none">
                <motion.div
                  className="absolute -inset-2 rounded-2xl bg-[#7c3aed]/12 blur-md"
                  variants={m(logoGlowPulseVariants)}
                  initial={init}
                  animate={anim}
                  aria-hidden
                />
                <BitcraftlyLogoMark
                  size={logoSize}
                  animated={motionOn}
                  colorShift={logoColorShift}
                  className="relative -mb-0.5 block"
                />
              </motion.div>

              {!isCompact ? (
                <>
                  <motion.p
                    className={`w-full font-[var(--font-inter)] text-lg font-bold leading-none tracking-tight sm:text-xl ${title}`}
                    variants={m(brandTitleVariants)}
                  >
                    {LOADER_COPY.brand}
                  </motion.p>
                  <motion.p
                    className={`mt-1.5 w-full text-xs font-normal leading-snug ${tagline}`}
                    variants={m(textVariants)}
                  >
                    {LOADER_COPY.tagline}
                  </motion.p>
                </>
              ) : (
                <motion.p
                  className={`text-xs font-semibold leading-none ${title}`}
                  variants={m(brandTitleVariants)}
                >
                  {LOADER_COPY.brand}
                </motion.p>
              )}
            </motion.div>

            {!isCompact ? (
              <motion.div variants={m(loaderItemVariants)} className="mt-2 flex w-full flex-col items-center gap-1">
                <LoadingDots count={5} size="sm" className="w-full justify-center" animated={motionOn} />
                <motion.p className={`text-xs leading-none ${label}`} variants={m(labelPulseVariants)} initial={init} animate={anim}>
                  {LOADER_COPY.label}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div variants={m(loaderItemVariants)} className="mt-2 w-full">
                <LoadingDots count={3} size="sm" className="w-full justify-center" animated={motionOn} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
