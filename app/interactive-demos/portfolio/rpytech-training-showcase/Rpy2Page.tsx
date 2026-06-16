"use client";

import { useEffect } from "react";
import "./rpy2-showcase.css";

import Rpy2Header from "./Rpy2Header";
import Rpy2Hero from "./Rpy2Hero";
import Rpy2Stats from "./Rpy2Stats";
import Rpy2Courses from "./Rpy2Courses";
import Rpy2About from "./Rpy2About";
import Rpy2SkillsPath from "./Rpy2SkillsPath";
import Rpy2Process from "./Rpy2Process";
import Rpy2ELearning from "./Rpy2ELearning";
import Rpy2HowItWorks from "./Rpy2HowItWorks";
import Rpy2Gallery from "./Rpy2Gallery";
import Rpy2Affiliates from "./Rpy2Affiliates";
import Rpy2Contact from "./Rpy2Contact";
import Rpy2Footer from "./Rpy2Footer";
import Rpy2FloatingActions from "./Rpy2FloatingActions";

/**
 * RPY Tech Training Showcase — completely isolated portfolio demo.
 * Route: /interactive-demos/portfolio/rpytech-training-showcase
 * No global styles or shared components modified.
 */
export default function Rpy2Page() {
  useEffect(() => {
    /* Ensure light mode — this showcase uses a fixed light theme */
    const html = document.documentElement;
    const prev = html.className;
    html.classList.remove("dark");
    return () => {
      html.className = prev;
    };
  }, []);

  return (
    <div className="rpyv2-root">
      <Rpy2FloatingActions />
      <Rpy2Header />
      <main id="main-content">
        <Rpy2Hero />
        <Rpy2Stats />
        <Rpy2SkillsPath />
        <Rpy2Courses />
        <Rpy2About />
        <Rpy2Process />
        <Rpy2ELearning />
        <Rpy2HowItWorks />
        <Rpy2Gallery />
        <Rpy2Affiliates />
        <Rpy2Contact />
      </main>
      <Rpy2Footer />
    </div>
  );
}
