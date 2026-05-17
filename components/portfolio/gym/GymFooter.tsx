import Link from "next/link";

import { CONTAINER } from "@/lib/constants";
import { newTabProps } from "@/lib/newTabLink";

import GymLogo from "./GymLogo";

const COLS = [
  { title: "Fitness", links: ["Group classes", "Gyms", "Sports", "At home"] },
  { title: "Company", links: ["About FitRally", "Careers", "Blog", "Contact"] },
  { title: "Support", links: ["Help center", "FAQs", "Offers", "Corporate"] },
] as const;

export default function GymFooter() {
  return (
    <footer className="gym-bg-surface border-t gym-border">
      <div className={`${CONTAINER} grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <GymLogo size="md" />
          <p className="gym-text-muted mt-3 max-w-xs text-sm leading-relaxed">
            Fictional fitness platform demo · memberships, classes & centers by Bitcraftly.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-bold">{col.title}</p>
            <ul className="gym-text-muted mt-4 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#formats" className="hover:gym-brand-text hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="gym-border border-t py-6">
        <div className={`${CONTAINER} flex flex-col items-center justify-between gap-3 text-center text-xs text-[var(--gym-muted)] sm:flex-row sm:text-left`}>
          <p>© 2026 FitRally showcase · Fictional brand · Not affiliated with any retailer</p>
          <p>
            Built by{" "}
            <Link href="https://bitcraftly.com/" className="gym-brand-text hover:underline" {...newTabProps("https://bitcraftly.com/")}>
              Bitcraftly
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
