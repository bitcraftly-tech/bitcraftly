"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, CreditCard, LayoutDashboard, LayoutGrid, LogOut, Settings, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { LogoutConfirmDialog } from "@/components/ui/LogoutConfirmDialog";
import { userInitials } from "@/lib/userDisplay";

function isPrivilegedRole(role?: string | null) {
  const r = `${role ?? ""}`.toLowerCase();
  return r === "admin" || r === "staff" || r === "manager";
}

type NavbarProfileMenuProps = {
  /** Desktop: compact trigger in navbar row. Mobile: full-width inside sheet */
  variant?: "desktop" | "mobile";
  /** Called after selecting a menu link (e.g. close mobile nav sheet) */
  onNavigate?: () => void;
};

export default function NavbarProfileMenu({ variant = "desktop", onNavigate }: NavbarProfileMenuProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const closeAndNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  useEffect(() => {
    function handlePointer(event: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer, { passive: true });
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const items = rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    const first = items?.[0];
    first?.focus();
  }, [open]);

  if (!session) return null;

  const name = session.user?.name?.trim() || "Account";
  const email = session.user?.email ?? "";
  const initials = userInitials(session.user?.name ?? "", email);

  const privileged = isPrivilegedRole(session.role);

  const panelBase =
    "overflow-hidden rounded-2xl border border-border-primary bg-bg-card/95 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95";

  const itemClass =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-text-primary outline-none transition-colors hover:bg-bg-secondary focus-visible:bg-bg-secondary focus-visible:ring-2 focus-visible:ring-violet-500/40 dark:text-zinc-100 dark:hover:bg-zinc-800/80 dark:focus-visible:bg-zinc-800/80";

  const iconWrap = "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-text-secondary dark:bg-zinc-800 dark:text-zinc-300";

  return (
    <div ref={rootRef} className={variant === "mobile" ? "relative w-full" : "relative"}>
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? `${menuId}-menu` : undefined}
        onClick={() => setOpen((o) => !o)}
        className={
          variant === "mobile"
            ? "flex w-full items-center justify-between gap-3 rounded-xl border border-border-primary bg-bg-secondary/80 px-3 py-2.5 text-left transition hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary/80 dark:hover:bg-dark-bg-secondary"
            : "flex items-center gap-2 rounded-full border border-border-primary py-1 pl-1 pr-2 transition hover:border-border-secondary dark:border-dark-border-primary dark:hover:border-dark-border-secondary"
        }
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-semibold text-white shadow-sm ring-2 ring-white/10 dark:ring-black/20">
            {initials}
          </span>
          {variant === "desktop" ? (
            <span className="hidden max-w-[100px] truncate text-sm font-medium text-text-primary dark:text-dark-text-primary sm:inline lg:max-w-[140px]">
              {name}
            </span>
          ) : (
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary dark:text-dark-text-primary">{name}</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200 dark:text-zinc-400 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <div
        id={`${menuId}-menu`}
        role="menu"
        aria-labelledby={`${menuId}-trigger`}
        aria-hidden={!open}
        className={`${panelBase} transition-all duration-200 ease-out motion-reduce:transition-none ${
          variant === "mobile"
            ? `absolute left-0 right-0 top-full z-[60] mt-2 w-full origin-top ${
                open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0"
              }`
            : `absolute right-0 top-full z-[70] mt-2 min-w-[280px] origin-top-right ${
                open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`
        }`}
      >
        <div className="border-b border-border-primary px-4 py-3 dark:border-zinc-800">
          <p className="truncate text-sm font-semibold text-text-primary dark:text-zinc-50">{name}</p>
          <p className="mt-0.5 truncate text-xs text-text-secondary dark:text-zinc-400">{email}</p>
        </div>

        <div className="p-2">
          {privileged ? (
            <>
              <Link
                href="/dashboard/profile"
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className={itemClass}
                onClick={closeAndNavigate}
              >
                <span className={iconWrap} aria-hidden>
                  <User className="h-4 w-4" />
                </span>
                My Profile
              </Link>
              <Link href="/dashboard" role="menuitem" tabIndex={open ? 0 : -1} className={itemClass} onClick={closeAndNavigate}>
                <span className={iconWrap} aria-hidden>
                  <LayoutDashboard className="h-4 w-4" />
                </span>
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className={itemClass}
                onClick={closeAndNavigate}
              >
                <span className={iconWrap} aria-hidden>
                  <Settings className="h-4 w-4" />
                </span>
                Settings
              </Link>
              <Link
                href="/dashboard/billing"
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className={itemClass}
                onClick={closeAndNavigate}
              >
                <span className={iconWrap} aria-hidden>
                  <CreditCard className="h-4 w-4" />
                </span>
                Billing
              </Link>
            </>
          ) : (
            <>
              <Link href="/account" role="menuitem" tabIndex={open ? 0 : -1} className={itemClass} onClick={closeAndNavigate}>
                <span className={iconWrap} aria-hidden>
                  <User className="h-4 w-4" />
                </span>
                My Profile
              </Link>
              <Link href="/portal" role="menuitem" tabIndex={open ? 0 : -1} className={itemClass} onClick={closeAndNavigate}>
                <span className={iconWrap} aria-hidden>
                  <LayoutGrid className="h-4 w-4" />
                </span>
                Service portal
              </Link>
            </>
          )}
        </div>

        <div className="border-t border-border-primary p-2 dark:border-zinc-800">
          <button
            type="button"
            role="menuitem"
            tabIndex={open ? 0 : -1}
            className={`${itemClass} text-red-600 hover:bg-red-500/10 focus-visible:ring-red-500/30 dark:text-red-400 dark:hover:bg-red-950/40`}
            onClick={() => {
              setOpen(false);
              setLogoutConfirmOpen(true);
            }}
          >
            <span className={`${iconWrap} bg-red-500/10 text-red-600 dark:bg-red-950/50 dark:text-red-400`} aria-hidden>
              <LogOut className="h-4 w-4" />
            </span>
            Sign out
          </button>
        </div>
      </div>

      <LogoutConfirmDialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={() => {
          setLogoutConfirmOpen(false);
          signOut({ callbackUrl: "/" });
          onNavigate?.();
        }}
      />
    </div>
  );
}
