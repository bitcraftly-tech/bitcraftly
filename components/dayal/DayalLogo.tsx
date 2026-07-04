"use client";

import Image from "next/image";

import DayalSectionLink from "@/components/dayal/DayalSectionLink";
import { DAYAL, DAYAL_LOGO_MARK } from "@/lib/dayal/data";

/** Matches dayalbuilder.com header logo mark */
export const DAYAL_LOGO_MARK_WIDTH = 83;
export const DAYAL_LOGO_MARK_HEIGHT = 54;

type Props = {
  href?: string;
  className?: string;
  /** Show DAYAL / BUILDERS wordmark beside the mark */
  showText?: boolean;
  priority?: boolean;
};

export default function DayalLogo({
  href = "#home",
  className = "",
  showText = true,
  priority = false,
}: Props) {
  const mark = (
    <Image
      src={DAYAL_LOGO_MARK}
      alt=""
      width={DAYAL_LOGO_MARK_WIDTH}
      height={DAYAL_LOGO_MARK_HEIGHT}
      priority={priority}
      aria-hidden
      className="dayal-logo-mark"
    />
  );

  const wordmark = showText ? (
    <span className="dayal-logo-text flex min-w-0 flex-col" aria-hidden>
      <span>DAYAL</span>
      <span>BUILDERS</span>
    </span>
  ) : null;

  const content = (
    <>
      <span className="sr-only">Dayal Logo</span>
      {mark}
      {wordmark}
    </>
  );

  const inner = (
    <span
      className={`inline-flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`.trim()}
    >
      {content}
    </span>
  );

  if (!href) {
    return inner;
  }

  return (
    <DayalSectionLink href={href} className="inline-flex shrink-0 items-center" aria-label={DAYAL.brand}>
      {inner}
    </DayalSectionLink>
  );
}
