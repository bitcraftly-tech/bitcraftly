'use client';

import ClinicReveal from './ClinicReveal';

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
};

/** Centred section title + teal rule used across the Clinic & Healthcare page. */
export default function ClinicSectionHeading({ id, title, subtitle, align = 'center' }: Props) {
  const centered = align === 'center';

  return (
    <ClinicReveal className={centered ? 'text-center' : 'text-left'}>
      <h2 id={id} className="cl-h2">
        {title}
      </h2>
      <span
        className="cl-rule mt-4"
        style={centered ? undefined : { marginInline: '0' }}
        aria-hidden
      />
      {subtitle ? (
        <p className={`cl-body mt-4 max-w-2xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
      ) : null}
    </ClinicReveal>
  );
}
