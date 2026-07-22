"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { FounderMessageContent } from "./cost-calculator.types";

const FounderAudioPlayer = dynamic(
  () =>
    import("./FounderAudioPlayer").then((module) => module.FounderAudioPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="founder-audio-skeleton" aria-hidden="true">
        Loading founder message…
      </div>
    ),
  },
);

interface FounderMessageExperienceProps {
  content: FounderMessageContent;
}

export function FounderMessageExperience({
  content,
}: FounderMessageExperienceProps) {
  const [visible, setVisible] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = slotRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={slotRef} className="cost-calculator-founder-slot">
      {visible ? (
        <FounderAudioPlayer content={content} active />
      ) : (
        <div className="founder-audio-skeleton" aria-hidden="true">
          Founder message
        </div>
      )}
    </div>
  );
}
