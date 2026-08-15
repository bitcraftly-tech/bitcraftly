'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function picsumFallback(seed: string, w = 600, h = 400) {
  return `https://picsum.photos/seed/heritage-crown-${seed}/${w}/${h}`;
}

type SchoolLazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
  fallbackSeed?: string;
  fallbackSrc?: string;
};

const wrapClass = (wrapperClassName: string) =>
  `relative block overflow-hidden bg-[var(--school-surface)] ${wrapperClassName}`.trim();

export function SchoolLazyImage({
  src,
  alt,
  className = 'h-full w-full object-cover',
  wrapperClassName = '',
  eager = false,
  fallbackSeed = 'default',
  fallbackSrc,
}: SchoolLazyImageProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(eager);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markLoadedIfComplete = useCallback(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
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
      { rootMargin: '200px 0px', threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, visible]);

  const handleError = useCallback(() => {
    if (!usedFallback) {
      setUsedFallback(true);
      setCurrentSrc(fallbackSrc ?? picsumFallback(fallbackSeed));
      setLoaded(false);
    }
  }, [fallbackSeed, fallbackSrc, usedFallback]);

  if (eager) {
    return (
      <span className={wrapClass(wrapperClassName)}>
        <img
          src={currentSrc}
          alt={alt}
          className={className}
          loading="eager"
          decoding="async"
          onError={handleError}
        />
      </span>
    );
  }

  const showImage = mounted && visible;
  const imageOpacity = mounted && loaded ? 'opacity-100' : 'opacity-0';

  return (
    <span ref={containerRef} className={wrapClass(wrapperClassName)}>
      {showImage && !loaded ? (
        <span className="school-image-skeleton absolute inset-0 z-0 block" aria-hidden />
      ) : null}
      {showImage ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`relative z-[1] transition-opacity duration-300 ${imageOpacity} ${className}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      ) : null}
    </span>
  );
}
