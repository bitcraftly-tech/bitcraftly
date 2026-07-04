"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  Bell,
  Briefcase,
  Car,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  ClipboardList,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Users,
  X,
} from "lucide-react";

import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
  useNotificationSocket,
  useNotificationsQuery,
} from "@/hooks/useNotifications";

type DashboardRole = "admin" | "staff" | "manager" | "customer";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: DashboardRole[];
  tier: "primary" | "more";
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Projects", href: "/dashboard/leads", icon: Users, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Applications", href: "/dashboard/applications", icon: Briefcase, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Websites", href: "/dashboard/templates", icon: Globe, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Invoices", href: "/dashboard/billing", icon: CreditCard, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Documents", href: "/dashboard/documents", icon: FileText, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin", "staff", "manager"], tier: "primary" },
  { label: "Job roles", href: "/dashboard/roles", icon: ClipboardList, roles: ["admin", "staff", "manager"], tier: "more" },
  { label: "Apps", href: "/dashboard/parking-reports", icon: Car, roles: ["admin", "staff", "manager"], tier: "more" },
  { label: "Support", href: "/contact?intent=support&source=bitcraftly-portal-nav", icon: MessageCircle, roles: ["admin", "staff", "manager"], tier: "more" },
  { label: "Reports", href: "/dashboard/analytics", icon: BarChart3, roles: ["admin"], tier: "more" },
];

function isNavActive(pathname: string, href: string) {
  const base = href.split("?")[0];
  return base === "/contact" ? pathname === "/contact" : pathname === base;
}

const NOTIFICATION_ANIM_MS = 320;

