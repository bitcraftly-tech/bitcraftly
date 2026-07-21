"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { SERVICES_LANDING } from "./services.content";
import { cardMatchesSearch } from "./services-catalog.utils";
import type { ServiceCardModel } from "./services.types";

interface ServicesCatalogSearchProps {
  readonly groups: ReadonlyArray<{
    readonly id: string;
    readonly items: readonly ServiceCardModel[];
  }>;
}

export function ServicesCatalogSearch({ groups }: ServicesCatalogSearchProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const isFiltering = Boolean(deferredQuery || activeFilter);
  const visibleCount = useMemo(() => {
    if (!isFiltering) {
      return groups.reduce((sum, group) => sum + group.items.length, 0);
    }
    return groups.reduce(
      (sum, group) =>
        sum +
        group.items.filter((card) =>
          cardMatchesSearch(card, deferredQuery, activeFilter),
        ).length,
      0,
    );
  }, [groups, deferredQuery, activeFilter, isFiltering]);

  useEffect(() => {
    const root = document.getElementById("services-catalog");
    if (!root) return;

    let totalVisible = 0;
    const cardNodes = root.querySelectorAll<HTMLElement>("[data-service-card]");
    const cardsByGroup = new Map<string, HTMLElement[]>();

    cardNodes.forEach((node) => {
      const groupId = node.dataset.serviceGroup ?? "";
      const slug = node.dataset.serviceSlug ?? "";
      const card = groups
        .flatMap((group) => group.items)
        .find((item) => item.slug === slug);
      if (!card) return;

      const visible = cardMatchesSearch(card, deferredQuery, activeFilter);
      node.hidden = !visible;
      if (visible) {
        totalVisible += 1;
        const list = cardsByGroup.get(groupId) ?? [];
        list.push(node);
        cardsByGroup.set(groupId, list);
      }
    });

    root.querySelectorAll<HTMLElement>("[data-service-group]").forEach((groupEl) => {
      const groupId = groupEl.dataset.serviceGroup ?? "";
      const visibleInGroup = cardsByGroup.get(groupId)?.length ?? 0;
      const emptyMessage = groupEl.querySelector<HTMLElement>(
        "[data-group-filter-empty]",
      );
      const body = groupEl.querySelector<HTMLElement>("[data-group-body]");

      if (isFiltering && visibleInGroup === 0) {
        groupEl.hidden = false;
        if (body) body.hidden = true;
        if (emptyMessage) emptyMessage.hidden = false;
      } else if (visibleInGroup === 0 && !isFiltering) {
        groupEl.hidden = true;
      } else {
        groupEl.hidden = false;
        if (body) body.hidden = false;
        if (emptyMessage) emptyMessage.hidden = true;
      }
    });

    root.querySelectorAll<HTMLElement>("[data-catalog-featured]").forEach((el) => {
      el.hidden = isFiltering;
    });

    const related = root.querySelector<HTMLElement>("[data-catalog-related]");
    if (related) {
      related.hidden = isFiltering;
    }

    const emptyState = root.querySelector<HTMLElement>("[data-catalog-empty]");
    if (emptyState) {
      emptyState.hidden = totalVisible > 0 || !isFiltering;
    }
  }, [groups, deferredQuery, activeFilter, isFiltering]);

  function applySearchTerm(term: string) {
    setQuery(term);
    setActiveFilter(null);
  }

  function clearFilters() {
    setQuery("");
    setActiveFilter(null);
  }

  return (
    <>
      <Section
        spacing="lg"
        aria-labelledby="services-search-heading"
        className="services-search-section border-b border-border/40"
      >
        <div className="services-search-panel">
          <div className="services-search-panel__header">
            <div className="services-search-panel__intro">
              <h2
                id="services-search-heading"
                className="services-search-panel__title"
              >
                Search Services
              </h2>
              <p className="services-search-panel__subtitle">
                Find the right capability by keyword, popular search, or trend.
              </p>
            </div>
            <p className="services-search-panel__count" aria-live="polite">
              <span
                id="services-catalog-count-value"
                className="services-search-panel__count-value"
              >
                {visibleCount}
              </span>
              service{visibleCount === 1 ? "" : "s"} shown
            </p>
          </div>

          <label className="services-search-field">
            <span className="sr-only">Search services</span>
            <Icon
              name="search"
              size="sm"
              aria-hidden
              className="services-search-field__icon"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI, website, CRM, SaaS, cloud…"
              autoComplete="off"
              className="services-search-field__input"
            />
          </label>

          <div className="services-search-guides">
            <div className="services-search-guide">
              <p className="services-search-guide__label">Popular searches</p>
              <div className="services-search-guide__chips">
                {SERVICES_LANDING.popularSearches.map((term) => {
                  const pressed = query.toLowerCase() === term.toLowerCase();
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => applySearchTerm(term)}
                      aria-pressed={pressed}
                      className={cn(
                        "services-search-chip",
                        pressed && "services-search-chip--active",
                      )}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="services-search-guide">
              <p className="services-search-guide__label">Trending services</p>
              <div className="services-search-guide__chips">
                {SERVICES_LANDING.trendingServices.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="services-search-chip services-search-chip--trend"
                  >
                    <span className="services-search-chip__icon" aria-hidden>
                      <Icon name={item.icon} size="sm" />
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="services-search-filters"
            role="group"
            aria-label="Filter by capability"
          >
            <p className="services-search-guide__label">Browse by capability</p>
            <div className="services-search-filters__row">
              <button
                type="button"
                onClick={() => setActiveFilter(null)}
                aria-pressed={activeFilter === null}
                className={cn(
                  "services-search-chip services-search-chip--filter",
                  activeFilter === null && "services-search-chip--active",
                )}
              >
                All
              </button>
              {SERVICES_LANDING.filterChips.map((chip) => {
                const pressed = activeFilter === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() =>
                      setActiveFilter((current) =>
                        current === chip ? null : chip,
                      )
                    }
                    aria-pressed={pressed}
                    className={cn(
                      "services-search-chip services-search-chip--filter",
                      pressed && "services-search-chip--active",
                    )}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section
        spacing="lg"
        className="bg-background"
        aria-live="polite"
        data-catalog-empty
        hidden
      >
        <p className="m-0 font-sans text-[15px] text-muted-foreground">
          No services match your search. Try a popular search or clear filters.
        </p>
        <button
          type="button"
          className="mt-[12px] font-sans text-[14px] font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={clearFilters}
        >
          Clear search & filters
        </button>
      </Section>
    </>
  );
}
