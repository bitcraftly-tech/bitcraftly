"use client";

import type { ComponentProps, MouseEvent } from "react";
import { usePathname } from "next/navigation";

import { scrollToElementWithRetry } from "@/lib/scrollToMarketingSection";

type Props = ComponentProps<"a">;

/** Dayal demo — in-page section scroll without hash URLs. */
export default function DayalSectionLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : "";
  const isSection = hrefStr.startsWith("#");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isSection) {
      event.preventDefault();
      scrollToElementWithRetry(hrefStr.slice(1));
    }
    onClick?.(event);
  };

  return <a href={isSection ? pathname : href} onClick={handleClick} {...props} />;
}
