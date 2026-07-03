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
import { lockBodyScrollForNav, unlockBodyScrollForNav } from "@/lib/scrollLock";
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
    };

    syncNavMetrics();
    const ro = new ResizeObserver(syncNavMetrics);
    ro.observe(nav);
    window.addEventListener("orientationchange", syncNavMetrics);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", syncNavMetrics);
      document.documentElement.style.removeProperty("--bc-nav-height");
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

    const syncNavHeight = () => {
      const nav = navRef.current;
      if (!nav) return;
      root.style.setProperty("--bc-nav-height", `${nav.getBoundingClientRect().bottom}px`);
    };

    syncNavHeight();
    requestAnimationFrame(syncNavHeight);
    window.addEventListener("resize", syncNavHeight);
    window.visualViewport?.addEventListener("resize", syncNavHeight);

    lockBodyScrollForNav();
    requestAnimationFrame(syncNavHeight);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.removeAttribute("data-bc-nav-open");
      window.removeEventListener("resize", syncNavHeight);
      window.visualViewport?.removeEventListener("resize", syncNavHeight);
      unlockBodyScrollForNav();
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
    <>
    <header
      className={
        embedded
          ? "bc-site-header border-b border-[#E5E7EB] bg-white/90 backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/90"
          : `bc-site-header bc-site-header--fixed w-full shrink-0 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm transition-[box-shadow,background-color,border-color] duration-300 dark:border-dark-border-primary dark:bg-dark-bg-card/95 ${scrolled ? "bc-site-header--scrolled" : "shadow-none"}`
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
            <div
              className="nav-mobile-overlay lg:hidden"
              data-open={isMenuOpen ? "true" : "false"}
              aria-hidden={!isMenuOpen}
            >
              <button
                type="button"
                aria-label="Close navigation menu"
                className="nav-mobile-backdrop"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
              />

              <div
                id="mobile-nav-panel"
                aria-hidden={!isMenuOpen}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className="nav-mobile-panel"
              >
                <div className="nav-mobile-panel__ambient" aria-hidden />

                <div className={`nav-mobile-body ${isMenuOpen ? "nav-mobile-open" : ""}`}>
                  <div className="nav-mobile-scroll scrollbar-soft">
                    <header className="nav-mobile-head nav-mobile-item">
                      <h2 className="nav-mobile-head__title">Where should we go?</h2>
                      <p className="nav-mobile-head__lead">Services, portfolio & pricing — one tap away.</p>
                    </header>

                    <nav className="nav-mobile-routes" aria-label="Primary">
                      <div className={`nav-mobile-item nav-mobile-route nav-mobile-route--group ${mobileServicesOpen ? "nav-mobile-route--open" : ""}`}>
                        <button
                          type="button"
                          tabIndex={isMenuOpen ? 0 : -1}
                          aria-expanded={mobileServicesOpen}
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className="nav-mobile-route__trigger"
                        >
                          <span className="nav-mobile-route__index" aria-hidden>
                            01
                          </span>
                          <span className="nav-mobile-route__icon">
                            <Sparkles className="size-[1.05rem]" aria-hidden />
                          </span>
                          <span className="nav-mobile-route__copy">
                            <span className="nav-mobile-route__title">Services</span>
                            <span className="nav-mobile-route__hint">Websites, web apps, mobile & AI</span>
                          </span>
                          <span className="nav-mobile-route__arrow nav-mobile-route__arrow--down" aria-hidden>
                            <ChevronDown className={`size-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                          </span>
                        </button>
                        <div className="nav-mobile-route__sub">
                          <div>
                            <div className="nav-mobile-route__sub-inner">
                              <Link
                                href="/services"
                                tabIndex={isMenuOpen ? 0 : -1}
                                className="nav-mobile-route__sub-link nav-mobile-route__sub-link--featured"
                                onClick={closeMenu}
                              >
                                All services
                              </Link>
                              {HEADER_SERVICES_DROPDOWN.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  tabIndex={isMenuOpen ? 0 : -1}
                                  className="nav-mobile-route__sub-link"
                                  onClick={closeMenu}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {MARKETING_NAV.filter((l) => l.label !== "Services").map((link, index) => {
                        const Icon = MOBILE_NAV_ICONS[link.label] ?? Sparkles;
                        const active = isNavLinkActive(link.href, pathname);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            tabIndex={isMenuOpen ? 0 : -1}
                            aria-current={active ? "page" : undefined}
                            className={`nav-mobile-item nav-mobile-route ${active ? "nav-mobile-route--active" : ""}`}
                            onClick={closeMenu}
                          >
                            <span className="nav-mobile-route__index" aria-hidden>
                              {String(index + 2).padStart(2, "0")}
                            </span>
                            <span className={`nav-mobile-route__icon ${active ? "nav-mobile-route__icon--active" : ""}`}>
                              <Icon className="size-[1.05rem]" aria-hidden />
                            </span>
                            <span className="nav-mobile-route__copy">
                              <span className="nav-mobile-route__title">{link.label}</span>
                              <span className="nav-mobile-route__hint">{link.mobileHint}</span>
                            </span>
                            <span className="nav-mobile-route__arrow" aria-hidden>
                              <ChevronRight className="size-4" />
                            </span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  <aside className="nav-mobile-actions nav-mobile-dock">
                    <div className={`nav-mobile-dock__grid ${session ? "nav-mobile-dock__grid--auth" : ""}`}>
                      <a
                        href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                        data-wa-source="navbar-mobile-whatsapp"
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={isMenuOpen ? 0 : -1}
                        className="nav-mobile-quick nav-mobile-quick--whatsapp"
                        onClick={closeMenu}
                      >
                        <MessageCircle className="size-4 shrink-0" aria-hidden />
                        <span>WhatsApp</span>
                      </a>

                      {session ? (
                        <NavbarProfileMenu variant="mobile" session={session} onNavigate={closeMenu} className="nav-mobile-profile" />
                      ) : (
                        <button
                          type="button"
                          tabIndex={isMenuOpen ? 0 : -1}
                          className="nav-mobile-quick nav-mobile-quick--login"
                          onClick={openLoginModal}
                        >
                          Log in
                        </button>
                      )}
                    </div>

                    <Link
                      href={CONSULTATION_MOBILE_HREF}
                      tabIndex={isMenuOpen ? 0 : -1}
                      className="nav-mobile-cta"
                      onClick={closeMenu}
                    >
                      <span className="nav-mobile-cta__label">Get Free Consultation</span>
                      <span className="nav-mobile-cta__shine" aria-hidden />
                    </Link>
                    <p className="nav-mobile-dock__note">Free strategy call · No commitment</p>
                  </aside>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
    {!embedded ? <div className="bc-site-header-spacer" aria-hidden /> : null}
    </>
  );
}
