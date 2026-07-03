"use client";



import SectionPageNav from "@/components/landing/SectionPageNav";



const NAV_ITEMS = [

  { id: "pricing-plans", label: "Plans" },

  { id: "pricing-compare", label: "Compare" },

  { id: "fast-packages", label: "Fast launch" },

  { id: "project-cost-calculator", label: "Calculator" },

  { id: "pricing-faq", label: "FAQ" },

] as const;



function PricingPageNav() {

  return <SectionPageNav items={NAV_ITEMS} ariaLabel="Pricing page sections" />;

}



PricingPageNav.displayName = "PricingPageNav";



export default PricingPageNav;

