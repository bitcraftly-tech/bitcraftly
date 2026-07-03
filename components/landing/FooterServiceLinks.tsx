"use client";

import MarketingSectionLink from "@/components/landing/MarketingSectionLink";
import { FOOTER_SERVICE_LINKS } from "@/lib/footerLinks";

export default function FooterServiceLinks() {
  return (
    <ul className="mt-5 space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary">
      {FOOTER_SERVICE_LINKS.map((item) => (
        <li key={`${item.path}-${item.sectionId}`}>
          <MarketingSectionLink
            path={item.path}
            sectionId={item.sectionId}
            label={item.label}
            className="inline-flex transition hover:text-indigo-600 dark:hover:text-indigo-400"
          />
        </li>
      ))}
    </ul>
  );
}
