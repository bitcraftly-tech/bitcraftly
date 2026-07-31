import Image from 'next/image';
import { cn } from '@/lib/cn';
import '@/features/homepage/Hero/hero.css';

const SOLUTIONS_HERO_IMAGE_SRC = '/solutions-hero.webp';

/**
 * Solutions-only hero visual — full column height, centered, float animation.
 */
export function SolutionsHeroVisual() {
  return (
    <div
      className={cn(
        'relative mx-auto h-full w-full min-h-[400px] min-w-0 max-w-xl',
        'md:mx-0 md:max-w-none md:min-h-[480px]',
        'lg:mx-0 lg:h-full lg:min-h-full lg:max-w-none',
      )}
      aria-hidden="true"
    >
      <Image
        src={SOLUTIONS_HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="hero-illustration-image h-full w-full object-contain object-center"
      />
    </div>
  );
}
