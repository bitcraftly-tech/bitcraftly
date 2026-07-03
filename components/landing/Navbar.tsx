"use client";

import type { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, CreditCard, LayoutGrid, MessageCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import BitcraftlyLogoMarkImage from "@/components/brand/BitcraftlyLogoMarkImage";
import LoginModal from "@/components/auth/LoginModal";
import NavbarProfileMenu from "@/components/landing/NavbarProfileMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { HEADER_SERVICES_DROPDOWN, MARKETING_NAV } from "@/lib/marketingRoutes";
import { BRAND } from "@/lib/siteContent";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

type NavbarProps = {
  embedded?: boolean;
  session?: Session | null;
};

const MOBILE_NAV_ICONS: Record<string, LucideIcon> = {
  Services: Sparkles,
  Portfolio: LayoutGrid,
  Pricing: CreditCard,
};

const CONSULTATION_HREF = "/contact?intent=consultation&source=navbar";
const CONSULTATION_MOBILE_HREF = "/contact?intent=consultation&source=navbar-mobile";

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
  const servicesRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      document.documentElement.removeAttribute("data-bc-nav-open");
    };
  }, []);

  useEffect(() => {
    if (embedded) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [embedded]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLoginOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
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
    if (!servicesOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

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

  const openLoginModal = () => {
    closeMenu();
    setIsLoginOpen(true);
  };
  const showThemeToggle = shouldShowHeaderThemeToggle(pathname);

  const navLinkClass = (href: string) => {
    const active = isNavLinkActive(href, pathname);
    return `bc-nav-link whitespace-nowrap px-3 py-2 text-sm ${active ? "bc-nav-link--active" : ""}`;
  };

  return (
    <header
      className={
        embedded
          ? "border-b border-[#E5E7EB] bg-white/90 backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/90"
          : `bc-site-header sticky top-0 z-[9060] w-full shrink-0 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm transition-[box-shadow,background-color,border-color] duration-300 dark:border-dark-border-primary dark:bg-dark-bg-card/95 ${scrolled ? "bc-site-header--scrolled" : "shadow-none"}`
      }
    >
      <nav
        ref={navRef}
        className={`${CONTAINER} flex min-h-[72px] min-w-0 items-center justify-between gap-3 py-0 lg:gap-4`}
      >
        {/* Logo */}
        <Link href="/" className="flex min-w-0 shrink items-center gap-2.5" title={`Bitcraftly — ${BRAND.headerTagline}`}>
          <BitcraftlyLogoMarkImage size="nav" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-[var(--font-playfair)] text-lg font-semibold text-[#111827] sm:text-xl dark:text-dark-text-primary">
              Bitcraftly
            </span>
            <span className="hidden max-w-[18rem] truncate text-[10px] font-medium leading-snug text-[#9CA3AF] xl:block dark:text-dark-text-tertiary">
              {BRAND.headerTagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav — 3 items */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          {/* Services + dropdown */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={`bc-nav-link inline-flex items-center gap-1 rounded-lg ${navLinkClass("/services")}`}
            >
              Services
              <ChevronDown
                className={`size-3.5 opacity-60 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2">
                <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:border-dark-border-primary dark:bg-dark-bg-card">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#F9FAFB] dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                    onClick={() => setServicesOpen(false)}
                  >
                    All services
                  </Link>
                  <div className="my-1 h-px bg-[#F3F4F6] dark:bg-dark-border-primary" />
                  {HEADER_SERVICES_DROPDOWN.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm font-medium text-[#6B7280] transition hover:bg-[#F9FAFB] hover:text-[#111827] dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Link href="/portfolio" aria-current={isNavLinkActive("/portfolio", pathname) ? "page" : undefined} className={navLinkClass("/portfolio")}>
            Portfolio
          </Link>
          <Link href="/pricing" aria-current={isNavLinkActive("/pricing", pathname) ? "page" : undefined} className={navLinkClass("/pricing")}>
            Pricing
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          {showThemeToggle ? <ThemeToggle /> : null}
          <a
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            data-wa-source="navbar-desktop-whatsapp"
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#374151] transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] active:scale-[0.97] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
          >
            <MessageCircle className="size-[17px]" aria-hidden />
          </a>
          {session ? (
            <NavbarProfileMenu variant="desktop" session={session} />
          ) : (
            <button
              type="button"
              onClick={openLoginModal}
              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-[#6B7280] transition hover:text-[#111827] dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
            >
              Log in
            </button>
          )}
          <Link
            href={CONSULTATION_HREF}
            className="inline-flex h-[46px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4f46e5] px-5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,70,229,0.28)] transition duration-200 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(79,70,229,0.34)] active:scale-[0.98]"
          >
            Get Free Consultation
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {showThemeToggle ? <ThemeToggle /> : null}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            className={`bc-nav-hamburger inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 active:scale-[0.97] ${
              isMenuOpen
                ? "border-[#8e44ad]/30 bg-[#8e44ad]/5 dark:border-indigo-400/35 dark:bg-indigo-950/40"
                : "border-[#E5E7EB] dark:border-dark-border-primary"
            }`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <div className="relative h-4 w-5" aria-hidden>
              <span className={`nav-hamburger-line absolute left-0 block h-0.5 w-5 bg-[#111827] dark:bg-dark-text-primary ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`nav-hamburger-line absolute left-0 top-2 block h-0.5 w-5 bg-[#111827] dark:bg-dark-text-primary ${isMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
              <span className={`nav-hamburger-line absolute left-0 block h-0.5 w-5 bg-[#111827] dark:bg-dark-text-primary ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`} />
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
                className="nav-mobile-panel border-[#E5E7EB] bg-white/98 shadow-2xl dark:border-dark-border-primary dark:bg-dark-bg-card/98 lg:hidden"
              >
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                  <div className={`scrollbar-soft flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain ${isMenuOpen ? "nav-mobile-open" : ""}`}>
                    <div className="px-4 pb-1 pt-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF] dark:text-dark-text-tertiary">Menu</p>
                    </div>

                    <div className="flex flex-col gap-1 px-4 pb-3 pt-2">
                      {/* Services expandable */}
                      <div className="rounded-xl border border-[#E5E7EB] dark:border-dark-border-primary">
                        <button
                          type="button"
                          tabIndex={isMenuOpen ? 0 : -1}
                          aria-expanded={mobileServicesOpen}
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className="flex w-full min-h-[3.25rem] items-center gap-3 px-3 py-3 text-left"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] dark:bg-dark-bg-secondary">
                            <Sparkles className="size-4 text-[#374151] dark:text-dark-text-secondary" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-[#111827] dark:text-dark-text-primary">Services</span>
                            <span className="mt-0.5 block text-xs text-[#9CA3AF] dark:text-dark-text-tertiary">Websites, web apps, mobile & AI</span>
                          </span>
                          <ChevronDown className={`size-4 shrink-0 text-[#9CA3AF] transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden />
                        </button>
                        {mobileServicesOpen ? (
                          <div className="border-t border-[#F3F4F6] px-3 py-2 dark:border-dark-border-primary">
                            <Link
                              href="/services"
                              tabIndex={isMenuOpen ? 0 : -1}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                              onClick={closeMenu}
                            >
                              All services
                            </Link>
                            {HEADER_SERVICES_DROPDOWN.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                tabIndex={isMenuOpen ? 0 : -1}
                                className="block rounded-lg px-3 py-2 text-sm text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                                onClick={closeMenu}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {MARKETING_NAV.filter((l) => l.label !== "Services").map((link) => {
                        const Icon = MOBILE_NAV_ICONS[link.label] ?? Sparkles;
                        const active = isNavLinkActive(link.href, pathname);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            tabIndex={isMenuOpen ? 0 : -1}
                            aria-current={active ? "page" : undefined}
                            className={`nav-mobile-item flex w-full min-h-[3.25rem] items-center gap-3 rounded-xl border px-3 py-3 transition active:scale-[0.99] ${
                              active
                                ? "border-[#8e44ad]/25 bg-[#8e44ad]/5 dark:border-indigo-400/30 dark:bg-indigo-950/35"
                                : "border-[#E5E7EB] hover:bg-[#F9FAFB] dark:border-dark-border-primary dark:hover:bg-dark-bg-secondary"
                            }`}
                            onClick={closeMenu}
                          >
                            <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[#7C3AED] text-white" : "bg-[#F3F4F6] dark:bg-dark-bg-secondary"}`}>
                              <Icon className="size-4" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1 text-left">
                              <span
                                className={`block text-sm ${
                                  active
                                    ? "font-semibold text-[#111827] dark:text-dark-text-primary"
                                    : "font-medium text-[#6B7280] dark:text-dark-text-secondary"
                                }`}
                              >
                                {link.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-[#9CA3AF] dark:text-dark-text-tertiary">{link.mobileHint}</span>
                            </span>
                            <ChevronRight className="size-4 shrink-0 text-[#D1D5DB]" aria-hidden />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="nav-mobile-actions mt-auto border-t border-[#E5E7EB] px-4 py-4 dark:border-dark-border-primary">
                      <a
                        href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                        data-wa-source="navbar-mobile-whatsapp"
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={isMenuOpen ? 0 : -1}
                        className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB] active:scale-[0.99] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary"
                        onClick={closeMenu}
                      >
                        <MessageCircle className="size-4 shrink-0" aria-hidden />
                        WhatsApp
                      </a>

                      {session ? (
                        <NavbarProfileMenu variant="mobile" session={session} onNavigate={closeMenu} />
                      ) : (
                        <button
                          type="button"
                          tabIndex={isMenuOpen ? 0 : -1}
                          className="mb-3 inline-flex w-full items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB] active:scale-[0.99] dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary"
                          onClick={openLoginModal}
                        >
                          Log in
                        </button>
                      )}

                      <Link
                        href={CONSULTATION_MOBILE_HREF}
                        tabIndex={isMenuOpen ? 0 : -1}
                        className="inline-flex h-[46px] w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4f46e5] px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,70,229,0.28)] transition active:scale-[0.99]"
                        onClick={closeMenu}
                      >
                        Get Free Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}
