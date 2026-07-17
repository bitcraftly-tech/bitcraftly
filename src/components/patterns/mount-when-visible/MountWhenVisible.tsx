"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

interface MountWhenVisibleProps {
  /** Dynamic import that resolves to a component. */
  load: () => Promise<ComponentType>;
  /** Shown until the island mounts (prefer lightweight SSR markup). */
  fallback?: ReactNode;
  /** IntersectionObserver rootMargin. */
  rootMargin?: string;
  className?: string;
}

/**
 * Keeps heavy client islands out of the initial hydration/TBT window.
 * Section chrome should stay as Server Components above this gate.
 */
export function MountWhenVisible({
  load,
  fallback = null,
  rootMargin = "280px 0px",
  className,
}: MountWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Comp, setComp] = useState<ComponentType | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void load().then((Loaded) => {
          if (!cancelled) setComp(() => Loaded);
        });
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [load, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {Comp ? <Comp /> : fallback}
    </div>
  );
}
