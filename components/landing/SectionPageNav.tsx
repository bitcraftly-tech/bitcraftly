"use client";



import { useEffect, useRef, useState } from "react";



import { CONTAINER } from "@/lib/constants";

import useSectionNavSpy from "@/hooks/useSectionNavSpy";



export type SectionNavItem = {

  id: string;

  label: string;

};



type SectionPageNavProps = {

  items: readonly SectionNavItem[];

  ariaLabel: string;

};



function getSiteHeaderHeight(): number {

  return (

    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bc-nav-height")) || 72

  );

}



function SectionPageNav({ items, ariaLabel }: SectionPageNavProps) {

  const sentinelRef = useRef<HTMLDivElement>(null);

  const navRef = useRef<HTMLElement>(null);

  const [pinned, setPinned] = useState(false);

  const [navHeight, setNavHeight] = useState(0);



  const sectionIds = items.map((item) => item.id);

  const activeId = useSectionNavSpy(sectionIds);



  useEffect(() => {

    const nav = navRef.current;

    if (!nav) return;



    const syncHeight = () => setNavHeight(nav.offsetHeight);

    syncHeight();



    const ro = new ResizeObserver(syncHeight);

    ro.observe(nav);

    return () => ro.disconnect();

  }, []);



  useEffect(() => {

    const sentinel = sentinelRef.current;

    if (!sentinel) return;



    let observer: IntersectionObserver | null = null;



    const attach = () => {

      observer?.disconnect();

      const top = getSiteHeaderHeight();

      observer = new IntersectionObserver(

        ([entry]) => setPinned(!entry.isIntersecting),

        { threshold: 0, rootMargin: `-${top}px 0px 0px 0px` },

      );

      observer.observe(sentinel);

    };



    attach();

    window.addEventListener("resize", attach, { passive: true });

    return () => {

      observer?.disconnect();

      window.removeEventListener("resize", attach);

    };

  }, []);



  if (!items.length) return null;



  return (

    <>

      <div ref={sentinelRef} className="bc-section-nav-sentinel" aria-hidden />

      <div className="bc-section-nav-slot" style={pinned && navHeight ? { height: navHeight } : undefined}>

        <nav

          ref={navRef}

          aria-label={ariaLabel}

          className={`bc-section-nav ${pinned ? "bc-section-nav--pinned" : ""} border-b border-border-primary bg-bg-primary/95 backdrop-blur-md dark:border-dark-border-primary dark:bg-dark-bg-primary/95`}

        >

          <div className={`${CONTAINER} py-3`}>

            <div className="bc-section-nav-tabs" role="tablist">

              {items.map((item) => {

                const active = activeId === item.id;

                return (

                  <a

                    key={item.id}

                    href={`#${item.id}`}

                    role="tab"

                    aria-selected={active}

                    className={`bc-section-nav-tab ${active ? "bc-section-nav-tab--active" : ""}`}

                  >

                    {item.label}

                  </a>

                );

              })}

            </div>

          </div>

        </nav>

      </div>

    </>

  );

}



SectionPageNav.displayName = "SectionPageNav";



export default SectionPageNav;

