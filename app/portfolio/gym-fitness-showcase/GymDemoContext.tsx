"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import type { GymCenter, MembershipPass, WorkoutFormat } from "./gym-demo-data";

type Toast = { id: number; message: string };

type GymDemoContextValue = {
  city: string;
  setCity: (city: string) => void;
  trialOpen: boolean;
  setTrialOpen: (open: boolean) => void;
  passModal: MembershipPass | null;
  setPassModal: (pass: MembershipPass | null) => void;
  classModal: WorkoutFormat | null;
  setClassModal: (format: WorkoutFormat | null) => void;
  centerModal: GymCenter | null;
  setCenterModal: (center: GymCenter | null) => void;
  reelOpen: boolean;
  setReelOpen: (open: boolean) => void;
  toast: Toast | null;
  showToast: (message: string) => void;
  scrollToSection: (id: string) => void;
};

const GymDemoContext = createContext<GymDemoContextValue | null>(null);

export function useGymDemo() {
  const ctx = useContext(GymDemoContext);
  if (!ctx) throw new Error("useGymDemo must be used within GymDemoProvider");
  return ctx;
}

export function GymDemoProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState("Delhi");
  const [trialOpen, setTrialOpen] = useState(false);
  const [passModal, setPassModal] = useState<MembershipPass | null>(null);
  const [classModal, setClassModal] = useState<WorkoutFormat | null>(null);
  const [centerModal, setCenterModal] = useState<GymCenter | null>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 2800);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({
      city,
      setCity,
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
      toast,
      showToast,
      scrollToSection,
    }),
    [city, trialOpen, passModal, classModal, centerModal, reelOpen, toast, showToast, scrollToSection],
  );

  return <GymDemoContext.Provider value={value}>{children}</GymDemoContext.Provider>;
}
