import Image from 'next/image';
import { cn } from '@/lib/cn';

interface WorkBrowserCoverProps {
  src: string;
  alt: string;
  hostname: string;
  /** Prefix class family: `work-featured-card` or `work-card`. */
  namespace?: 'work-featured-card' | 'work-card';
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Browser chrome + real portfolio screenshot (or CSS mock fallback).
 */
export function WorkBrowserCover({
  src,
  alt,
  hostname,
  namespace = 'work-card',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className,
}: WorkBrowserCoverProps) {
  const hasScreenshot =
    src.startsWith('http') || src.startsWith('/work/') || src.startsWith('/images/');

  return (
    <div className={cn(`${namespace}__browser`, className)} aria-hidden={!hasScreenshot}>
      <div className={`${namespace}__browser-bar`}>
        <span />
        <span />
        <span />
        <div className={`${namespace}__browser-url`}>{hostname}</div>
      </div>
      <div
        className={cn(
          `${namespace}__browser-body`,
          hasScreenshot && `${namespace}__browser-body--shot`,
        )}
      >
        {hasScreenshot ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`${namespace}__shot`}
          />
        ) : (
          <>
            <div className={`${namespace}__pane ${namespace}__pane--nav`} />
            <div className={`${namespace}__pane-main`}>
              <div className={`${namespace}__pane-block`} />
              <div className={`${namespace}__pane-block ${namespace}__pane-block--wide`} />
              <div className={`${namespace}__bars`} aria-hidden>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
