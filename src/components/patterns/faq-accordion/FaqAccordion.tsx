'use client';

import { useCallback, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

export interface FaqAccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqAccordionItem[];
}

/**
 * Shared FAQ accordion — Homepage / Services / Solutions visual treatment.
 * Consumers must import `@/features/homepage/FAQ/faq.css` (or equivalent)
 * so FAQ styles are not forced onto unrelated critical routes.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusButton = useCallback(
    (index: number) => {
      const total = items.length;
      if (total === 0) return;
      const next = ((index % total) + total) % total;
      buttonRefs.current[next]?.focus();
    },
    [items.length],
  );

  const onTriggerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          focusButton(index + 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusButton(index - 1);
          break;
        case 'Home':
          event.preventDefault();
          focusButton(0);
          break;
        case 'End':
          event.preventDefault();
          focusButton(items.length - 1);
          break;
        case 'Escape':
          if (openId !== null) {
            event.preventDefault();
            setOpenId(null);
          }
          break;
        default:
          break;
      }
    },
    [focusButton, items.length, openId],
  );

  if (items.length === 0) return null;

  return (
    <div className="faq-section-list w-full" role="presentation">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div
            key={item.id}
            className={cn('faq-item overflow-hidden rounded-[16px]')}
            data-open={isOpen ? 'true' : 'false'}
          >
            <h3 className="m-0">
              <button
                id={buttonId}
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                type="button"
                className="faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(event) => onTriggerKeyDown(event, index)}
              >
                <span className="faq-index" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="faq-question">{item.question}</span>
                <span className="faq-icon-wrap" aria-hidden>
                  <Icon name="chevron-down" size="sm" className="faq-icon h-[14px] w-[14px]" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
              aria-hidden={!isOpen}
            >
              <div className="faq-panel-inner">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
