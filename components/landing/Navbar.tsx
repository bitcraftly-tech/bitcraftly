"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import BitcraftlyLogoMarkImage from "@/components/brand/BitcraftlyLogoMarkImage";
import NavbarProfileMenu from "@/components/landing/NavbarProfileMenu";
import { MARKETING_NAV } from "@/lib/marketingRoutes";
import { BRAND } from "@/lib/siteContent";

type NavbarProps = {
  /** When true, parent controls sticky positioning (e.g. dashboard shell). */
  embedded?: boolean;
};

export default function Navbar({ embedded = false }: NavbarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  return (
    <header
      className={
        embedded
          ? "border-b border-border-primary bg-bg-card/90 backdrop-blur dark:border-dark-border-primary dark:bg-dark-bg-card/90"
          : "sticky top-0 z-50 border-b border-border-primary bg-bg-card/90 backdrop-blur dark:border-dark-border-primary dark:bg-dark-bg-card/90"
      }
    >
      <nav className="mx-auto flex min-w-0 w-full max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:px-12">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2"
          title={`Bitcraftly — ${BRAND.headerTagline}`}
        >
          <BitcraftlyLogoMarkImage size="nav" priority />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-[var(--font-playfair)] text-lg font-semibold text-text-primary sm:text-xl dark:text-dark-text-primary">
              Bitcraftly
            </span>
            <span className="hidden max-w-[20rem] truncate text-[10px] font-medium leading-snug text-text-tertiary lg:block dark:text-dark-text-tertiary">
              {BRAND.headerTagline}
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-8">
          {MARKETING_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative inline-flex shrink-0 cursor-pointer flex-col items-center text-xs text-text-secondary transition-colors duration-300 ease-out hover:text-[#2B5CE6] xl:text-sm dark:text-dark-text-secondary dark:hover:text-[#7ea0ff]"
            >
              <span className="relative inline-block whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          {status === "loading" ? (
            <div className="h-9 w-28 animate-pulse rounded-full bg-border-primary dark:bg-dark-border-primary" aria-hidden />
          ) : session ? (
            <NavbarProfileMenu variant="desktop" />
          ) : (
            <Link
              href="/login"
              className="cursor-pointer whitespace-nowrap rounded-full border border-border-primary px-3 py-2 text-xs font-medium text-text-primary transition hover:border-border-secondary xl:px-4 xl:text-sm dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
            >
              Log in
            </Link>
          )}
          <Link
            href="/contact?intent=consultation&source=navbar"
            className="cursor-pointer whitespace-nowrap rounded-full bg-black px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800 xl:px-4 xl:text-sm dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <span className="xl:hidden">Consult</span>
            <span className="hidden xl:inline">Get Free Consultation</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border-primary lg:hidden dark:border-dark-border-primary"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-text-primary transition-transform duration-200 dark:bg-dark-text-primary ${
                isMenuOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-5 bg-text-primary transition-opacity duration-200 dark:bg-dark-text-primary ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-text-primary transition-transform duration-200 dark:bg-dark-text-primary ${
                isMenuOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </div>
        </button>
      </nav>

      {isMenuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-border-primary bg-bg-card px-4 py-4 dark:border-dark-border-primary dark:bg-dark-bg-card lg:hidden">
            <div className="flex flex-col gap-1">
              {MARKETING_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full cursor-pointer rounded-lg px-3 py-3 text-left text-base font-medium text-text-secondary transition-colors duration-300 ease-out hover:bg-bg-secondary hover:text-[#2B5CE6] dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-[#7ea0ff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-border-primary pt-4 dark:border-dark-border-primary">
              {status === "loading" ? null : session ? (
                <NavbarProfileMenu variant="mobile" onNavigate={() => setIsMenuOpen(false)} />
              ) : (
                <Link
                  href="/login"
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-border-primary px-4 py-3 text-sm font-medium text-text-primary dark:border-dark-border-primary dark:text-dark-text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
              )}
              <Link
                href="/contact?intent=consultation&source=navbar-mobile"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
