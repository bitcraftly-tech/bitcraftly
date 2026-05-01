"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { CONTAINER } from "@/lib/constants";

const navLinks = [
  { label: "Websites", targetId: "websites" },
  { label: "Mobile Apps", targetId: "mobile-apps" },
  { label: "AI Automation", targetId: "ai-automation" },
  { label: "Smart Parking", targetId: "smart-parking" },
  { label: "Pricing", targetId: "pricing" },
];

function LogoMark() {
  return (
    <div className="grid h-8 w-8 grid-cols-2 gap-1 rounded-md border border-border-primary p-1 dark:border-dark-border-primary">
      <span className="rounded-sm bg-[#2B5CE6]" />
      <span className="rounded-sm bg-text-primary dark:bg-dark-text-primary" />
      <span className="rounded-sm bg-text-primary dark:bg-dark-text-primary" />
      <span className="rounded-sm bg-[#2B5CE6]" />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToSection = (targetId: string) => {
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      scrollToSection(targetId);
      return;
    }
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("landingTargetSection", targetId);
    }
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-card/90 backdrop-blur dark:border-dark-border-primary dark:bg-dark-bg-card/90">
      <nav className={`${CONTAINER} flex items-center justify-between py-3`}>
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="flex flex-col leading-tight">
            <span className="font-[var(--font-playfair)] text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              Bitcraftly
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
              Grow Faster, Smarter
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => goToSection(link.targetId)}
              className="cursor-pointer text-sm text-text-secondary transition hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="cursor-pointer rounded-full border border-border-primary px-4 py-2 text-sm font-medium text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
          >
            Login
          </Link>
          <Link
            href="/"
            onClick={(event) => {
              event.preventDefault();
              goToSection("contact-cta");
            }}
            className="cursor-pointer rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Book Free Consultation
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-border-primary md:hidden dark:border-dark-border-primary"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-text-primary dark:bg-dark-text-primary" />
            <span className="block h-0.5 w-5 bg-text-primary dark:bg-dark-text-primary" />
            <span className="block h-0.5 w-5 bg-text-primary dark:bg-dark-text-primary" />
          </div>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-border-primary bg-bg-card px-4 py-4 dark:border-dark-border-primary dark:bg-dark-bg-card md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                className="w-fit cursor-pointer text-sm text-text-secondary dark:text-dark-text-secondary"
                onClick={() => {
                  goToSection(link.targetId);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 flex gap-3">
              <Link
                href="/login"
                className="cursor-pointer rounded-full border border-border-primary px-4 py-2 text-sm font-medium text-text-primary dark:border-dark-border-primary dark:text-dark-text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/"
                className="cursor-pointer rounded-full bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                onClick={(event) => {
                  event.preventDefault();
                  goToSection("contact-cta");
                  setIsMenuOpen(false);
                }}
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
