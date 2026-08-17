'use client';

import { GraduationCap, HeartPulse, Landmark, Route, ShoppingBag, TrainFront } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import DayalFooterMap from '@bitcraftly/showcase-dayal-builders/components/DayalFooterMap';
import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { getDayalLocation } from '@bitcraftly/showcase-dayal-builders/lib/data';
import type { DayalMapLocationId } from '@bitcraftly/showcase-dayal-builders/lib/data';
import { CONNECTIVITY, LOCALITY_SCORES } from '@bitcraftly/showcase-dayal-builders/lib/estate';

const CONNECT_ICONS: Record<string, LucideIcon> = {
  train: TrainFront,
  school: GraduationCap,
  hospital: HeartPulse,
  market: ShoppingBag,
  highway: Route,
  city: Landmark,
};

const PLACES: readonly { readonly id: DayalMapLocationId; readonly label: string }[] = [
  { id: 'site', label: 'Project site' },
  { id: 'office', label: 'Head office' },
];

const SLOWEST_MINUTES = Math.max(...CONNECTIVITY.map((point) => point.minutes));

/** Keeps the loader on screen long enough to read, even when the frame is cached */
const LOADER_MIN_MS = 550;
/** Never leave the loader up if the embed never reports a load */
const LOADER_MAX_MS = 6000;

export default function DayalEstateLocality() {
  const [placeId, setPlaceId] = useState<DayalMapLocationId>('site');
  const [mapLoading, setMapLoading] = useState(false);
  const minDelayDone = useRef(false);
  const frameLoaded = useRef(false);
  const location = getDayalLocation(placeId);

  useEffect(() => {
    if (!mapLoading) return;
    minDelayDone.current = false;
    frameLoaded.current = false;

    const minTimer = window.setTimeout(() => {
      minDelayDone.current = true;
      if (frameLoaded.current) setMapLoading(false);
    }, LOADER_MIN_MS);
    const maxTimer = window.setTimeout(() => setMapLoading(false), LOADER_MAX_MS);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, [mapLoading, placeId]);

  function selectPlace(nextId: DayalMapLocationId) {
    if (nextId === placeId) return;
    setMapLoading(true);
    setPlaceId(nextId);
  }

  function onMapLoad() {
    frameLoaded.current = true;
    if (minDelayDone.current) setMapLoading(false);
  }

  return (
    <section
      id="location"
      className="dre-section dre-anchor"
      aria-label="Location and connectivity"
    >
      <div className="dayal-container">
        <DayalReveal className="dre-locality__head">
          <div className="min-w-0">
            <p className="dre-eyebrow">Neighbourhood</p>
            <h2 className="dre-title mt-3">Govindpur, and everything around it</h2>
            <p className="dre-lead mt-3">
              Our sites sit on the growth corridor between Govindpur and Bistupur — daily needs
              within walking distance, the highway minutes away.
            </p>
          </div>

          <ul className="dre-locality__scores">
            {LOCALITY_SCORES.map((score) => (
              <li key={score.label}>
                <p>
                  <span>{score.label}</span>
                  <b>{score.value}</b>
                </p>
                <span className="dre-meter">
                  <i style={{ width: `${score.value}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </DayalReveal>

        <div className="dre-locality__grid">
          <DayalReveal className="dre-locality__map-card">
            <div className="dre-locality__map-head">
              <div className="min-w-0">
                <p className="dre-locality__map-label">{location.title}</p>
                <p className="dre-locality__map-address">{location.address}</p>
              </div>
              <div className="dre-locality__places" role="group" aria-label="Choose a location">
                {PLACES.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    className={`dre-chip${placeId === place.id ? ' is-active' : ''}`}
                    aria-pressed={placeId === place.id}
                    onClick={() => selectPlace(place.id)}
                  >
                    {place.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="dre-locality__map-slot">
              <DayalFooterMap location={location} onMapLoad={onMapLoad} />

              {mapLoading ? (
                <div className="dre-map-loader" role="status" aria-label="Loading map">
                  <span className="dre-map-loader__radar" aria-hidden>
                    <span className="dre-map-loader__ping" />
                    <span className="dre-map-loader__ping dre-map-loader__ping--late" />
                    <span className="dre-map-loader__core" />
                  </span>
                </div>
              ) : null}
            </div>
          </DayalReveal>

          <DayalReveal delay={0.08} className="dre-locality__connect">
            <div className="dre-locality__connect-head">
              <h3 className="dre-title dre-title--sm">Drive times from site</h3>
              <p>Typical off-peak travel by car.</p>
            </div>

            <ul className="dre-locality__points">
              {CONNECTIVITY.map((point) => {
                const Icon = CONNECT_ICONS[point.icon] ?? Route;
                return (
                  <li key={point.name}>
                    <span className="dre-locality__point-icon" aria-hidden>
                      <Icon />
                    </span>
                    <span className="dre-locality__point-body">
                      <span className="dre-locality__point-top">
                        <b>{point.name}</b>
                        <span>
                          {point.distance} · ~{point.minutes} min
                        </span>
                      </span>
                      <span className="dre-meter">
                        <i style={{ width: `${(point.minutes / SLOWEST_MINUTES) * 100}%` }} />
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="dre-note dre-locality__note">
              Distances and locality scores are indicative and measured from the Govindpur site.
            </p>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
