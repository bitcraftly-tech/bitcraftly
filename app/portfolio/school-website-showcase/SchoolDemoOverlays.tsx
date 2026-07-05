"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useSchoolDemo, type SchoolFormType, type SchoolModalType } from "./SchoolDemoContext";
import { CIRCULARS, GALLERY, SCHOOL_DEMO_VIDEO_EMBED, SCHOOL_FULL_NAME, SCHOOL_SOCIETY } from "./school-demo-data";
import { SchoolLazyImage } from "./SchoolLazyImage";

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
        className={`school-bg-card relative max-h-[90vh] w-full overflow-y-auto rounded-xl border school-border p-6 shadow-xl ${wide ? "max-w-3xl" : "max-w-md"}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 hover:bg-[var(--school-surface)]"
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

const MODAL_COPY: Record<SchoolModalType, { title: string; body: React.ReactNode }> = {
  principal: {
    title: "Director / Principal message",
    body: (
      <p className="school-text-muted text-sm leading-relaxed">
        Dear parents and students — at {SCHOOL_FULL_NAME} we believe in roots with wings: value-based grounding and the confidence to excel
        globally. Our faculty, house system and modern labs work together for holistic growth. Welcome to our campus family.
      </p>
    ),
  },
  history: {
    title: "Our history",
    body: (
      <p className="school-text-muted text-sm leading-relaxed">
        {SCHOOL_SOCIETY} registered in 1965 laid the foundation. The school was established in 1973 and has since become a leading institution
        in East Delhi — CBSE affiliated, Delhi Govt. recognized, co-educational excellence.
      </p>
    ),
  },
  sports: {
    title: "Zonal sports achievements",
    body: (
      <ul className="school-text-muted space-y-2 text-sm">
        <li>· East Delhi zone athletics · Girls U-17 · 1st place 2025</li>
        <li>· CBSE cluster football · Boys U-19 · Semi-finalists</li>
        <li>· Inter-house cricket · Agni house champions</li>
      </ul>
    ),
  },
  circular: {
    title: "School circulars & downloads",
    body: (
      <ul className="space-y-3">
        {CIRCULARS.map((c) => (
          <li key={c.title} className="school-border rounded-lg border p-3">
            <p className="text-xs font-semibold school-brand-text">{c.date}</p>
            <p className="mt-1 text-sm font-medium">{c.title}</p>
          </li>
        ))}
      </ul>
    ),
  },
};

const FORM_TITLES: Record<SchoolFormType, string> = {
  admission: "Admission enquiry",
  preschool: "Pre-school registration",
  career: "Career enquiry",
  alumni: "Alumni form",
};

function DemoForm({ type, onClose }: { type: SchoolFormType; onClose: () => void }) {
  const { showToast } = useSchoolDemo();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name.trim() || !phone.trim()) {
      showToast("Please enter your name and phone number", "error");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      showToast("Please enter a valid 10-digit mobile number", "error");
      return;
    }
    onClose();
    showToast(`${FORM_TITLES[type]} submitted · we will contact you within 24 hours`, "success");
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <ModalShell title={FORM_TITLES[type]} onClose={onClose}>
      <p className="school-text-muted text-sm">Demo form · no data stored · production connects to your CRM.</p>
      <label className="mt-4 block text-sm font-medium">
        Full name *
        <input value={name} onChange={(e) => setName(e.target.value)} className="school-input mt-1 w-full" placeholder="Your name" />
      </label>
      <label className="mt-3 block text-sm font-medium">
        Phone *
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="school-input mt-1 w-full"
          placeholder="10-digit mobile"
          inputMode="tel"
        />
      </label>
      <label className="mt-3 block text-sm font-medium">
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="school-input mt-1 w-full"
          placeholder="email@example.com"
        />
      </label>
      <button type="button" className="school-btn-primary mt-5 w-full rounded-md py-2.5 text-sm font-bold uppercase" onClick={submit}>
        Submit
      </button>
    </ModalShell>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/60" onClick={onClose} aria-label="Close" />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-black shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-video w-full">
          <iframe
            title="Campus tour video"
            src={SCHOOL_DEMO_VIDEO_EMBED}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function GalleryModal({ index, onClose }: { index: number; onClose: () => void }) {
  const { setGalleryIndex } = useSchoolDemo();
  const item = GALLERY[index];
  const total = GALLERY.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setGalleryIndex((index - 1 + total) % total);
      if (e.key === "ArrowRight") setGalleryIndex((index + 1) % total);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, setGalleryIndex, onClose]);

  return (
    <ModalShell title={item.title} onClose={onClose} wide>
      <div className="relative">
        <SchoolLazyImage src={item.image} alt={item.title} wrapperClassName="aspect-video w-full rounded-lg" eager fallbackSeed={item.id} />
        <button
          type="button"
          onClick={() => setGalleryIndex((index - 1 + total) % total)}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setGalleryIndex((index + 1) % total)}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <p className="mt-3 text-center text-xs text-[var(--school-muted)]">
          {index + 1} / {total}
        </p>
      </div>
    </ModalShell>
  );
}

function LightboxModal({ item, onClose }: { item: { src: string; title: string; alt?: string }; onClose: () => void }) {
  return (
    <ModalShell title={item.title} onClose={onClose} wide>
      <SchoolLazyImage src={item.src} alt={item.alt ?? item.title} wrapperClassName="aspect-[4/3] w-full rounded-lg sm:aspect-video" eager />
    </ModalShell>
  );
}

export function SchoolDemoOverlays() {
  const { admissionOpen, setAdmissionOpen, videoOpen, setVideoOpen, formType, setFormType, modalType, setModalType, galleryIndex, setGalleryIndex, lightbox, setLightbox } =
    useSchoolDemo();

  return (
    <>
      {admissionOpen ? <DemoForm type="admission" onClose={() => setAdmissionOpen(false)} /> : null}
      {formType ? <DemoForm type={formType} onClose={() => setFormType(null)} /> : null}
      {modalType ? (
        <ModalShell title={MODAL_COPY[modalType].title} onClose={() => setModalType(null)}>
          {MODAL_COPY[modalType].body}
        </ModalShell>
      ) : null}
      {galleryIndex !== null ? <GalleryModal index={galleryIndex} onClose={() => setGalleryIndex(null)} /> : null}
      {lightbox ? <LightboxModal item={lightbox} onClose={() => setLightbox(null)} /> : null}
      {videoOpen ? <VideoModal onClose={() => setVideoOpen(false)} /> : null}
    </>
  );
}
