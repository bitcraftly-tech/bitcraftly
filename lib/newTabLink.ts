/** Open in a new tab — skip same-page anchors (#section). */
export function newTabProps(href?: string): { target?: "_blank"; rel?: string } {
  if (!href || href.startsWith("#")) return {};
  return { target: "_blank", rel: "noopener noreferrer" };
}
