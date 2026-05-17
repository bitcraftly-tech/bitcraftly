import type { ComponentProps } from "react";

import { newTabProps } from "@/lib/newTabLink";

type Props = ComponentProps<"a">;

/** Showcase pages: tel/mailto/http paths open in a new tab; #anchors stay in-page. */
export default function ShowcaseAnchor({ href, ...props }: Props) {
  const hrefStr = typeof href === "string" ? href : "";
  return <a href={href} {...props} {...newTabProps(hrefStr)} />;
}
