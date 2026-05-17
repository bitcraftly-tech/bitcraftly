"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import type { QuickLink, UsefulLinkAction } from "./school-demo-data";
import { SCHOOL_WHATSAPP_URL } from "./school-demo-data";

type Toast = { id: number; message: string };

export type SchoolFormType = "admission" | "preschool" | "career" | "alumni";
export type SchoolModalType = "principal" | "history" | "sports" | "circular";

export type LightboxItem = { src: string; title: string; alt?: string };

type SchoolDemoContextValue = {
  admissionOpen: boolean;
  setAdmissionOpen: (open: boolean) => void;
  videoOpen: boolean;
  setVideoOpen: (open: boolean) => void;
  formType: SchoolFormType | null;
  setFormType: (type: SchoolFormType | null) => void;
  modalType: SchoolModalType | null;
  setModalType: (type: SchoolModalType | null) => void;
  galleryIndex: number | null;
  setGalleryIndex: (index: number | null) => void;
  lightbox: LightboxItem | null;
  setLightbox: (item: LightboxItem | null) => void;
  visitorCount: number;
  toast: Toast | null;
  showToast: (message: string) => void;
  scrollToSection: (id: string) => void;
  scrollToEnquiry: () => void;
  scrollToTop: () => void;
  openWhatsApp: () => void;
  bookCampusVisit: () => void;
  handleQuickLink: (link: QuickLink) => void;
  handleUsefulLink: (action: UsefulLinkAction) => void;
};

const SchoolDemoContext = createContext<SchoolDemoContextValue | null>(null);

export function useSchoolDemo() {
  const ctx = useContext(SchoolDemoContext);
  if (!ctx) throw new Error("useSchoolDemo must be used within SchoolDemoProvider");
  return ctx;
}

export function SchoolDemoProvider({ children }: { children: ReactNode }) {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [formType, setFormType] = useState<SchoolFormType | null>(null);
  const [modalType, setModalType] = useState<SchoolModalType | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [visitorCount] = useState(7_810_876);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 3200);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToEnquiry = useCallback(() => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openWhatsApp = useCallback(() => {
    window.open(SCHOOL_WHATSAPP_URL, "_blank", "noopener,noreferrer");
  }, []);

  const bookCampusVisit = useCallback(() => {
    scrollToEnquiry();
    showToast("Campus visit request noted · admissions will confirm your slot");
  }, [scrollToEnquiry, showToast]);

  const handleUsefulLink = useCallback(
    (action: UsefulLinkAction) => {
      switch (action.type) {
        case "scroll":
          scrollToSection(action.sectionId);
          break;
        case "modal":
          setModalType(action.modal);
          break;
        case "form":
          setFormType(action.form);
          break;
        case "toast":
          showToast(action.message);
          break;
        case "enquiry":
          scrollToEnquiry();
          break;
      }
    },
    [scrollToSection, scrollToEnquiry, showToast],
  );

  const handleQuickLink = useCallback(
    (link: QuickLink) => {
      if (link.action === "toast" && link.toast) {
        showToast(link.toast);
        return;
      }
      if (link.action === "form" && link.form) {
        setFormType(link.form);
        return;
      }
      if (link.action === "modal" && link.modal) {
        setModalType(link.modal);
        return;
      }
      if (link.action === "scroll" && link.sectionId) {
        scrollToSection(link.sectionId);
        return;
      }
      if (link.action === "enquiry") {
        scrollToEnquiry();
      }
    },
    [showToast, scrollToSection, scrollToEnquiry],
  );

  const value = useMemo(
    () => ({
      admissionOpen,
      setAdmissionOpen,
      videoOpen,
      setVideoOpen,
      formType,
      setFormType,
      modalType,
      setModalType,
      galleryIndex,
      setGalleryIndex,
      lightbox,
      setLightbox,
      visitorCount,
      toast,
      showToast,
      scrollToSection,
      scrollToEnquiry,
      scrollToTop,
      openWhatsApp,
      bookCampusVisit,
      handleQuickLink,
      handleUsefulLink,
    }),
    [
      admissionOpen,
      videoOpen,
      formType,
      modalType,
      galleryIndex,
      lightbox,
      visitorCount,
      toast,
      showToast,
      scrollToSection,
      scrollToEnquiry,
      scrollToTop,
      openWhatsApp,
      bookCampusVisit,
      handleQuickLink,
      handleUsefulLink,
    ],
  );

  return <SchoolDemoContext.Provider value={value}>{children}</SchoolDemoContext.Provider>;
}
