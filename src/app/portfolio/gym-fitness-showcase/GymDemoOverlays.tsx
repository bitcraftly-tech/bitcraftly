'use client';

import { Play, X, Zap } from 'lucide-react';
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { useGymDemo } from './GymDemoContext';
import { APP_DEMO_REEL } from './gym-demo-data';
import { GymLazyImage } from './GymLazyImage';

function ModalShell({
  title,
  onClose,
  children,
  wide,
  subtitle,
  eyebrow,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
  subtitle?: string;
  eyebrow?: string;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="gym-modal" role="presentation">
      <button type="button" className="gym-modal__backdrop" onClick={onClose} aria-label="Close dialog" />
      <div
        ref={panelRef}
        className={`gym-modal__panel${wide ? ' gym-modal__panel--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button type="button" onClick={onClose} className="gym-modal__close" aria-label="Close">
          <X className="gym-modal__close-icon" aria-hidden />
        </button>
        <header className="gym-modal__head">
          {eyebrow ? <p className="gym-modal__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId} className="gym-modal__title">
            {title}
          </h2>
          {subtitle ? <p className="gym-modal__subtitle">{subtitle}</p> : null}
        </header>
        <div className="gym-modal__body">{children}</div>
      </div>
    </div>
  );
}

function GymDemoReelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setNeedsTap(false);
    video.currentTime = 0;

    try {
      video.muted = false;
      await video.play();
      return;
    } catch {
      /* fall through — try muted autoplay */
    }

    try {
      video.muted = true;
      await video.play();
    } catch {
      setNeedsTap(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = false;
      }
      setNeedsTap(false);
      return;
    }
    void startPlayback();
  }, [open, startPlayback]);

  if (!open) return null;

  return (
    <ModalShell
      title="FitRally app · demo reel"
      eyebrow="Mobile"
      subtitle="Showcase preview · swap with your app walkthrough on production."
      onClose={onClose}
      wide
    >
      <div className="gym-modal__media">
        <video
          key="fitrally-demo-reel"
          ref={videoRef}
          src={APP_DEMO_REEL.src}
          poster={APP_DEMO_REEL.poster}
          controls
          playsInline
          autoPlay
          preload="auto"
          className="gym-modal__video"
          onCanPlay={() => {
            const video = videoRef.current;
            if (video && video.paused) void startPlayback();
          }}
        />
        {needsTap ? (
          <button
            type="button"
            onClick={() => void startPlayback()}
            className="gym-modal__play-overlay"
            aria-label="Play demo reel"
          >
            <span className="gym-modal__play-btn">
              <Play className="gym-modal__play-icon" aria-hidden />
            </span>
            <span className="gym-modal__play-label">Tap to play</span>
          </button>
        ) : null}
      </div>
    </ModalShell>
  );
}

export function GymDemoOverlays() {
  const {
    trialOpen,
    setTrialOpen,
    passModal,
    setPassModal,
    classModal,
    setClassModal,
    centerModal,
    setCenterModal,
    reelOpen,
    setReelOpen,
    showToast,
    city,
  } = useGymDemo();

  const [trialName, setTrialName] = useState('');
  const [trialPhone, setTrialPhone] = useState('');

  return (
    <>
      <GymDemoReelModal open={reelOpen} onClose={() => setReelOpen(false)} />

      {trialOpen ? (
        <ModalShell
          title="Start your free trial"
          eyebrow="Rallypass"
          subtitle="7-day trial · demo only · no payment charged"
          onClose={() => setTrialOpen(false)}
        >
          <div className="gym-trial">
            <div className="gym-trial__badge" aria-hidden>
              <Zap className="gym-trial__badge-icon" />
              <span>7 days free in {city}</span>
            </div>

            <div className="gym-trial__fields">
              <div className="gym-field-group">
                <label className="gym-label" htmlFor="gym-trial-name">
                  Name
                </label>
                <input
                  id="gym-trial-name"
                  value={trialName}
                  onChange={(e) => setTrialName(e.target.value)}
                  className="gym-field"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div className="gym-field-group">
                <label className="gym-label" htmlFor="gym-trial-phone">
                  Phone
                </label>
                <input
                  id="gym-trial-phone"
                  value={trialPhone}
                  onChange={(e) => setTrialPhone(e.target.value)}
                  className="gym-field"
                  placeholder="10-digit mobile"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
            </div>

            <button
              type="button"
              className="gym-btn-primary gym-trial__cta"
              onClick={() => {
                setTrialOpen(false);
                showToast(`Trial activated in ${city} · welcome to FitRally`);
                setTrialName('');
                setTrialPhone('');
              }}
            >
              Claim free trial
            </button>
            <p className="gym-trial__note">Demo form · OTP & billing wire up on production builds.</p>
          </div>
        </ModalShell>
      ) : null}

      {passModal ? (
        <ModalShell
          title={passModal.name}
          eyebrow="Membership"
          subtitle={passModal.highlight}
          onClose={() => setPassModal(null)}
        >
          <p className="gym-modal__price">
            {passModal.price}
            <span className="gym-modal__period">{passModal.period}</span>
          </p>
          <ul className="gym-modal__perks">
            {passModal.perks.map((p) => (
              <li key={p} className="gym-modal__perk">
                <span className="gym-modal__check" aria-hidden>
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="gym-btn-primary gym-trial__cta"
            onClick={() => {
              setPassModal(null);
              showToast(`${passModal.name} added to cart · demo checkout`);
            }}
          >
            Buy now · demo
          </button>
        </ModalShell>
      ) : null}

      {classModal ? (
        <ModalShell
          title={`Book ${classModal.name}`}
          eyebrow="Group class"
          subtitle={`${classModal.duration} · ${classModal.calories}`}
          onClose={() => setClassModal(null)}
        >
          <GymLazyImage
            src={classModal.image}
            alt={classModal.name}
            wrapperClassName="gym-modal__shot"
            fallbackSeed={classModal.id}
            eager
          />
          <p className="gym-modal__copy">{classModal.tagline}</p>
          <button
            type="button"
            className="gym-btn-primary gym-trial__cta"
            onClick={() => {
              setClassModal(null);
              showToast(`${classModal.name} class booked · today 7:00 PM · ${city}`);
            }}
          >
            Confirm booking
          </button>
        </ModalShell>
      ) : null}

      {centerModal ? (
        <ModalShell
          title={centerModal.name}
          eyebrow="Center tour"
          subtitle={`${centerModal.area}, ${centerModal.city} · ${centerModal.distance}`}
          onClose={() => setCenterModal(null)}
        >
          <GymLazyImage
            src={centerModal.image}
            alt={centerModal.name}
            wrapperClassName="gym-modal__shot"
            fallbackSeed={centerModal.id}
            eager
          />
          <button
            type="button"
            className="gym-btn-primary gym-trial__cta"
            onClick={() => {
              setCenterModal(null);
              showToast(`Visit booked at ${centerModal.name}`);
            }}
          >
            Book free tour
          </button>
        </ModalShell>
      ) : null}
    </>
  );
}
