"use client";

import { ChevronDown, MapPin, Menu, Search, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CONTAINER } from "@/lib/constants";
import { useEcommerceDemo } from "@/app/portfolio/ecommerce-store-showcase/EcommerceDemoContext";
import type { ShopDepartment } from "@/app/portfolio/ecommerce-store-showcase/ecommerce-demo-data";

const SUB_NAV = ["Deals", "Electronics", "Fashion", "Home & Kitchen", "Best sellers"] as const;

const DEPARTMENTS: ShopDepartment[] = ["All", "Electronics", "Fashion", "Home & Kitchen", "Deals"];

export default function EcommerceNavbar() {
  const {
    searchQuery,
    setSearchQuery,
    runSearch,
    department,
    setDepartment,
    cartCount,
    setCartOpen,
    setAccountOpen,
    setPincodeOpen,
    setOrdersOpen,
    signedInAs,
    pincode,
    scrollToSection,
    setSort,
  } = useEcommerceDemo();

  const [deptOpen, setDeptOpen] = useState(false);
  const deptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) setDeptOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pickDepartment = (d: ShopDepartment) => {
    setDepartment(d);
    setDeptOpen(false);
    scrollToSection("search-results");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="ec-header-bar">
        <div className={`${CONTAINER} flex flex-wrap items-center gap-3 py-2 md:gap-4`}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center gap-1 pt-1"
          >
            <span className="text-xl font-bold tracking-tight text-white md:text-2xl">shop</span>
            <span className="ec-brand-accent text-xl font-bold md:text-2xl">Kart</span>
          </button>

          <button
            type="button"
            onClick={() => setPincodeOpen(true)}
            className="hidden min-w-0 items-start gap-1 rounded-sm border border-transparent px-2 py-1 text-left hover:border-white lg:flex"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span className="min-w-0">
              <span className="block text-[11px] text-[var(--ec-header-muted)]">Deliver to</span>
              <span className="block max-w-[140px] truncate text-sm font-bold">{pincode.split(" · ")[1] ?? pincode}</span>
            </span>
          </button>

          <form
            className="order-3 flex min-w-0 flex-1 basis-full items-stretch md:order-none md:basis-auto"
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
          >
            <div ref={deptRef} className="relative hidden shrink-0 sm:block">
              <button
                type="button"
                onClick={() => setDeptOpen((o) => !o)}
                className="ec-text flex h-full items-center gap-1 rounded-l-md px-3 text-xs hover:opacity-90"
                style={{ backgroundColor: "var(--ec-search-dept)" }}
              >
                {department === "All" ? "All" : department}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </button>
              {deptOpen ? (
                <ul className="ec-bg-surface ec-text ec-border absolute left-0 top-full z-50 mt-0.5 min-w-[180px] rounded-sm border py-1 shadow-lg">
                  {DEPARTMENTS.map((d) => (
                    <li key={d}>
                      <button
                        type="button"
                        onClick={() => pickDepartment(d)}
                        className={`ec-hover-surface block w-full px-3 py-2 text-left text-xs ${
                          department === d ? "font-bold ec-link" : ""
                        }`}
                      >
                        {d}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <label className="flex min-w-0 flex-1">
              <span className="sr-only">Search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shopKart"
                className="ec-input w-full min-w-0 border-0 px-3 py-2 text-sm outline-none"
              />
            </label>
            <button type="submit" className="ec-search-submit rounded-r-md px-4" aria-label="Search">
              <Search className="h-5 w-5" aria-hidden />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1 text-xs sm:gap-0">
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="hidden rounded-sm border border-transparent px-2 py-1 text-left hover:border-white sm:block"
            >
              <span className="block text-[11px] text-[var(--ec-header-muted)]">
                {signedInAs ? `Hello, ${signedInAs.split(" ")[0]}` : "Hello, sign in"}
              </span>
              <span className="flex items-center gap-0.5 text-sm font-bold">
                Account &amp; Lists
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOrdersOpen(true)}
              className="hidden rounded-sm border border-transparent px-2 py-1 text-left hover:border-white md:block"
            >
              <span className="block text-[11px] text-[var(--ec-header-muted)]">Returns</span>
              <span className="text-sm font-bold">&amp; Orders</span>
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex items-end gap-1 rounded-sm border border-transparent px-2 py-1 hover:border-white"
            >
              <div className="relative">
                <ShoppingCart className="h-8 w-8" aria-hidden />
                {cartCount > 0 ? (
                  <span className="ec-cart-badge absolute -right-1 top-0 rounded-full px-1.5 text-[11px] font-bold">
                    {cartCount}
                  </span>
                ) : null}
              </div>
              <span className="hidden pb-1 font-bold sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="ec-header-nav-bar" aria-label="Shop departments">
        <div className={`${CONTAINER} flex items-center gap-0 overflow-x-auto py-2 scrollbar-none`}>
          <button
            type="button"
            onClick={() => scrollToSection("search-results")}
            className="mr-2 flex shrink-0 items-center gap-1.5 rounded-sm border border-transparent px-2 py-1 text-sm font-bold hover:border-white"
          >
            <Menu className="h-5 w-5" aria-hidden />
            All
          </button>
          {SUB_NAV.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (item === "Deals") {
                  setDepartment("Deals");
                  scrollToSection("deals");
                } else if (item === "Electronics" || item === "Fashion" || item === "Home & Kitchen") {
                  setDepartment(item);
                  scrollToSection("search-results");
                } else {
                  setSort("rating");
                  scrollToSection("search-results");
                }
              }}
              className="shrink-0 rounded-sm border border-transparent px-2 py-1 text-xs font-medium hover:border-white sm:text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
