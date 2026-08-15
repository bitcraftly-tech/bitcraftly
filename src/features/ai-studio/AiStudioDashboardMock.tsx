import type { ComponentType } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import {
  AnalyticsIcon,
  DashboardIcon,
  ImagesIcon,
  PostsIcon,
  ReelsIcon,
  SettingsIcon,
  type StudioIconProps,
  VideosIcon,
} from './ai-studio-icons';
import { AI_STUDIO_HERO, AI_STUDIO_HERO_DASHBOARD } from './ai-studio.content';

const sidebarIcons: Record<string, ComponentType<StudioIconProps>> = {
  dashboard: DashboardIcon,
  reels: ReelsIcon,
  posts: PostsIcon,
  images: ImagesIcon,
  videos: VideosIcon,
  analytics: AnalyticsIcon,
  settings: SettingsIcon,
};

const QUEUE_WIDTH: Record<number, string> = {
  0: 'w-0',
  41: 'w-[41%]',
  43: 'w-[43%]',
  68: 'w-[68%]',
  72: 'w-[72%]',
};

/**
 * Full Studio dashboard preview — ported from bitcraftly-ai-studio HeroDashboard.
 */
export function AiStudioDashboardMock() {
  const data = AI_STUDIO_HERO_DASHBOARD;
  const { assets } = AI_STUDIO_HERO;

  return (
    <div className="studio-mock">
      <div className="studio-mock__glow" aria-hidden />
      <div className="studio-mock__panel" role="img" aria-label="Studio dashboard preview">
        <div className="studio-mock__frame">
          <aside className="studio-mock__side" aria-hidden>
            <div className="studio-mock__brand">
              <Image
                src={assets.logoMark}
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0 object-contain"
              />
              <span className="min-w-0 leading-none">
                <span className="studio-mock__brand-name">{data.brand}</span>
                <span className="studio-mock__brand-tag">{data.tagline}</span>
              </span>
            </div>

            <ul className="studio-mock__nav">
              {data.sidebar.map((item) => {
                const NavIcon = sidebarIcons[item.id] ?? DashboardIcon;

                return (
                  <li
                    key={item.id}
                    className={cn(
                      'studio-mock__nav-item',
                      item.active && 'studio-mock__nav-item--active',
                    )}
                  >
                    <NavIcon className="size-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{item.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="studio-mock__plan">
              <div className="studio-mock__plan-head">
                <p className="studio-mock__plan-label">{data.proPlan.label}</p>
              </div>
              <div className="studio-mock__plan-body">
                <p className="studio-mock__plan-percent">{data.proPlan.usagePercent}</p>
                <p className="studio-mock__plan-usage">{data.proPlan.usageLabel}</p>
                <div className="studio-mock__bar">
                  <span
                    className={cn('studio-mock__bar-fill', QUEUE_WIDTH[data.proPlan.percent])}
                  />
                </div>
                <p className="studio-mock__plan-storage">{data.proPlan.storage}</p>
                <span className="studio-mock__plan-cta">{data.proPlan.cta}</span>
              </div>
            </div>
          </aside>

          <div className="studio-mock__body">
            <div className="studio-mock__head">
              <div>
                <p className="studio-mock__overview">{data.overview}</p>
                <p className="studio-mock__welcome">
                  {data.welcome} <span aria-hidden>👋</span>
                </p>
              </div>
              <span className="studio-mock__live">
                <span className="studio-mock__live-dot" />
                Live
              </span>
            </div>

            <ul className="studio-mock__stats">
              {data.stats.map((stat) => (
                <li key={stat.id} className="studio-mock__stat">
                  <span
                    className={cn('studio-mock__stat-dot', `studio-mock__stat-dot--${stat.tone}`)}
                    aria-hidden
                  >
                    ●
                  </span>
                  <p className="studio-mock__stat-label">{stat.label}</p>
                  <p className="studio-mock__stat-value">{stat.value}</p>
                  {'delta' in stat && stat.delta ? (
                    <p className="studio-mock__stat-delta">↑ {stat.delta.replace('+', '')}</p>
                  ) : null}
                  {'detail' in stat && stat.detail && !('progress' in stat && stat.progress) ? (
                    <p className="studio-mock__stat-detail">{stat.detail}</p>
                  ) : null}
                  {'progress' in stat && stat.progress ? (
                    <>
                      <div className="studio-mock__bar" style={{ marginTop: '0.5rem' }}>
                        <span className={cn('studio-mock__bar-fill', QUEUE_WIDTH[stat.progress])} />
                      </div>
                      {'detail' in stat && stat.detail ? (
                        <p className="studio-mock__stat-detail">{stat.detail}</p>
                      ) : null}
                    </>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="studio-mock__panels">
              <div className="studio-mock__card">
                <p className="studio-mock__card-title">Recent Activity</p>
                <ul className="studio-mock__activity">
                  {data.activity.map((item) => (
                    <li key={item.id} className="studio-mock__activity-row">
                      <span
                        className={cn(
                          'studio-mock__activity-dot',
                          `studio-mock__activity-dot--${item.status}`,
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="studio-mock__activity-title">{item.title}</span>
                        <span className="studio-mock__activity-meta">
                          <span className="truncate">{item.meta}</span>
                          <span className="shrink-0">{item.time}</span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="studio-mock__footer-link">{data.activityFooter}</p>
              </div>

              <div className="studio-mock__card">
                <p className="studio-mock__card-title">Generation Queue</p>
                <div className="studio-mock__queue">
                  {data.queue.map((job) => (
                    <div key={job.id}>
                      <div className="studio-mock__queue-row">
                        <span className="studio-mock__queue-title">{job.title}</span>
                        <span
                          className={cn(
                            'studio-mock__queue-status',
                            job.state === 'running' && 'studio-mock__queue-status--running',
                          )}
                        >
                          {job.stateLabel}
                        </span>
                      </div>
                      <div className="studio-mock__queue-track">
                        <div className="studio-mock__queue-bar">
                          <div
                            className={cn(
                              'studio-mock__queue-fill',
                              QUEUE_WIDTH[job.progress],
                              job.state === 'running' && 'studio-mock__queue-fill--running',
                            )}
                          />
                        </div>
                        <span className="studio-mock__queue-pct">{job.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="studio-mock__footer-link">{data.queueFooter}</p>
              </div>
            </div>

            <div className="studio-mock__banner">
              <div className="studio-mock__banner-art" aria-hidden>
                <Image
                  src={assets.dashboardStrip}
                  alt=""
                  fill
                  sizes="180px"
                  className={cn(
                    'object-cover object-right opacity-90',
                    '[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.35)_28%,black_58%)]',
                    '[-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.35)_28%,black_58%)]',
                  )}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(215,231,248,0.45)_0%,rgba(243,248,253,0.2)_55%,rgba(255,255,255,0.12)_100%)]" />
              </div>
              <div className="studio-mock__banner-copy">
                <p className="studio-mock__banner-title">{data.bannerTitle}</p>
                <p className="studio-mock__banner-sub">{data.bannerSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
