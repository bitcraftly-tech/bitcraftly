"use client";

import { Play, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useGymDemo } from "./GymDemoContext";
import { APP_DEMO_REEL } from "./gym-demo-data";
import { GymLazyImage } from "./GymLazyImage";

function ModalShell({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close" />
      <div
        className={`gym-bg-card relative max-h-[90vh] w-full overflow-y-auto rounded-2xl border gym-border p-6 shadow-xl ${wide ? "max-w-3xl" : "max-w-md"}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 hover:bg-[var(--gym-surface)]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="pr-8 text-xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
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

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <ModalShell title="FitRally app · demo reel" onClose={onClose} wide>
      <div className="relative overflow-hidden rounded-xl bg-black">
        <video
          key="fitrally-demo-reel"
          ref={videoRef}
          src={APP_DEMO_REEL.src}
          poster={APP_DEMO_REEL.poster}
          controls
          playsInline
          autoPlay
          preload="auto"
          className="aspect-video w-full object-cover"
          onCanPlay={() => {
            const video = videoRef.current;
            if (video && video.paused) void startPlayback();
          }}
        />
        {needsTap ? (
          <button
            type="button"
            onClick={() => void startPlayback()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white"
            aria-label="Play demo reel"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gym-brand)] shadow-lg">
              <Play className="h-8 w-8 fill-white pl-1" aria-hidden />
            </span>
            <span className="text-sm font-semibold">Tap to play</span>
          </button>
        ) : null}
      </div>
      <p className="gym-text-muted mt-3 text-sm">
        Showcase preview · swap with your app walkthrough or motion reel on production.
      </p>
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

  const [trialName, setTrialName] = useState("");
  const [trialPhone, setTrialPhone] = useState("");

  return (
    <>
      <GymDemoReelModal open={reelOpen} onClose={() => setReelOpen(false)} />

      {trialOpen ? (
        <ModalShell title="Start your free trial" onClose={() => setTrialOpen(false)}>
          <p className="gym-text-muted text-sm">7-day rallypass trial · demo only · no payment charged.</p>
          <label className="mt-4 block text-sm font-medium">
            Name
            <input
              value={trialName}
              onChange={(e) => setTrialName(e.target.value)}
              className="gym-border mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Your name"
            />
          </label>
          <label className="mt-3 block text-sm font-medium">
            Phone
            <input
              value={trialPhone}
              onChange={(e) => setTrialPhone(e.target.value)}
              className="gym-border mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="10-digit mobile"
            />
          </label>
          <button
            type="button"
            className="gym-btn-primary mt-5 w-full rounded-full py-2.5 text-sm"
            onClick={() => {
              setTrialOpen(false);
              showToast(`Trial activated in ${city} · welcome to FitRally`);
              setTrialName("");
              setTrialPhone("");
            }}
          >
            Claim free trial
          </button>
        </ModalShell>
      ) : null}

      {passModal ? (
        <ModalShell title={passModal.name} onClose={() => setPassModal(null)}>
          <p className="text-3xl font-bold">
            {passModal.price}
            <span className="gym-text-muted text-base font-normal">{passModal.period}</span>
          </p>
          <p className="mt-2 text-sm font-medium gym-brand-text">{passModal.highlight}</p>
          <ul className="gym-text-muted mt-4 space-y-2 text-sm">
            {passModal.perks.map((p) => (
              <li key={p}>✓ {p}</li>
            ))}
          </ul>
          <button
            type="button"
            className="gym-btn-primary mt-6 w-full rounded-full py-2.5 text-sm"
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
        <ModalShell title={`Book ${classModal.name}`} onClose={() => setClassModal(null)}>
          <GymLazyImage
            src={classModal.image}
            alt={classModal.name}
            wrapperClassName="aspect-video w-full rounded-xl"
            fallbackSeed={classModal.id}
            eager
          />
          <p className="gym-text-muted mt-3 text-sm">{classModal.tagline}</p>
          <p className="mt-2 text-sm">
            {classModal.duration} · {classModal.calories}
          </p>
          <button
            type="button"
            className="gym-btn-primary mt-5 w-full rounded-full py-2.5 text-sm"
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
        <ModalShell title={centerModal.name} onClose={() => setCenterModal(null)}>
          <GymLazyImage
            src={centerModal.image}
            alt={centerModal.name}
            wrapperClassName="aspect-video w-full rounded-xl"
            fallbackSeed={centerModal.id}
            eager
          />
          <p className="gym-text-muted mt-3 text-sm">
            {centerModal.area}, {centerModal.city} · {centerModal.distance}
          </p>
          <button
            type="button"
            className="gym-btn-primary mt-5 w-full rounded-full py-2.5 text-sm"
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
