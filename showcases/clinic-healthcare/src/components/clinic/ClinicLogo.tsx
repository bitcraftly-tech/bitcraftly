'use client';

import { useId } from 'react';

type Props = {
  className?: string;
};

/** Clinic & Healthcare mark — gradient shield with a north star and a pulse line. */
export default function ClinicLogoMark({ className = '' }: Props) {
  const uid = useId();
  const gradientId = `${uid}-shield`;

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient
          id={gradientId}
          x1="4"
          y1="2"
          x2="36"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0f766e" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <path
        d="M20 2.5 34.5 7.4v12.2c0 8.4-5.7 15-14.5 18.4C11.2 34.6 5.5 28 5.5 19.6V7.4Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="m20 9.6 2.1 4.9 4.9 2.1-4.9 2.1L20 23.6l-2.1-4.9-4.9-2.1 4.9-2.1Z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path
        d="M11 27.4h4.3l1.9-3.4 2.7 6 2.2-4 1.3 1.4H29"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}
