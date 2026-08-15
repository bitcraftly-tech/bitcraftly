'use client';

import { useId } from 'react';

type Props = {
  className?: string;
};

/** Ecommerce Store brand mark — gradient tile with a shopping basket, smile swoosh and deal spark. */
export default function EcommerceLogoMark({ className = '' }: Props) {
  const uid = useId();
  const tileId = `${uid}-tile`;
  const sheenId = `${uid}-sheen`;
  const swooshId = `${uid}-swoosh`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={`ec-logo-mark ${className}`.trim()}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={tileId} x1="2" y1="0" x2="46" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f766e" />
          <stop offset="0.48" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id={sheenId} x1="4" y1="0" x2="32" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={swooshId}
          x1="18"
          y1="26"
          x2="30"
          y2="31"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0f766e" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="14" fill={`url(#${tileId})`} />
      <rect width="48" height="48" rx="14" fill={`url(#${sheenId})`} />

      <path
        d="M16 19.3v-1.6a8 5.4 0 0 1 16 0v1.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M12.4 18.8h23.2a3 3 0 0 1 2.99 3.3l-1.2 11.4a4.5 4.5 0 0 1-4.47 4.1H15.08a4.5 4.5 0 0 1-4.47-4.1l-1.2-11.4a3 3 0 0 1 2.99-3.3Z"
        fill="#ffffff"
      />
      <path
        d="M18.6 26.4c1.8 2.7 3.6 4.05 5.4 4.05s3.6-1.35 5.4-4.05"
        fill="none"
        stroke={`url(#${swooshId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      <path
        d="M37.6 5.6 39.3 9.4 43.1 11.1 39.3 12.8 37.6 16.6 35.9 12.8 32.1 11.1 35.9 9.4Z"
        fill="#ffe27a"
      />
    </svg>
  );
}
