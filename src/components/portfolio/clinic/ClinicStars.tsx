import { Star } from 'lucide-react';

type Props = {
  rating: number;
  className?: string;
  size?: number;
};

/** Five-star rating that stays readable for screen readers and without colour. */
export default function ClinicStars({ rating, className = '', size = 14 }: Props) {
  const rounded = Math.round(rating);

  return (
    /* `relative` anchors the absolutely positioned label, so it stays clipped
       inside scrolling rails instead of widening the page. */
    <span className={`relative inline-flex items-center gap-0.5 ${className}`.trim()}>
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          width={size}
          height={size}
          aria-hidden
          className={index < rounded ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}
          fill={index < rounded ? 'currentColor' : 'none'}
          strokeWidth={index < rounded ? 0 : 1.5}
        />
      ))}
    </span>
  );
}
