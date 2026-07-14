"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import "@/features/services/services.css";

const HEADER_OFFSET = 74;
const SPY_TOP = HEADER_OFFSET + 64;

export interface StickyCategoryNavGroup {
  id: string;
  title: string;
}

interface StickyCategoryNavProps {
  groups: readonly StickyCategoryNavGroup[];
  ariaLabel: string;
  className?: string;
}

function clearLocationHash() {
  if (!window.location.hash) return;
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

export function StickyCategoryNav({
  groups,
  ariaLabel,
  className,
}: StickyCategoryNavProps) {
  const navId = useId();
  const [activeId, setActiveId] = useState<string>(groups[0]?.id ?? "");
  const ratiosRef = useRef(new Map<string, number>());

  const scrollToGroup = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top =
      el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 56;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !groups.some((g) => g.id === hash)) return;

    const frame = requestAnimationFrame(() => {
      scrollToGroup(hash);
    });
    return () => cancelAnimationFrame(frame);
  }, [groups, scrollToGroup]);

  useEffect(() => {
    const sections = groups
      .map((g) => document.getElementById(g.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    ratiosRef.current = new Map(sections.map((section) => [section.id, 0]));

    const syncFromSpy = () => {
      const ratios = ratiosRef.current;
      let bestId = "";
      let bestRatio = 0;

      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId && bestRatio > 0) {
        setActiveId((current) => (current === bestId ? current : bestId));
        const nextHash = `#${bestId}`;
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, "", nextHash);
        }
        return;
      }

      const first = sections[0];
      if (!first) return;

      // Above the first tracked section (e.g. hero / page top) → plain route.
      if (first.getBoundingClientRect().top > SPY_TOP) {
        setActiveId((current) => (current === "" ? current : ""));
        clearLocationHash();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        syncFromSpy();
      },
      {
        rootMargin: `-${SPY_TOP}px 0px -45% 0px`,
        threshold: [0.15, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      syncFromSpy();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    syncFromSpy();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [groups]);

  function onClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    scrollToGroup(id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLAnchorElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToGroup(id);
    }
  }

  return (
    <div
      className={cn(
        "services-category-nav sticky top-[74px] z-[calc(var(--z-sticky)-1)] w-full border-b border-border/60 bg-background/90 backdrop-blur-xl",
        "shadow-[0_1px_0_0_color-mix(in_srgb,var(--border)_70%,transparent)]",
        className,
      )}
    >
      <Container size="xl">
        <nav
          id={navId}
          aria-label={ariaLabel}
          className="flex w-full justify-center gap-[12px] overflow-x-auto scroll-smooth px-[2px] py-[14px] [scrollbar-width:none] [-ms-overflow-style:none] [scroll-padding-inline:12px] [&::-webkit-scrollbar]:hidden"
        >
          {groups.map((group) => {
            const isActive = activeId === group.id;
            return (
              <a
                key={group.id}
                href={`#${group.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => onClick(e, group.id)}
                onKeyDown={(e) => onKeyDown(e, group.id)}
                className={cn(
                  "services-category-tab inline-flex min-h-[42px] shrink-0 items-center rounded-full px-[18px]",
                  "font-sans text-[13px] font-semibold no-underline whitespace-nowrap",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "services-category-tab--active"
                    : "services-category-tab--idle",
                )}
              >
                {group.title}
              </a>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
