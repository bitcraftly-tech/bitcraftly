"use client";



import SectionPageNav from "@/components/landing/SectionPageNav";

import type { PageNavItem } from "@/lib/pageSequences";



type MarketingPageNavProps = {

  items: readonly PageNavItem[];

  ariaLabel: string;

};



function MarketingPageNav({ items, ariaLabel }: MarketingPageNavProps) {

  return <SectionPageNav items={items} ariaLabel={ariaLabel} />;

}



MarketingPageNav.displayName = "MarketingPageNav";



export default MarketingPageNav;

