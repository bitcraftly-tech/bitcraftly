"use client";

import type { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { CONTAINER, FOCUS_RING, whatsappUrl } from "@/lib/constants";
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
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (embedded) return;
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [embedded]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const syncNavMetrics = () => {
      const { bottom } = nav.getBoundingClientRect();
      document.documentElement.style.setProperty("--bc-nav-height", `${bottom}px`);
      document.documentElement.style.setProperty("--bc-nav-overlay-top", `${bottom}px`);
    };

    syncNavMetrics();
    const ro = new ResizeObserver(syncNavMetrics);
    ro.observe(nav);
    window.addEventListener("orientationchange", syncNavMetrics);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", syncNavMetrics);
      document.documentElement.style.removeProperty("--bc-nav-height");
      document.documentElement.style.removeProperty("--bc-nav-overlay-top");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!isMenuOpen) {
      root.removeAttribute("data-bc-nav-open");
      return;
    }

    root.setAttribute("data-bc-nav-open", "");

    const nav = navRef.current;
    const syncOverlayTop = () => {
      if (!nav) return;
      document.documentElement.style.setProperty("--bc-nav-overlay-top", `${nav.getBoundingClientRect().bottom}px`);
    };

    syncOverlayTop();
    window.addEventListener("resize", syncOverlayTop);
    window.visualViewport?.addEventListener("resize", syncOverlayTop);
    window.visualViewport?.addEventListener("scroll", syncOverlayTop);

    const scrollY = window.scrollY;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPosition = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyWidth = document.body.style.width;
    const prevHtmlOverflow = root.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.removeAttribute("data-bc-nav-open");
      window.removeEventListener("resize", syncOverlayTop);
      window.visualViewport?.removeEventListener("resize", syncOverlayTop);
      window.visualViewport?.removeEventListener("scroll", syncOverlayTop);
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;
      root.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
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
          : `bc-site-header sticky top-0 z-[9060] w-full shrink-0 border-b border-border-primary bg-bg-card/95 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 dark:border-dark-border-primary dark:bg-dark-bg-card/95 ${scrolled ? "bc-site-header--scrolled" : ""}`
      }
    >
      <nav
        ref={navRef}
        className={`${CONTAINER} flex min-w-0 items-center justify-between gap-2 py-2.5 sm:gap-3 sm:py-3`}
      >
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
                className={`group relative inline-flex shrink-0 cursor-pointer flex-col items-center text-xs transition-colors duration-200 ease-out xl:text-sm ${
                  active
                    ? "font-semibold text-accent-primary dark:text-indigo-400"
                    : highlightPricing
                      ? "nav-pricing-cta rounded-full bg-accent-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)] ring-2 ring-accent-primary/30 xl:px-4 xl:text-sm"
                      : "text-text-secondary hover:text-accent-primary dark:text-dark-text-secondary dark:hover:text-indigo-400"
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
              className="bc-btn bc-btn-secondary cursor-pointer whitespace-nowrap px-3 py-2 text-xs xl:px-4 xl:text-sm"
            >
              Log in
            </Link>
          )}
          <Link
            href="/contact?intent=consultation&source=navbar"
            className="bc-btn bc-btn-primary cursor-pointer whitespace-nowrap px-3 py-2 text-xs xl:px-4 xl:text-sm"
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
          className={`bc-nav-hamburger inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-all duration-200 active:scale-[0.97] lg:hidden ${
            isMenuOpen
              ? "border-accent-primary/35 bg-brand-soft dark:border-indigo-400/35 dark:bg-indigo-950/40"
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

      {mounted
        ? createPortal(
            <>
              <button
                type="button"
                aria-label="Close navigation menu"
                data-open={isMenuOpen ? "true" : "false"}
                className="nav-mobile-backdrop fixed inset-0 bg-slate-900/45 backdrop-blur-md lg:hidden"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
              />

              <div
                id="mobile-nav-panel"
                data-open={isMenuOpen ? "true" : "false"}
                aria-hidden={!isMenuOpen}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className="nav-mobile-panel border-border-primary bg-bg-card/98 shadow-2xl dark:border-dark-border-primary dark:bg-dark-bg-card/98 lg:hidden"
              >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className={`scrollbar-soft flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain ${
              isMenuOpen ? "nav-mobile-open" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary dark:text-dark-text-tertiary">
                Menu
              </p>
              <button
                type="button"
                aria-label="Close menu"
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={closeMenu}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-primary text-text-secondary transition hover:border-border-secondary hover:bg-bg-secondary active:scale-[0.97] dark:border-dark-border-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
              >
                <span className="sr-only">Close</span>
                <span className="relative block h-3.5 w-3.5" aria-hidden>
                  <span className="absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
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
                    className={`nav-mobile-item group flex w-full min-h-[3.25rem] items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 active:scale-[0.99] ${
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
                className="bc-btn bc-btn-primary inline-flex w-full cursor-pointer items-center justify-center px-4 py-3.5 text-sm"
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
            </>,
            document.body,
          )
        : null}
    </header>
  );
}
