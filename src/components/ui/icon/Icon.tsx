import { cn } from '@/lib/cn';
import { iconRegistry } from './icons';
import type { IconProps, IconSize } from './types';

const sizeStyles: Record<IconSize, string> = {
  sm: 'size-[var(--font-size-sm)]',
  md: 'size-[var(--font-size-base)]',
  lg: 'size-[var(--font-size-lg)]',
  xl: 'size-[var(--font-size-xl)]',
};

export function Icon({
  name,
  size = 'md',
  className,
  'aria-hidden': ariaHidden,
  title,
}: IconProps) {
  const icon = iconRegistry[name];
  const isMeaningful = Boolean(title);
  const resolvedAriaHidden = ariaHidden ?? !isMeaningful;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox ?? '0 0 24 24'}
      fill={icon.fill ?? 'none'}
      stroke="currentColor"
      strokeWidth={icon.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0 text-current', sizeStyles[size], className)}
      aria-hidden={resolvedAriaHidden ? true : undefined}
      role={isMeaningful ? 'img' : undefined}
      aria-label={isMeaningful ? title : undefined}
    >
      {title ? <title>{title}</title> : null}
      {icon.circles?.map((circle) => (
        <circle
          key={`circle-${circle.cx}-${circle.cy}`}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
        />
      ))}
      {icon.rects?.map((rect) => (
        <rect
          key={`rect-${rect.x}-${rect.y}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={rect.rx}
        />
      ))}
      {icon.paths.map((path) => (
        <path key={path} d={path} />
      ))}
      {icon.polylines?.map((points) => (
        <polyline key={points} points={points} />
      ))}
      {icon.polygons?.map((points) => (
        <polygon key={points} points={points} />
      ))}
    </svg>
  );
}
