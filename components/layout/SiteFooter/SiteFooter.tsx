import { CONTAINER } from "@/lib/constants";

import "@/components/landing/marketing-hero.css";
import FooterBottomBar from "./FooterBottomBar";
import FooterCtaBand from "./FooterCtaBand";
import FooterMainColumns from "./FooterMainColumns";
import type { SiteFooterProps } from "./types";

export default function SiteFooter({ showCta = true }: SiteFooterProps) {
  return (
    <footer className="bc-site-footer relative mt-auto w-full shrink-0 border-t border-border-primary dark:border-dark-border-primary">
      <div className={`${CONTAINER} relative z-10 pt-10 pb-5 md:pt-12 md:pb-6`}>
        {showCta ? <FooterCtaBand /> : null}
        <FooterMainColumns />
        <FooterBottomBar />
      </div>
    </footer>
  );
}
