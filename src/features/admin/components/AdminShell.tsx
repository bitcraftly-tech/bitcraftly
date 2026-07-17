"use client";

import { useEffect, useId, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainId = useId();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="admin-shell">
      <a href={`#${mainId}`} className="admin-skip">
        Skip to admin content
      </a>

      {menuOpen ? (
        <button
          type="button"
          className="admin-shell__backdrop"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <AdminSidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />

      <div className="admin-shell__main">
        <AdminTopbar
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
        />
        <main id={mainId} className="admin-shell__content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
