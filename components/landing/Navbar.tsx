"use client";

import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  CreditCard,
  LayoutGrid,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import BitcraftlyLogoMarkImage from "@/components/brand/BitcraftlyLogoMarkImage";
import NavbarProfileMenu from "@/components/landing/NavbarProfileMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { whatsappUrl } from "@/lib/constants";
import { MARKETING_NAV } from "@/lib/marketingRoutes";
import { BRAND } from "@/lib/siteContent";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

type NavbarProps = {
  /** When true, parent controls sticky positioning (e.g. dashboard shell). */
  embedded?: boolean;
  session?: Session | null;
};

const MOBILE_NAV_ICONS: Record<string, LucideIcon> = {
  Pricing: CreditCard,
  Services: Sparkles,
  Portfolio: LayoutGrid,
  About: User,
};

function isNavLinkActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function shouldShowHeaderThemeToggle(pathname: string | null): boolean {
  if (!pathname) return true;
  return !pathname.startsWith("/portfolio/") && !pathname.startsWith("/interactive-demos");
}

export default function Navbar({ embedded = false, session = null }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const showThemeToggle = shouldShowHeaderThemeToggle(pathname);

  return (
    <header
      className={
        embedded
          ? "border-b border-border-primary bg-bg-card/90 backdrop-blur dark:border-dark-border-primary dark:bg-dark-bg-card/90"
          : "sticky top-0 z-50 border-b border-border-primary bg-bg-card sm:bg-bg-card/90 sm:backdrop-blur dark:border-dark-border-primary dark:bg-dark-bg-card dark:sm:bg-dark-bg-card/90"
      }
    >
      <nav className="mx-auto flex min-w-0 w-full max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:px-12">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2"
          title={`Bitcraftly — ${BRAND.headerTagline}`}
        >
          <BitcraftlyLogoMarkImage size="nav" />
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
          {MARKETING_NAV.map((link) => {
            const active = isNavLinkActive(link.href, pathname);
            const highlightPricing = link.href === "/pricing" && !active;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative inline-flex shrink-0 cursor-pointer flex-col items-center text-xs transition-colors duration-300 ease-out xl:text-sm ${
                  active
                    ? "font-semibold text-indigo-600 dark:text-indigo-400"
                    : highlightPricing
                      ? "nav-pricing-cta rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_4px_16px_rgba(67,56,202,0.5)] ring-2 ring-indigo-500/40 xl:px-4 xl:text-sm"
                      : "text-text-secondary hover:text-[#2B5CE6] dark:text-dark-text-secondary dark:hover:text-[#7ea0ff]"
                }`}
              >
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  {link.label}
                  {highlightPricing ? (
                    <span className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-indigo-950 xl:text-[10px]">
                      ₹
                    </span>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          {showThemeToggle ? <ThemeToggle /> : null}
          {session ? (
            <NavbarProfileMenu variant="desktop" session={session} />
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

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {showThemeToggle ? <ThemeToggle /> : null}
          <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          className={`inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 lg:hidden ${
            isMenuOpen
              ? "border-indigo-500/35 bg-indigo-50 dark:border-indigo-400/35 dark:bg-indigo-950/40"
              : "border-border-primary dark:border-dark-border-primary"
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <div className="relative h-4 w-5" aria-hidden>
            <span
              className={`nav-hamburger-line absolute left-0 block h-0.5 w-5 bg-text-primary dark:bg-dark-text-primary ${
                isMenuOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`nav-hamburger-line absolute left-0 top-2 block h-0.5 w-5 bg-text-primary dark:bg-dark-text-primary ${
                isMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`nav-hamburger-line absolute left-0 block h-0.5 w-5 bg-text-primary dark:bg-dark-text-primary ${
                isMenuOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </div>
        </button>
        </div>
      </nav>

      <button
        type="button"
        aria-label="Close navigation menu"
        data-open={isMenuOpen ? "true" : "false"}
        className="nav-mobile-backdrop fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        onClick={closeMenu}
        tabIndex={isMenuOpen ? 0 : -1}
      />

      <div
        id="mobile-nav-panel"
        data-open={isMenuOpen ? "true" : "false"}
        aria-hidden={!isMenuOpen}
        className="nav-mobile-panel relative z-50 border-t border-border-primary bg-bg-card shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)] dark:border-dark-border-primary dark:bg-dark-bg-card lg:hidden"
      >
        <div className="overflow-hidden">
          <div
            className={`scrollbar-soft flex max-h-[min(78dvh,32rem)] flex-col overflow-y-auto overscroll-contain ${
              isMenuOpen ? "nav-mobile-open" : ""
            }`}
          >
            <div className="px-4 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary dark:text-dark-text-tertiary">
                Menu
              </p>
            </div>

            <div className="flex flex-col gap-2 px-4 pb-3 pt-2">
              {MARKETING_NAV.map((link) => {
                const Icon = MOBILE_NAV_ICONS[link.label] ?? Sparkles;
                const active = isNavLinkActive(link.href, pathname);
                const highlightPricing = link.href === "/pricing" && !active;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    tabIndex={isMenuOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`nav-mobile-item group flex w-full items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 active:scale-[0.99] ${
                      active
                        ? "border-indigo-500/30 bg-indigo-50/90 shadow-[0_8px_20px_-14px_rgba(79,70,229,0.55)] dark:border-indigo-400/30 dark:bg-indigo-950/35"
                        : highlightPricing
                          ? "nav-pricing-highlight-mobile border-2 border-indigo-600 bg-indigo-600/10 shadow-[0_10px_24px_-12px_rgba(67,56,202,0.55)] dark:border-indigo-400 dark:bg-indigo-500/15"
                          : "border-border-primary/70 bg-bg-primary/40 hover:border-border-secondary hover:bg-bg-secondary/80 dark:border-dark-border-primary/70 dark:bg-dark-bg-primary/30 dark:hover:border-dark-border-secondary dark:hover:bg-dark-bg-secondary/60"
                    }`}
                    onClick={closeMenu}
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        active
                          ? "bg-indigo-600 text-white dark:bg-indigo-500"
                          : highlightPricing
                            ? "bg-indigo-600 text-white ring-2 ring-amber-400/80 dark:bg-indigo-500"
                            : "bg-bg-secondary text-text-secondary group-hover:bg-bg-card dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
                      }`}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span
                        className={`block text-sm font-semibold ${
                          active || highlightPricing
                            ? "text-indigo-700 dark:text-indigo-200"
                            : "text-text-primary dark:text-dark-text-primary"
                        }`}
                      >
                        {link.label}
                        {highlightPricing ? (
                          <span className="ml-1.5 inline-flex rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-indigo-950">
                            ₹
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        {link.mobileHint}
                      </span>
                    </span>
                    <ChevronRight
                      className={`size-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        active ? "text-indigo-500 dark:text-indigo-400" : "text-text-tertiary dark:text-dark-text-tertiary"
                      }`}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </div>

            <div className="nav-mobile-actions mt-auto border-t border-border-primary bg-bg-card/95 px-4 py-4 backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/95">
              {showThemeToggle ? (
                <div className="mb-3 flex items-center justify-between rounded-xl border border-border-primary/70 bg-bg-primary/40 px-3 py-2.5 dark:border-dark-border-primary/70 dark:bg-dark-bg-primary/30">
                  <span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Theme</span>
                  <ThemeToggle />
                </div>
              ) : null}
              <Link
                href="/contact?intent=consultation&source=navbar-mobile"
                tabIndex={isMenuOpen ? 0 : -1}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(79,70,229,0.75)] transition hover:opacity-95 active:scale-[0.99]"
                onClick={closeMenu}
              >
                Get Free Consultation
              </Link>

              <div className="mt-2.5 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                    data-wa-source="navbar-mobile-whatsapp"
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isMenuOpen ? 0 : -1}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-3 py-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-500/45 active:scale-[0.99] dark:border-emerald-400/25 dark:bg-emerald-950/30 dark:text-emerald-300"
                    onClick={closeMenu}
                  >
                    <MessageCircle className="size-4 shrink-0" aria-hidden />
                    WhatsApp
                  </a>

                  {session ? (
                    <Link
                      href="/pricing"
                      tabIndex={isMenuOpen ? 0 : -1}
                      className="inline-flex items-center justify-center rounded-full border border-indigo-500/25 bg-indigo-50/70 px-3 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-500/40 active:scale-[0.99] dark:border-indigo-400/25 dark:bg-indigo-950/35 dark:text-indigo-300"
                      onClick={closeMenu}
                    >
                      Pricing
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      tabIndex={isMenuOpen ? 0 : -1}
                      className="inline-flex items-center justify-center rounded-full border border-border-primary bg-bg-card px-3 py-3 text-sm font-semibold text-text-primary transition hover:border-border-secondary active:scale-[0.99] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary"
                      onClick={closeMenu}
                    >
                      Log in
                    </Link>
                  )}
                </div>

                {session ? (
                  <NavbarProfileMenu variant="mobile" session={session} onNavigate={closeMenu} />
                ) : (
                  <Link
                    href="/pricing#project-cost-calculator"
                    tabIndex={isMenuOpen ? 0 : -1}
                    className="inline-flex w-full items-center justify-center rounded-full border border-indigo-500/25 bg-indigo-50/70 px-3 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-500/40 active:scale-[0.99] dark:border-indigo-400/25 dark:bg-indigo-950/35 dark:text-indigo-300"
                    onClick={closeMenu}
                  >
                    Open cost calculator
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
