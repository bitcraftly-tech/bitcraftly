'use client';

import { useCallback } from 'react';
import { MountWhenVisible } from '@/components/patterns/mount-when-visible';
import type { FaqAccordionItem } from '@/components/patterns/faq-accordion';
import type { ComponentType } from 'react';

interface FaqAccordionLazyProps {
  items: readonly FaqAccordionItem[];
}

function FaqStaticFallback({ items }: { items: readonly FaqAccordionItem[] }) {
  return (
    <div className="faq-section-list w-full" role="presentation">
      {items.map((item, index) => {
        const isOpen = index === 0;
        return (
          <div
            key={item.id}
            className="faq-item overflow-hidden rounded-[16px]"
            data-open={isOpen ? 'true' : 'false'}
          >
            <h3 className="m-0">
              <span className="faq-trigger">
                <span className="faq-index" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="faq-question">{item.question}</span>
              </span>
            </h3>
            {isOpen ? (
              <div className="faq-panel">
                <div className="faq-panel-inner">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Defers FaqAccordion hydration until near viewport (cuts homepage TBT).
 * SSR fallback preserves FAQ content for SEO/layout.
 */
export function FaqAccordionLazy({ items }: FaqAccordionLazyProps) {
  const load = useCallback((): Promise<ComponentType> => {
    return import('@/components/patterns/faq-accordion').then((mod) => {
      function BoundFaqAccordion() {
        return <mod.FaqAccordion items={items} />;
      }
      return BoundFaqAccordion;
    });
  }, [items]);

  return <MountWhenVisible load={load} fallback={<FaqStaticFallback items={items} />} />;
}
