"use client";

import type { ComponentProps, MouseEvent } from "react";
import { usePathname } from "next/navigation";

import { newTabProps } from "@/lib/newTabLink";
import { parseSectionHref, scrollToElementWithRetry } from "@/lib/scrollToMarketingSection";

type Props = ComponentProps<"a">;

/** Showcase pages: in-page #sections scroll smoothly (no hash URL); external links open in a new tab. */
export default function ShowcaseAnchor({ href, onClick, ...props }: Props) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : "";
  const parsed = parseSectionHref(hrefStr);
  const isInPageSection = parsed && !parsed.path;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isInPageSection) {
      event.preventDefault();
      scrollToElementWithRetry(parsed.sectionId);
    }
    onClick?.(event);
  };

  return (
    <a
      href={isInPageSection ? pathname : href}
      onClick={handleClick}
      {...props}
      {...(isInPageSection ? {} : newTabProps(hrefStr))}
    />
  );
}
