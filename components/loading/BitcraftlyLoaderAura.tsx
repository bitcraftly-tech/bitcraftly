"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import BitcraftlyLogoMark from "@/components/brand/BitcraftlyLogoMark";
import {
  auraOrbitVariants,
  auraProgressVariants,
  auraRingVariants,
  auraSweepVariants,
  brandTitleVariants,
  contentVariants,
  labelPulseVariants,
  loaderItemVariants,
  loaderStackVariants,
  overlayVariants,
  shimmerVariants,
  textVariants,
} from "@/components/loading/loaderMotion";
import { CONTENT_WIDTH_AURA, GLOW, loaderShell, resolveLayout } from "@/components/loading/loaderShared";
import type { BitcraftlyLoaderProps } from "@/components/loading/loaderTypes";
import { LOADER_COPY } from "@/lib/loader/config";

const ORBIT_DEGREES = [0, 120, 240] as const;

function AuraOrbitStage({
  size,
  motionOn,
  logoSize,
  colorShift,
}: {
  size: number;
  motionOn: boolean;
  logoSize: "sm" | "loader";
  colorShift: boolean;
}) {
  const radius = size / 2 - 5;
  const init = motionOn ? "hidden" : false;
  const anim = motionOn ? "visible" : false;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {motionOn
        ? [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute inset-0 rounded-full border border-[#7c3aed]/35"
              custom={i}
              variants={auraRingVariants}
              initial={init}
              animate={anim}
              aria-hidden
            />
          ))
        : (
          <span
            className="pointer-events-none absolute inset-[18%] rounded-full border border-[#7c3aed]/25"
            aria-hidden
          />
        )}

      {motionOn ? (
        <motion.div
          className="absolute inset-0"
          variants={auraOrbitVariants}
          initial={init}
          animate={anim}
          aria-hidden
        >
          {ORBIT_DEGREES.map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-[#7c3aed] shadow-[0_0_6px_rgba(124,58,237,0.55)]"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${radius}px)`,
              }}
            />
          ))}
        </motion.div>
      ) : (
        <span
          className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-[#7c3aed]"
          aria-hidden
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <BitcraftlyLogoMark size={logoSize} animated={motionOn} colorShift={colorShift} className="relative block" />
      </div>
    </div>
  );
}

function AuraProgressBar({
  motionOn,
  trackClass,
}: {
  motionOn: boolean;
  trackClass: string;
}) {
  const init = motionOn ? "hidden" : false;
  const anim = motionOn ? "visible" : false;

  return (
    <motion.div
      className={`relative h-0.5 w-full overflow-hidden rounded-full ${trackClass}`}
      variants={motionOn ? auraProgressVariants : undefined}
      initial={init}
      animate={anim}
      aria-hidden
    >
      {motionOn ? (
        <motion.div
          className="absolute inset-y-0 w-[42%] rounded-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent"
          variants={auraSweepVariants}
          initial={false}
          animate="visible"
        />
      ) : (
        <div className="h-full w-1/3 rounded-full bg-[#7c3aed]/70" />
      )}
    </motion.div>
  );
}

export default function BitcraftlyLoaderAura({
  show,
  variant,
  density: densityProp,
  theme: themeProp,
  onExitComplete,
}: BitcraftlyLoaderProps) {
  const reduceMotion = useReducedMotion();
  const motionOn = !reduceMotion;
  const { density, theme } = resolveLayout(variant, densityProp, themeProp);
  const { overlay, card, title, tagline, label, isCompact } = loaderShell(theme, density, CONTENT_WIDTH_AURA);
  const logoSize = isCompact ? "sm" : "loader";
  const logoColorShift = motionOn && !isCompact;
  const orbitSize = isCompact ? 64 : 92;
  const trackClass = theme === "dark" ? "bg-[#2a2a3d]" : "bg-[#e5e7eb]";

  const m = (variants: typeof contentVariants) => (motionOn ? variants : undefined);
  const init = motionOn ? "hidden" : false;
  const anim = motionOn ? "visible" : false;

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {show ? (
        <motion.div
          key={`loader-aura-${density}-${theme}`}
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
              className="flex w-full flex-col items-center"
              variants={m(loaderStackVariants)}
              initial={init}
              animate={anim}
            >
              <motion.div variants={m(loaderItemVariants)}>
                <AuraOrbitStage
                  size={orbitSize}
                  motionOn={motionOn}
                  logoSize={logoSize}
                  colorShift={logoColorShift}
                />
              </motion.div>

              {!isCompact ? (
                <>
                  <motion.p
                    className={`mt-3 w-full font-[var(--font-inter)] text-lg font-bold leading-none tracking-tight sm:text-xl ${title}`}
                    variants={m(brandTitleVariants)}
                  >
                    {LOADER_COPY.brand}
                  </motion.p>
                  <motion.div
                    className="mt-1.5 flex w-full flex-col items-center gap-1 px-0.5"
                    variants={m(loaderItemVariants)}
                  >
                    <motion.p
                      className={`w-full max-w-[17rem] text-[10px] font-normal leading-snug sm:text-[11px] ${tagline}`}
                      variants={m(textVariants)}
                    >
                      {LOADER_COPY.tagline}
                    </motion.p>
                    <AuraProgressBar motionOn={motionOn} trackClass={trackClass} />
                    <motion.p
                      className={`text-[11px] leading-none ${label}`}
                      variants={m(labelPulseVariants)}
                      initial={init}
                      animate={anim}
                    >
                      {LOADER_COPY.label}
                    </motion.p>
                  </motion.div>
                </>
              ) : (
                <motion.p
                  className={`mt-3 text-xs font-semibold leading-none ${title}`}
                  variants={m(brandTitleVariants)}
                >
                  {LOADER_COPY.brand}
                </motion.p>
              )}
            </motion.div>

            {isCompact ? (
              <motion.div variants={m(loaderItemVariants)} className="mt-2 w-full px-0.5">
                <AuraProgressBar motionOn={motionOn} trackClass={trackClass} />
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
