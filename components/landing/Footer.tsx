"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const goToSection = (targetId: string) => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("landingTargetSection", targetId);
    }
    router.push("/");
  };

  return (
    <footer className="border-t border-border-primary bg-bg-card py-12 dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className={CONTAINER}>
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">Bitcraftly</span>
            </div>
            <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
              Digital transformation agency for Indian businesses.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Services</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li>
                <button type="button" onClick={() => goToSection("websites")} className="cursor-pointer hover:text-text-primary dark:hover:text-dark-text-primary">
                  Websites
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToSection("mobile-apps")} className="cursor-pointer hover:text-text-primary dark:hover:text-dark-text-primary">
                  Mobile Apps
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToSection("ai-automation")} className="cursor-pointer hover:text-text-primary dark:hover:text-dark-text-primary">
                  AI Automation
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToSection("smart-parking")} className="cursor-pointer hover:text-text-primary dark:hover:text-dark-text-primary">
                  Smart Parking
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToSection("pricing")} className="cursor-pointer hover:text-text-primary dark:hover:text-dark-text-primary">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li>
                <button type="button" onClick={() => goToSection("about")} className="cursor-pointer hover:text-text-primary dark:hover:text-dark-text-primary">
                  About Us
                </button>
              </li>
              <li><Link href="/demo" className="hover:text-text-primary dark:hover:text-dark-text-primary">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-text-primary dark:hover:text-dark-text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li>+91 96677 10954</li>
              <li>hello@bitcraftly.com</li>
              <li>Ghaziabad, Uttar Pradesh, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border-primary pt-6 text-center text-sm text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
          © {new Date().getFullYear()} Bitcraftly · All rights reserved
        </div>
      </div>
    </footer>
  );
}
