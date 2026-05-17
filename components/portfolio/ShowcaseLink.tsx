import Link from "next/link";
import type { ComponentProps } from "react";

import { newTabProps } from "@/lib/newTabLink";

type Props = ComponentProps<typeof Link>;

/** Showcase pages: off-site and internal routes open in a new tab; #anchors stay in-page. */
export default function ShowcaseLink({ href, ...props }: Props) {
  const hrefStr = typeof href === "string" ? href : "";
  return <Link href={href} {...props} {...newTabProps(hrefStr)} />;
}
