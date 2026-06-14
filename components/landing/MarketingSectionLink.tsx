"use client";

import { usePathname, useRouter } from "next/navigation";

import { navigateToMarketingSection } from "@/lib/scrollToMarketingSection";

type MarketingSectionLinkProps = {
  path: string;
  sectionId: string;
  label: string;
  className?: string;
};

export default function MarketingSectionLink({ path, sectionId, label, className }: MarketingSectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <a
      href={path}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigateToMarketingSection({
          path,
          sectionId,
          pathname,
          push: (url, options) => router.push(url, options),
        });
      }}
    >
      {label}
    </a>
  );
}
