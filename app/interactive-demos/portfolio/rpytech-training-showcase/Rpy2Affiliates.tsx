"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AFFILIATES = [
  {
    abbr: "MCA",
    name: "Ministry of Corporate Affairs",
    sub: "Government of India",
    desc: "Approved under CIN: U74999BR2018PTC038904",
    color: "#1e3a7a",
    bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    accent: "#1d4ed8",
  },
  {
    abbr: "ISO\n9001",
    name: "ISO 9001:2015",
    sub: "Quality Management System",
    desc: "Internationally certified quality management standards",
    color: "#0369a1",
    bg: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 100%)",
    accent: "#0284c7",
  },
  {
    abbr: "ISO\n45001",
    name: "ISO 45001:2018",
    sub: "Occupational Health & Safety",
    desc: "Certified occupational health and safety management",
    color: "#b45309",
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    accent: "#d97706",
  },
  {
    abbr: "MSME",
    name: "Ministry of MSME",
    sub: "Government of India",
    desc: "Registered under UDYAM-BR-13-0011251",
    color: "#6d28d9",
    bg: "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)",
    accent: "#7c3aed",
  },
  {
    abbr: "GOI",
    name: "Government of India",
    sub: "भारत सरकार",
    desc: "Fully recognised and approved by the Government of India",
    color: "#15803d",
    bg: "linear-gradient(135deg, #dcfce7 0%, #86efac 100%)",
    accent: "#16a34a",
  },
  {
    abbr: "NABL",
    name: "National Accreditation Board",
    sub: "Testing & Calibration Laboratories",
    desc: "Accredited for testing and calibration excellence",
    color: "#be185d",
    bg: "linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)",
    accent: "#db2777",
  },
  {
    abbr: "NDT",
    name: "Non-Destructive Testing",
    sub: "Certified Institute",
    desc: "Expert NDT services — UT, MT, PT, UTG, HT and more",
    color: "#0f766e",
    bg: "linear-gradient(135deg, #ccfbf1 0%, #5eead4 100%)",
    accent: "#0d9488",
  },
];

const VISIBLE = 3;

export default function Rpy2Affiliates() {
  const [center, setCenter] = useState(0);
  const [animDir, setAnimDir] = useState<"left"|"right">("right");
  const [animating, setAnimating] = useState(false);
  const total = AFFILIATES.length;

  const go = useCallback((dir: "left"|"right") => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCenter(c => dir === "right" ? (c + 1) % total : (c - 1 + total) % total);
      setAnimating(false);
    }, 320);
  }, [animating, total]);

  // indices: prev, center, next
  const idxL = (center - 1 + total) % total;
  const idxR = (center + 1) % total;
  const cards = [idxL, center, idxR];

  return (
    <section className="rpyv2-affiliates" aria-label="Our affiliates">
      <div className="rpyv2-container">

        {/* Header */}
        <div className="rpyv2-aff-header">
          <div className="rpyv2-aff-header-line" />
          <div className="rpyv2-aff-header-text">
            <p className="rpyv2-section-label" style={{ textAlign: "center" }}>Approved &amp; Recognised By</p>
            <h2 className="rpyv2-affiliates-title">Our Affiliates</h2>
          </div>
          <div className="rpyv2-aff-header-line" />
        </div>

        {/* Slider */}
        <div className="rpyv2-aff-slider">
          {/* Prev arrow */}
          <button className="rpyv2-aff-arrow rpyv2-aff-arrow--l" onClick={() => go("left")} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>

          {/* Cards */}
          <div className={`rpyv2-aff-cards${animating ? ` rpyv2-aff-cards--${animDir}` : ""}`}>
            {cards.map((idx, slot) => {
              const aff = AFFILIATES[idx];
              const isCtr = slot === 1;
              return (
                <div
                  key={`${idx}-${slot}`}
                  className={`rpyv2-aff-card${isCtr ? " rpyv2-aff-card--active" : " rpyv2-aff-card--side"}`}
                  style={{ "--aff-bg": aff.bg, "--aff-color": aff.color, "--aff-accent": aff.accent } as React.CSSProperties}
                  aria-hidden={!isCtr}
                >
                  {/* Logo blob */}
                  <div className="rpyv2-aff-logo" aria-hidden>
                    {aff.abbr}
                  </div>

                  <div className="rpyv2-aff-info">
                    <div className="rpyv2-aff-name">{aff.name}</div>
                    <div className="rpyv2-aff-sub">{aff.sub}</div>
                    {isCtr && <p className="rpyv2-aff-desc">{aff.desc}</p>}
                  </div>

                  {isCtr && (
                    <div className="rpyv2-aff-badge">
                      ✓ Verified
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button className="rpyv2-aff-arrow rpyv2-aff-arrow--r" onClick={() => go("right")} aria-label="Next">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="rpyv2-aff-dots" role="tablist">
          {AFFILIATES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === center}
              className={`rpyv2-aff-dot${i === center ? " rpyv2-aff-dot--active" : ""}`}
              onClick={() => { setAnimDir(i > center ? "right" : "left"); setCenter(i); }}
              aria-label={`Affiliate ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="rpyv2-aff-counter">{center + 1} of {total}</p>
      </div>
    </section>
  );
}
