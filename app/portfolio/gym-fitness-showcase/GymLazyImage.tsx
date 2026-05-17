"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function picsumFallback(seed: string, w = 600, h = 400) {
  return `https://picsum.photos/seed/fitrally-${seed}/${w}/${h}`;
}

type GymLazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
  /** Used for picsum fallback when Unsplash fails */
  fallbackSeed?: string;
};

export function GymLazyImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  wrapperClassName = "",
  eager = false,
  fallbackSeed = "default",
}: GymLazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(eager);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const markLoadedIfComplete = useCallback(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setFailed(false);
    setUsedFallback(false);
    if (eager) setVisible(true);
  }, [src, eager]);

  useEffect(() => {
    if (!visible) return;
    markLoadedIfComplete();
  }, [visible, currentSrc, markLoadedIfComplete]);

  useEffect(() => {
    if (eager || visible) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, visible]);

  const handleError = useCallback(() => {
    if (!usedFallback) {
      setUsedFallback(true);
      setCurrentSrc(picsumFallback(fallbackSeed));
      setLoaded(false);
      return;
    }
    setFailed(true);
  }, [fallbackSeed, usedFallback]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--gym-surface)] text-[var(--gym-muted)] ${wrapperClassName}`}
        aria-hidden
      >
        <span className="text-xs font-medium">Image unavailable</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-[var(--gym-surface)] ${wrapperClassName}`}>
      {!loaded ? <div className="gym-image-skeleton absolute inset-0 z-0" aria-hidden /> : null}
      {visible ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`relative z-[1] transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      ) : null}
    </div>
  );
}
