"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ShopProduct } from "./ecommerce-demo-data";

function picsumFallback(seed: string, w = 400, h = 400) {
  return `https://picsum.photos/seed/shopkart-${seed}/${w}/${h}`;
}

type EcommerceLazyImageProps = {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
  eager?: boolean;
  onFallback?: () => string | null;
};

const wrapClass = (wrapperClassName: string) =>
  `ec-product-thumb relative block overflow-hidden ${wrapperClassName}`.trim();

function EcommerceLazyImage({
  src,
  alt,
  wrapperClassName = "",
  imgClassName = "h-full w-full object-cover object-center",
  eager = false,
  onFallback,
}: EcommerceLazyImageProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(eager);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const markLoadedIfComplete = useCallback(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setFailed(false);
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
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, visible]);

  const handleError = useCallback(() => {
    const next = onFallback?.();
    if (next && next !== currentSrc) {
      setCurrentSrc(next);
      setLoaded(false);
      return;
    }
    setFailed(true);
  }, [currentSrc, onFallback]);

  if (failed) {
    return <span className={wrapClass(wrapperClassName)} aria-hidden />;
  }

  if (eager) {
    return (
      <span className={wrapClass(wrapperClassName)}>
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className={imgClassName}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      </span>
    );
  }

  return (
    <span ref={containerRef} className={wrapClass(wrapperClassName)}>
      {!loaded ? <span className="ec-image-skeleton absolute inset-0 z-0 block" aria-hidden /> : null}
      {visible ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          decoding="async"
          loading="lazy"
          className={`relative z-[1] transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      ) : null}
    </span>
  );
}

type EcommerceProductImageProps = {
  product: ShopProduct;
  className?: string;
  eager?: boolean;
};

export function EcommerceProductImage({
  product,
  className = "aspect-square w-full rounded-sm",
  eager = false,
}: EcommerceProductImageProps) {
  return (
    <EcommerceLazyImage
      src={product.image}
      alt={product.title}
      wrapperClassName={className}
      eager={eager}
      onFallback={() => picsumFallback(product.id)}
    />
  );
}

export function EcommerceShowcaseImage({
  src,
  alt,
  fallbackSeed,
  className = "h-full w-full object-cover object-center",
  wrapperClassName = "",
  eager = false,
}: {
  src: string;
  alt: string;
  fallbackSeed: string;
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
}) {
  return (
    <EcommerceLazyImage
      src={src}
      alt={alt}
      wrapperClassName={wrapperClassName}
      imgClassName={className}
      eager={eager}
      onFallback={() => picsumFallback(fallbackSeed, 800, 600)}
    />
  );
}
