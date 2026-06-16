"use client";

import { ChevronDown } from "lucide-react";
import { Poppins } from "next/font/google";
import { useState } from "react";

import { RPYTECH_CONTAINER, RPYTECH_HIGHLIGHT_NAV, RPYTECH_NAV, RPYTECH_TOP_LINKS } from "@/lib/rpytechShowcaseData";

import RpytechBrandLockup from "./RpytechBrandLockup";
import { RPYTECH_SOCIAL_ICONS } from "./RpytechSocialIcons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function RpytechNavbar() {
  const [activeId, setActiveId] = useState("top");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const go = (id: string, parentId?: string) => {
    const target = id === "student-zone" && parentId === "student-zone" ? "verification" : id;
    setActiveId(parentId ?? id);
    scrollTo(target);
    setOpenDropdown(null);
  };

  return (
    <header id="top" className={`${poppins.className} sticky top-0 z-50`}>
      <div className="rpytech-top-bar">
        <div className={`${RPYTECH_CONTAINER} rpytech-bar-row`}>
          <span className="rpytech-bar-row-start">Welcome to RPY Technical & Training Services Pvt. Ltd.</span>
          <div className="rpytech-bar-row-end flex flex-wrap items-center gap-1">
            <span className="rpytech-top-highlights" aria-label="Quick links">
              {RPYTECH_HIGHLIGHT_NAV.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  title={item.label}
                  onClick={() => go(item.id)}
                  className={`rpytech-top-chip rpytech-top-chip--${item.tone}`}
                >
                  {item.shortLabel}
                </button>
              ))}
            </span>
            {RPYTECH_TOP_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => (item.label === "Contact Us" ? go("contact") : item.label === "Verify Certificate" ? go("verification") : undefined)}
                className="rpytech-top-link"
              >
                {item.label}
              </button>
            ))}
            <span className="rpytech-top-social">
              {RPYTECH_SOCIAL_ICONS.map((Icon, i) => (
                <span key={i} className="rpytech-top-social-icon" aria-hidden>
                  <Icon />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <nav className="rpytech-main-nav">
        <div className={`${RPYTECH_CONTAINER} rpytech-nav-row`}>
          <button type="button" onClick={() => go("top")} className="rpytech-nav-row-start text-left">
            <RpytechBrandLockup />
          </button>

          <ul className="rpytech-nav-links">
            {RPYTECH_NAV.map((item) => {
              const isOpen = openDropdown === item.id;

              return (
                <li
                  key={item.id}
                  className={item.children ? `rpytech-nav-drop${isOpen ? " rpytech-nav-drop--open" : ""}` : undefined}
                  onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                  onMouseLeave={() => item.children && setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className={activeId === item.id || isOpen ? "active" : undefined}
                    aria-expanded={item.children ? isOpen : undefined}
                    aria-haspopup={item.children ? "menu" : undefined}
                  >
                    {item.label}
                    {item.children ? <ChevronDown className="rpytech-nav-chevron" aria-hidden /> : null}
                  </button>

                  {item.children && isOpen ? (
                    <div className="rpytech-nav-dropdown-wrap">
                      <ul className="rpytech-nav-dropdown" role="menu">
                        {item.children.map((child) => (
                          <li key={`${item.id}-${child.label}`} role="none">
                            <button type="button" role="menuitem" onClick={() => go(child.id, item.id)}>
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
            <li>
              <button type="button" onClick={() => go("contact")} className="rpytech-nav-cta">
                APPLY NOW
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
