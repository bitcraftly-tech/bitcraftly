import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

function LogoMark() {
  return (
    <div className="grid h-7 w-7 grid-cols-2 gap-1 rounded-md border border-border-primary p-1 dark:border-dark-border-primary">
      <span className="rounded-sm bg-[#2B5CE6]" />
      <span className="rounded-sm bg-text-primary dark:bg-dark-text-primary" />
      <span className="rounded-sm bg-text-primary dark:bg-dark-text-primary" />
      <span className="rounded-sm bg-[#2B5CE6]" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-card py-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className={`${CONTAINER} flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left`}>
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">Bitcraftly</span>
        </div>

        <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">© {new Date().getFullYear()} Bitcraftly. All rights reserved.</p>

        <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
          <Link href="/privacy" className="hover:text-text-primary dark:hover:text-dark-text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-text-primary dark:hover:text-dark-text-primary">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-text-primary dark:hover:text-dark-text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