export default function DashboardSubNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsMounted, setNotificationsMounted] = useState(false);
  const [notificationsPortalOpen, setNotificationsPortalOpen] = useState(false);
  const [notificationsPanelActive, setNotificationsPanelActive] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const role = ((`${session?.role ?? "staff"}`.toLowerCase() as DashboardRole) || "staff");
  const visibleNavItems = useMemo(() => navItems.filter((item) => item.roles.includes(role)), [role]);
  const primaryNavItems = useMemo(() => visibleNavItems.filter((item) => item.tier === "primary"), [visibleNavItems]);
  const moreNavItems = useMemo(() => visibleNavItems.filter((item) => item.tier === "more"), [visibleNavItems]);
  const moreMenuActive = useMemo(() => moreNavItems.some((item) => isNavActive(pathname, item.href)), [moreNavItems, pathname]);

  const notificationsQuery = useNotificationsQuery();
  const markReadMutation = useMarkNotificationReadMutation();
  const markAllReadMutation = useMarkAllNotificationsReadMutation();
  useNotificationSocket();

  const notifications = notificationsQuery.data?.items ?? [];
  const unreadCount = notificationsQuery.data?.unread_count ?? 0;

  const relativeTime = (timestamp: string) => {
    const deltaSeconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (deltaSeconds < 60) return "just now";
    const minutes = Math.floor(deltaSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  useEffect(() => {
    setMoreMenuOpen(false);
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setNotificationsMounted(true);
  }, []);

  useEffect(() => {
    if (notificationsOpen) {
      setNotificationsPortalOpen(true);
      const openFrame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setNotificationsPanelActive(true));
      });
      return () => cancelAnimationFrame(openFrame);
    }

    setNotificationsPanelActive(false);
    const closeTimer = window.setTimeout(() => setNotificationsPortalOpen(false), NOTIFICATION_ANIM_MS);
    return () => window.clearTimeout(closeTimer);
  }, [notificationsOpen]);

  useEffect(() => {
    if (!notificationsPortalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [notificationsPortalOpen]);

  useEffect(() => {
    if (!notificationsPortalOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNotificationsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [notificationsPortalOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (isActive: boolean) =>
    `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors lg:px-3 ${
      isActive
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-text-secondary hover:bg-bg-card hover:text-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-card dark:hover:text-dark-text-primary"
    }`;

  const renderNavLink = (item: NavItem, onNavigate?: () => void) => {
    const Icon = item.icon;
    const isActive = isNavActive(pathname, item.href);
    return (
      <Link key={item.href} href={item.href} title={item.label} onClick={onNavigate} className={navLinkClass(isActive)}>
        <Icon size={16} className="shrink-0" />
        <span className="hidden lg:inline">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="border-b border-border-primary bg-bg-secondary/50 dark:border-dark-border-primary dark:bg-dark-bg-secondary/40">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-12">
        <p className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary md:block dark:text-dark-text-tertiary">
          Workspace
        </p>

        <div className="hidden min-w-0 flex-1 items-center gap-1 py-2 md:flex">
          {primaryNavItems.map((item) => renderNavLink(item))}
          {moreNavItems.length > 0 ? (
            <div className="relative shrink-0" ref={moreMenuRef}>
              <button
                type="button"
                aria-expanded={moreMenuOpen}
                onClick={() => {
                  setMoreMenuOpen((prev) => !prev);
                  setNotificationsOpen(false);
                }}
                className={navLinkClass(moreMenuActive || moreMenuOpen)}
              >
                <MoreHorizontal size={16} className="shrink-0" />
                <span className="hidden lg:inline">More</span>
                <ChevronDown size={14} className={`hidden transition-transform lg:inline ${moreMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {moreMenuOpen ? (
                <div className="absolute left-0 top-full z-[70] mt-1 min-w-[11rem] rounded-xl border border-border-primary bg-bg-card py-1.5 shadow-xl dark:border-dark-border-primary dark:bg-dark-bg-card">
                  {moreNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isNavActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm ${
                          isActive
                            ? "bg-bg-secondary font-medium text-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary"
                            : "text-text-secondary hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 py-2 md:py-0">
          <button
            type="button"
            className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              notificationsOpen
                ? "border-border-secondary bg-bg-card dark:border-dark-border-secondary dark:bg-dark-bg-card"
                : "border-border-primary bg-bg-card hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:bg-dark-bg-secondary"
            }`}
            aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
            aria-expanded={notificationsOpen}
            aria-controls="dashboard-notifications-panel"
            onClick={() => {
              setNotificationsOpen((prev) => !prev);
              setMoreMenuOpen(false);
            }}
          >
            <Bell size={17} className="text-text-secondary dark:text-dark-text-secondary" />
            {unreadCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white ring-2 ring-bg-secondary dark:ring-dark-bg-secondary">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-primary bg-bg-card px-3 text-xs font-medium text-text-secondary md:hidden dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Workspace menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            Menu
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-border-primary bg-bg-card px-4 py-3 md:hidden dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className="flex flex-col gap-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-text-secondary hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      {notificationsMounted && notificationsPortalOpen
        ? createPortal(
            <>
              <div
                className={`dc-notifications-overlay fixed inset-0 z-[80] bg-black/40 backdrop-blur-[1px] ${
                  notificationsPanelActive ? "dc-notifications-overlay--open pointer-events-auto" : "pointer-events-none"
                }`}
                aria-hidden={!notificationsPanelActive}
              >
                <button
                  type="button"
                  className="h-full w-full cursor-default"
                  aria-label="Close notifications"
                  tabIndex={notificationsPanelActive ? 0 : -1}
                  onClick={() => setNotificationsOpen(false)}
                />
              </div>

              <aside
                id="dashboard-notifications-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Notifications"
                className={`dc-notifications-drawer fixed inset-y-0 right-0 z-[90] flex w-[min(100vw,22rem)] flex-col border-l border-border-primary bg-bg-card shadow-2xl dark:border-dark-border-primary dark:bg-dark-bg-card sm:w-96 ${
                  notificationsPanelActive ? "dc-notifications-drawer--open pointer-events-auto" : "pointer-events-none"
                }`}
                aria-hidden={!notificationsPanelActive}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-border-primary px-5 py-4 dark:border-dark-border-primary">
                  <div>
                    <p className="text-base font-semibold text-text-primary dark:text-dark-text-primary">Notifications</p>
                    <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      {unreadCount > 0 ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}` : "You're all caught up"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {unreadCount > 0 ? (
                      <button type="button" onClick={() => void markAllReadMutation.mutateAsync()} className="rounded-lg px-2 py-1 text-xs font-medium text-accent-primary hover:bg-blue-50 dark:hover:bg-dark-bg-secondary">
                        Mark all read
                      </button>
                    ) : null}
                    <button type="button" onClick={() => setNotificationsOpen(false)} className="rounded-lg p-2 text-text-tertiary hover:bg-bg-secondary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary" aria-label="Close notifications panel">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
                  {notifications.map((item) => {
                    const isUnread = !item.is_read;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`mb-2 block w-full rounded-xl border px-4 py-3 text-left transition ${
                          isUnread
                            ? "border-blue-200 bg-blue-50/40 hover:bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/20 dark:hover:bg-blue-900/25"
                            : "border-border-primary bg-bg-card hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:bg-dark-bg-secondary"
                        }`}
                        onClick={() => {
                          if (!item.is_read) void markReadMutation.mutateAsync(item.id);
                          setNotificationsOpen(false);
                          if (item.link) router.push(item.link);
                        }}
                      >
                        <p className="flex items-center gap-2 text-sm font-medium text-text-primary dark:text-dark-text-primary">
                          {isUnread ? <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-red-500" /> : null}
                          <span className="min-w-0">{item.title}</span>
                        </p>
                        <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">{relativeTime(item.created_at)}</p>
                      </button>
                    );
                  })}
                  {!notifications.length ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-primary px-6 py-14 text-center dark:border-dark-border-primary">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-secondary dark:bg-dark-bg-secondary">
                        <Bell size={24} className="text-text-tertiary dark:text-dark-text-tertiary" />
                      </span>
                      <p className="mt-4 text-sm font-semibold text-text-primary dark:text-dark-text-primary">No updates yet</p>
                      <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                        Billing, site changes, and support replies will appear here when something happens.
                      </p>
                    </div>
                  ) : null}
                </div>
              </aside>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
