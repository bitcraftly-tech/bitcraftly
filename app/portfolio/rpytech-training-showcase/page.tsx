import type { Metadata } from "next";
import Rpy2Page from "../../interactive-demos/portfolio/rpytech-training-showcase/Rpy2Page";

export const metadata: Metadata = {
  title: "RPY Technical & Training Services | Portfolio Showcase | Bitcraftly",
  description:
    "Vocational training institute website demo — courses, verification, placement & franchise sections inspired by rpytech.in.",
};

export default function RpytechTrainingShowcasePage() {
  return <Rpy2Page />;
}
