"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { signOut, useSession } from "next-auth/react";
import {
  BarChart3,
  Bell,
  Briefcase,
  Car,
  ChevronDown,
  CreditCard,
  Globe,
  ClipboardList,
  LayoutDashboard,
  Menu,
  MessageCircle,
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
import { useTenant } from "@/hooks/useTenant";
import BitcraftlyLogoMark from "@/components/brand/BitcraftlyLogoMark";
import { BRAND } from "@/lib/siteContent";
import { LogoutConfirmDialog } from "@/components/ui/LogoutConfirmDialog";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { formatRoleLabel, roleBadgeClass } from "@/lib/roleDisplay";

type DashboardRole = "admin" | "staff" | "manager" | "customer";

const navItems: Array<{
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: DashboardRole[];
}> = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff", "manager"] },
  { label: "Projects", href: "/dashboard/leads", icon: Users, roles: ["admin", "staff", "manager"] },
  { label: "Applications", href: "/dashboard/applications", icon: Briefcase, roles: ["admin", "staff", "manager"] },
  { label: "Job roles", href: "/dashboard/roles", icon: ClipboardList, roles: ["admin", "staff", "manager"] },
  { label: "Websites", href: "/dashboard/templates", icon: Globe, roles: ["admin", "staff", "manager"] },
  { label: "Apps", href: "/dashboard/parking-reports", icon: Car, roles: ["admin", "staff", "manager"] },
  { label: "Support", href: "/contact?intent=support&source=bitcraftly-portal-nav", icon: MessageCircle, roles: ["admin", "staff", "manager"] },
  { label: "Invoices", href: "/dashboard/billing", icon: CreditCard, roles: ["admin", "staff", "manager"] },
  { label: "Reports", href: "/dashboard/analytics", icon: BarChart3, roles: ["admin"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin", "staff", "manager"] },
];

export default function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { tenant } = useTenant();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [tenantMenuOpen, setTenantMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [notificationsMounted, setNotificationsMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const tenantMenuRef = useRef<HTMLDivElement>(null);

  const role = ((`${session?.role ?? "staff"}`.toLowerCase() as DashboardRole) || "staff");
  const userName = session?.user?.name || "Bitcraftly User";
  const userEmail = session?.user?.email || "user@bitcraftly.com";
  const avatarText = useMemo(() => userName.slice(0, 1).toUpperCase(), [userName]);
  const visibleNavItems = useMemo(() => navItems.filter((item) => item.roles.includes(role)), [role]);
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
    setUserMenuOpen(false);
    setTenantMenuOpen(false);
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setNotificationsMounted(true);
  }, []);

  useEffect(() => {
    if (!notificationsOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [notificationsOpen]);

  useEffect(() => {
    if (!notificationsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNotificationsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [notificationsOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (tenantMenuRef.current && !tenantMenuRef.current.contains(target)) {
        setTenantMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performLogout = async () => {
    setUserMenuOpen(false);
    try {
      await signOut({ callbackUrl: "/login", redirect: true });
    } catch {
      router.push("/login");
    }
  };

  const navLinkClass = (isActive: boolean) =>
    `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors xl:px-3 ${
      isActive
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-text-secondary hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full min-w-0 overflow-x-hidden border-b border-border-primary bg-bg-card/95 backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/95">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex h-14 items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="flex min-w-0 shrink-0 items-center gap-2.5"
            title={`Bitcraftly — ${BRAND.headerTagline}`}
          >
            <BitcraftlyLogoMark size="nav" />
            <span className="truncate font-[var(--font-playfair)] text-lg font-semibold text-text-primary sm:text-xl dark:text-dark-text-primary">
              Bitcraftly
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-secondary md:hidden dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle dashboard menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="relative hidden xl:block" ref={tenantMenuRef}>
              <button
                type="button"
              className="flex items-center gap-2 rounded-lg border border-border-primary px-3 py-1.5 text-sm hover:bg-bg-secondary dark:border-dark-border-primary dark:hover:bg-dark-bg-secondary"
                onClick={() => {
                  setTenantMenuOpen((prev) => !prev);
                  setNotificationsOpen(false);
                  setUserMenuOpen(false);
                }}
              >
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-medium text-text-primary dark:text-dark-text-primary">{tenant?.name ?? "Main Admin"}</span>
                <ChevronDown size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </button>

              {tenantMenuOpen ? (
                <div className="absolute right-0 mt-2 w-52 rounded-lg border border-border-primary bg-bg-card py-2 shadow-lg dark:border-dark-border-primary dark:bg-dark-bg-card">
                  <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                    Tenants
                  </p>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-bg-secondary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Main Admin
                  </button>
                </div>
              ) : null}
            </div>

            <div className="relative">
              <button
                type="button"
                className={`relative rounded-lg p-2 transition-colors hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary ${
                  notificationsOpen ? "bg-bg-secondary dark:bg-dark-bg-secondary" : ""
                }`}
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                aria-controls="dashboard-notifications-panel"
                onClick={() => {
                  setNotificationsOpen((prev) => !prev);
                  setTenantMenuOpen(false);
                  setUserMenuOpen(false);
                }}
              >
                <Bell size={20} className="text-text-secondary dark:text-dark-text-secondary" />
                {unreadCount > 0 ? (
                  <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen((prev) => !prev);
                  setTenantMenuOpen(false);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg p-1.5 pr-2 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {avatarText}
                </div>
                <ChevronDown size={14} className="hidden text-text-tertiary sm:block dark:text-dark-text-tertiary" />
              </button>

              {userMenuOpen ? (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border-primary bg-bg-card py-2 shadow-lg dark:border-dark-border-primary dark:bg-dark-bg-card">
                  <div className="border-b border-border-primary px-4 py-2 dark:border-dark-border-primary">
                    <div className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{userName}</div>
                    <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{userEmail}</div>
                    <div className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${roleBadgeClass(role)}`}>
                      {formatRoleLabel(role)}
                    </div>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/contact?intent=support&topic=ai-assistant-beta&source=dashboard-ai-assistant"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    AI Assistant <span className="text-[10px] font-semibold uppercase text-text-tertiary">Beta</span>
                  </Link>
                  <Link
                    href="/dashboard/billing"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Invoices
                  </Link>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setUserMenuOpen(false);
                      setLogoutConfirmOpen(true);
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="hidden w-full min-w-0 border-t border-border-primary md:block dark:border-dark-border-primary">
          <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full items-center gap-0.5 pr-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const base = item.href.split("?")[0];
                const isActive = base === "/contact" ? pathname === "/contact" : pathname === base;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-label={item.label}
                    className={navLinkClass(isActive)}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-border-primary bg-bg-card px-6 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card md:hidden">
          <div className="flex flex-col gap-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const base = item.href.split("?")[0];
              const isActive = base === "/contact" ? pathname === "/contact" : pathname === base;
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

      {notificationsMounted
        ? createPortal(
            <>
              <div
                className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${
                  notificationsOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={!notificationsOpen}
              >
                <button
                  type="button"
                  className="h-full w-full cursor-default"
                  aria-label="Close notifications"
                  tabIndex={notificationsOpen ? 0 : -1}
                  onClick={() => setNotificationsOpen(false)}
                />
              </div>

              <aside
                id="dashboard-notifications-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Notifications"
                className={`fixed inset-y-0 right-0 z-[90] flex w-[min(100vw,22rem)] flex-col border-l border-border-primary bg-bg-card shadow-2xl transition-transform duration-300 ease-out dark:border-dark-border-primary dark:bg-dark-bg-card sm:w-96 ${
                  notificationsOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-hidden={!notificationsOpen}
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
                      <button
                        type="button"
                        onClick={() => void markAllReadMutation.mutateAsync()}
                        className="rounded-lg px-2 py-1 text-xs font-medium text-accent-primary hover:bg-blue-50 dark:hover:bg-dark-bg-secondary"
                      >
                        Mark all read
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="rounded-lg p-2 text-text-tertiary hover:bg-bg-secondary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary"
                      aria-label="Close notifications panel"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable]">
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
                          if (!item.is_read) {
                            void markReadMutation.mutateAsync(item.id);
                          }
                          setNotificationsOpen(false);
                          if (item.link) {
                            router.push(item.link);
                          }
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

      <LogoutConfirmDialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={() => {
          setLogoutConfirmOpen(false);
          void performLogout();
        }}
      />
    </nav>
  );
}
