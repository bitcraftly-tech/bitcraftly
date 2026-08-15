'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useId, useState } from 'react';

import DayalFooterMap from '@bitcraftly/showcase-dayal-builders/components/DayalFooterMap';
import {
  DAYAL,
  DAYAL_DEFAULT_LOCATION_ID,
  DAYAL_LOCATIONS,
  type DayalMapLocationId,
  getDayalLocation,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

export default function DayalContactInfo() {
  const tablistId = useId().replace(/:/g, '');
  const [selectedId, setSelectedId] = useState<DayalMapLocationId>(DAYAL_DEFAULT_LOCATION_ID);
  const selected = getDayalLocation(selectedId);

  return (
    <div className="dayal-footer-contact">
      <div className="dayal-footer-contact__locations">
        <div
          role="tablist"
          aria-label="Office locations"
          className="dayal-footer-contact__tabs"
          id={tablistId}
        >
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
                className={`dayal-footer-contact__tab ${
                  isActive ? 'dayal-footer-contact__tab--active' : ''
                }`}
              >
                <span className="dayal-footer-contact__tab-icon" aria-hidden>
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="dayal-footer-contact__tab-label">{location.title}</span>
                  <span className="dayal-footer-contact__tab-address">{location.address}</span>
                </span>
              </button>
            );
          })}
        </div>

        <ul className="dayal-footer-contact__channels">
          {DAYAL.phones.map((phone) => (
            <li key={phone.tel}>
              <a href={`tel:${phone.tel}`} className="dayal-footer-contact__channel">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {phone.display}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${DAYAL.email}`} className="dayal-footer-contact__channel">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <span className="break-all">{DAYAL.email}</span>
            </a>
          </li>
        </ul>
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-labelledby={`${tablistId}-${selected.id}`}
        className="dayal-footer-contact__map"
      >
        <DayalFooterMap key={selected.id} location={selected} />
      </div>
    </div>
  );
}
