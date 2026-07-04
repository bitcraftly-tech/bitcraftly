import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import Link from "next/link";

import { CONTAINER } from "@/lib/constants";
import { newTabProps } from "@/lib/newTabLink";

const FOOTER_COLS = [
  {
    title: "Get to Know Us",
    links: ["About ShopKart", "Careers", "Press Releases", "ShopKart Science"],
  },
  {
    title: "Connect with Us",
    links: ["Facebook", "Twitter", "Instagram"],
  },
  {
    title: "Make Money with Us",
    links: ["Sell on ShopKart", "Protect your brand", "Advertise", "Fulfilment"],
  },
  {
    title: "Let Us Help You",
    links: ["Your Account", "Returns Centre", "100% Purchase Protection", "Help"],
  },
] as const;

export default function EcommerceFooter() {
  return (
    <footer>
      <ShowcaseAnchor
        href="#top"
        className="ec-header-nav-bar block py-3.5 text-center text-sm font-medium hover:opacity-90"
      >
        Back to top
      </ShowcaseAnchor>

      <div className="ec-footer-mid text-white">
        <div className={`${CONTAINER} grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4`}>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-base font-bold">{col.title}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <ShowcaseAnchor href="#catalog" className="text-sm text-slate-300 hover:underline">
                      {link}
                    </ShowcaseAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-600/50 py-6">
          <div className={`${CONTAINER} flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left`}>
            <p className="text-lg font-bold">
              <span className="text-white">shop</span>
              <span className="ec-brand-accent">Kart</span>
            </p>
            <p className="text-xs text-slate-300">English · India · Fictional marketplace UI specimen</p>
          </div>
        </div>
      </div>

      <div className="ec-footer-deep py-4 text-slate-300">
        <div className={`${CONTAINER} text-center text-xs`}>
          <p>
            Designed &amp; developed by{" "}
            <Link href="https://bitcraftly.com/" className="ec-brand-accent hover:underline" {...newTabProps("https://bitcraftly.com/")}>
              Bitcraftly
            </Link>
          </p>
          <p className="mt-2 text-slate-500">ShopKart is fictional · not affiliated with any retailer · © 2026</p>
        </div>
      </div>
    </footer>
  );
}
