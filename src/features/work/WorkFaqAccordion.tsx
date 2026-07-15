"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { WorkFaqItem } from "./work.types";

interface WorkFaqAccordionProps {
  items: readonly WorkFaqItem[];
}

/**
 * Reusable Work FAQ accordion — keyboard + ARIA, page-owned styles.
 */
export function WorkFaqAccordion({ items }: WorkFaqAccordionProps) {
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
        case "ArrowDown":
          event.preventDefault();
          focusButton(index + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusButton(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusButton(0);
          break;
        case "End":
          event.preventDefault();
          focusButton(items.length - 1);
          break;
        case "Escape":
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
    <div className="work-faq__accordion" role="presentation">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div
            key={item.id}
            className={cn(
              "work-faq__item",
              isOpen && "work-faq__item--open",
            )}
          >
            <h3 className="work-faq__item-heading">
              <button
                id={buttonId}
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                type="button"
                className="work-faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(event) => onTriggerKeyDown(event, index)}
              >
                <span className="work-faq__index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="work-faq__question">{item.question}</span>
                <span className="work-faq__icon-wrap" aria-hidden>
                  <Icon
                    name="chevron-down"
                    size="sm"
                    className="work-faq__chevron h-[14px] w-[14px]"
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="work-faq__panel"
              hidden={!isOpen}
            >
              <p className="work-faq__answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
