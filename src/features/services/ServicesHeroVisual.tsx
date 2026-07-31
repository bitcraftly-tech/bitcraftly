import Image from 'next/image';
import { cn } from '@/lib/cn';
import './services.css';

const SERVICES_HERO_IMAGE_SRC = '/services-hero.webp';

/**
 * Services-only hero visual — single premium illustration with Homepage-style float.
 * Does not reuse Homepage cube or shared hero compositions.
 */
export function ServicesHeroVisual() {
  return (
    <div
      className={cn(
        'services-hero-visual relative mx-auto h-full w-full min-h-[400px] min-w-0 max-w-xl aspect-[1/1]',
        'md:mx-0 md:max-w-none md:aspect-auto md:min-h-[480px]',
        'lg:h-full lg:min-h-full',
      )}
      aria-hidden="true"
    >
      <Image
        src={SERVICES_HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="services-hero-visual__image object-contain object-center"
      />
    </div>
  );
}
