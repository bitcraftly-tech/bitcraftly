'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useId, useState } from 'react';

import DayalFooterMap from '@/components/dayal/DayalFooterMap';
import {
  DAYAL,
  DAYAL_DEFAULT_LOCATION_ID,
  DAYAL_LOCATIONS,
  type DayalMapLocationId,
  getDayalLocation,
} from '@/lib/dayal/data';

export default function DayalContactInfo() {
  const tablistId = useId().replace(/:/g, '');
  const [selectedId, setSelectedId] = useState<DayalMapLocationId>(DAYAL_DEFAULT_LOCATION_ID);
  const selected = getDayalLocation(selectedId);

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <div>
        <div role="tablist" aria-label="Office locations" className="space-y-3" id={tablistId}>
          {DAYAL_LOCATIONS.map((location) => {
            const isActive = location.id === selectedId;
            return (
              <button
                key={location.id}
                type="button"
                role="tab"
                id={`${tablistId}-${location.id}`}
                aria-selected={isActive}
                aria-controls={`${tablistId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelectedId(location.id)}
                onKeyDown={(event) => {
                  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                  event.preventDefault();
                  const index = DAYAL_LOCATIONS.findIndex((item) => item.id === selectedId);
                  const next =
                    event.key === 'ArrowDown'
                      ? DAYAL_LOCATIONS[(index + 1) % DAYAL_LOCATIONS.length]
                      : DAYAL_LOCATIONS[
                          (index - 1 + DAYAL_LOCATIONS.length) % DAYAL_LOCATIONS.length
                        ];
                  setSelectedId(next.id);
                }}
                className={`flex w-full gap-3 rounded-xl border p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a46b]/45 ${
                  isActive
                    ? 'border-[#c8a46b] bg-[#c8a46b]/10 shadow-sm'
                    : 'border-[#0b1633]/8 bg-[#f8f6f2] hover:border-[#c8a46b]/40'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? 'bg-[#c8a46b] text-[#0b1633]' : 'bg-[#c8a46b]/15 text-[#c8a46b]'
                  }`}
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-[#0b1633]">
                    {location.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#5c6478]">
                    {location.address}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <ul className="mt-4 space-y-3 text-sm">
          {DAYAL.phones.map((phone) => (
            <li key={phone.tel}>
              <a
                href={`tel:${phone.tel}`}
                className="flex items-center gap-3 text-[#5c6478] transition hover:text-[#c0392b]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
                {phone.display}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${DAYAL.email}`}
              className="flex items-center gap-3 break-all text-[#5c6478] transition hover:text-[#c0392b]"
            >
              <Mail className="h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
              {DAYAL.email}
            </a>
          </li>
        </ul>
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-labelledby={`${tablistId}-${selected.id}`}
      >
        <DayalFooterMap key={selected.id} location={selected} />
      </div>
    </div>
  );
}
