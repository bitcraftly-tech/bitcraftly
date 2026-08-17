'use client';

import { TICKER_ITEMS } from './local-services.content';

/** Seamless marquee of trust signals — pauses on hover and keyboard focus. */
export default function LocalServicesTicker() {
  const loop = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="lsx-ticker" aria-label="Service assurances">
      <div className="lsx-ticker__track">
        {loop.map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={`${item.id}-${index}`}
              className="lsx-ticker__item"
              aria-hidden={index >= TICKER_ITEMS.length}
            >
              <Icon size={14} strokeWidth={2} aria-hidden />
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
