"use client";

import { X } from "lucide-react";
import { useState } from "react";

import {
  DAYAL,
  DAYAL_MAP,
  DAYAL_MAP_DIRECTIONS,
  DAYAL_MAP_EMBED,
  DAYAL_MAP_LINK,
} from "@/lib/dayal/data";

function GoogleMapPin() {
  return (
    <svg
      width="26"
      height="37"
      viewBox="0 0 26 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
      aria-hidden
    >
      <path
        d="M13 0C6.925 0 2 4.925 2 11c0 8.25 11 26 11 26s11-17.75 11-26C24 4.925 19.075 0 13 0z"
        fill="#EA4335"
      />
      <circle cx="13" cy="11" r="4.5" fill="#C5221F" />
    </svg>
  );
}

export default function DayalFooterMap() {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="relative min-h-[12rem] overflow-hidden rounded-xl border border-[#0b1633]/10 bg-[#f8f6f2] shadow-sm lg:min-h-[16rem]">
        <iframe
          title="Dayal Builders — Bistupur, Jamshedpur on Google Maps"
          src={DAYAL_MAP_EMBED}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        <button
          type="button"
          onClick={() => setShowAddress(true)}
          className="absolute left-1/2 top-[47%] z-10 flex -translate-x-[38%] -translate-y-full cursor-pointer items-start gap-0.5 rounded-sm border-0 bg-transparent p-0 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea4335]/50 focus-visible:ring-offset-2"
          aria-expanded={showAddress}
          aria-controls="dayal-map-address"
          aria-label={`${DAYAL_MAP.label} — show address`}
        >
          <GoogleMapPin />
          <span className="pointer-events-none select-none pt-0.5 text-[11px] font-semibold leading-tight text-[#a52714]">
            {DAYAL_MAP.label}
            <span className="block text-[9px] font-medium text-[#5c6478]">दयाल बिल्डर्स</span>
          </span>
        </button>

        {showAddress ? (
          <>
            <button
              type="button"
              className="absolute inset-0 z-20 cursor-default bg-black/10"
              aria-label="Close address"
              onClick={() => setShowAddress(false)}
            />
            <div
              id="dayal-map-address"
              role="dialog"
              aria-label={`${DAYAL_MAP.label} address`}
              className="absolute left-1/2 top-[12%] z-30 w-[min(270px,calc(100%-1.5rem))] -translate-x-1/2 rounded-lg border border-[#0b1633]/10 bg-white p-3 shadow-[0_4px_20px_rgba(11,22,51,0.2)]"
            >
              <button
                type="button"
                onClick={() => setShowAddress(false)}
                className="absolute right-2 top-2 rounded p-0.5 text-[#5c6478] transition hover:bg-[#f8f6f2] hover:text-[#0b1633]"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
              <p className="pr-6 text-sm font-semibold text-[#0b1633]">{DAYAL_MAP.label}.</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5c6478]">{DAYAL.officeAddress}</p>
              <p className="mt-1 text-xs text-[#5c6478]">{DAYAL.location}</p>
              <a
                href={DAYAL_MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-[#1a73e8] hover:text-[#1557b0] hover:underline"
              >
                Directions
              </a>
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <a
          href={DAYAL_MAP_DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#1a73e8] transition hover:text-[#1557b0] hover:underline"
        >
          Directions
        </a>
        <a
          href={DAYAL_MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5c6478] transition hover:text-[#0b1633] hover:underline"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}
