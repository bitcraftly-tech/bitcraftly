import type { ComponentType } from 'react';
import { cn } from '@/lib/cn';
import {
  BannerIcon,
  BlogIcon,
  ImagesIcon,
  PostsIcon,
  ReelsIcon,
  type StudioIconProps,
  VideosIcon,
} from './ai-studio-icons';
import { AI_STUDIO_MODULES_SECTION } from './ai-studio.content';
import { AiStudioModuleIconElectric } from './AiStudioModuleIconElectric';

type ModuleTone = (typeof AI_STUDIO_MODULES_SECTION.items)[number]['tone'];

const moduleIcons: Record<string, ComponentType<StudioIconProps>> = {
  reels: ReelsIcon,
  posts: PostsIcon,
  images: ImagesIcon,
  videos: VideosIcon,
  banners: BannerIcon,
  blog: BlogIcon,
};

const toneStroke: Record<ModuleTone, string> = {
  blue: '#60a5fa',
  violet: '#a78bfa',
  green: '#34d399',
};

/** Viewfinder / HUD brackets on all four corners. */
function CardHudCorners({ color }: { color: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 200 280"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path d="M14 28 V14 H28" stroke={color} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <path
        d="M14 22 H18 M20 14 V18"
        stroke={color}
        strokeWidth="1"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M186 28 V14 H172"
        stroke={color}
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M14 252 V266 H28"
        stroke={color}
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M186 252 V266 H172"
        stroke={color}
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M186 258 H182 M180 266 V262"
        stroke={color}
        strokeWidth="1"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Octagon icon frame with side tick marks + traveling electric current. */
function ModuleIconFrame({
  tone,
  frameId,
  Icon,
}: {
  tone: ModuleTone;
  frameId: string;
  Icon: ComponentType<StudioIconProps>;
}) {
  const stroke = toneStroke[tone];
  const outerPath = 'M26 4 H50 L72 26 V50 L50 72 H26 L4 50 V26 Z';
  const innerPath = 'M28 10 H48 L66 28 V48 L48 66 H28 L10 48 V28 Z';

  return (
    <div className="studio-modules__icon-frame">
      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 76 76"
        fill="none"
        aria-hidden
      >
        <path d={outerPath} fill="white" stroke={stroke} strokeWidth="1.35" opacity="0.95" />
        <path
          d={innerPath}
          stroke={stroke}
          strokeWidth="0.7"
          strokeDasharray="2.5 2.5"
          opacity="0.35"
        />
        <path
          d="M1 34 H7 M1 38 H9 M1 42 H7"
          stroke={stroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path
          d="M75 34 H69 M75 38 H67 M75 42 H69"
          stroke={stroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path
          d="M34 1 V6 M38 1 V8 M42 1 V6"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M34 75 V70 M38 75 V68 M42 75 V70"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="26" cy="4" r="1.35" fill={stroke} />
        <circle cx="50" cy="4" r="1.35" fill={stroke} />
        <circle cx="26" cy="72" r="1.35" fill={stroke} />
        <circle cx="50" cy="72" r="1.35" fill={stroke} />

        <AiStudioModuleIconElectric
          frameId={frameId}
          stroke={stroke}
          outerPath={outerPath}
          innerPath={innerPath}
        />
      </svg>
      <span className={cn('studio-modules__icon', `studio-modules__icon--${tone}`)}>
        <Icon className="size-[1.65rem]" strokeWidth={1.85} />
      </span>
    </div>
  );
}

/**
 * Studio modules grid — ported from the bitcraftly-ai-studio landing page.
 */
export function AiStudioModules() {
  const section = AI_STUDIO_MODULES_SECTION;

  return (
    <section id="modules" aria-labelledby={section.headingId} className="studio-modules">
      <div
        className="studio-modules__glow studio-modules__glow--top motion-glow-pulse"
        aria-hidden
      />
      <div
        className="studio-modules__glow studio-modules__glow--bottom motion-glow-pulse"
        aria-hidden
      />

      <div className="studio-modules__rail">
        <div className="studio-modules__intro">
          <span className="studio-modules__badge">{section.badge}</span>
          <h2 id={section.headingId} className="studio-modules__title">
            {section.title}
          </h2>
          <p className="studio-modules__support">{section.support}</p>
        </div>

        <ul className="studio-modules__grid">
          {section.items.map((module, index) => {
            const Icon = moduleIcons[module.id] ?? ReelsIcon;

            return (
              <li key={module.id} className="min-w-0">
                <div
                  className={cn(
                    'studio-modules__card',
                    `studio-modules__card--${module.tone}`,
                    module.live && 'studio-modules__card--live',
                  )}
                >
                  <CardHudCorners color={toneStroke[module.tone]} />

                  <span className="studio-modules__ticks" aria-hidden>
                    <span style={{ backgroundColor: toneStroke[module.tone], opacity: 0.55 }} />
                    <span style={{ backgroundColor: toneStroke[module.tone], opacity: 0.8 }} />
                    <span style={{ backgroundColor: toneStroke[module.tone], opacity: 0.55 }} />
                  </span>

                  <span className="studio-modules__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="studio-modules__body">
                    <ModuleIconFrame tone={module.tone} frameId={`m${index}`} Icon={Icon} />
                    <h3 className="studio-modules__card-title">{module.label}</h3>
                    <p className="studio-modules__card-text">{module.description}</p>
                  </div>

                  <span
                    className={cn(
                      'studio-modules__cta',
                      module.live &&
                        `studio-modules__cta--live studio-modules__cta--${module.tone}`,
                    )}
                  >
                    {module.live ? section.ctaLaunch : section.ctaComingSoon}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
