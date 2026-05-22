"use client";

import BitcraftlyLoaderAura from "@/components/loading/BitcraftlyLoaderAura";
import BitcraftlyLoaderClassic from "@/components/loading/BitcraftlyLoaderClassic";
import type { BitcraftlyLoaderProps } from "@/components/loading/loaderTypes";
import { LOADER_DESIGN } from "@/lib/loader/config";

export type { BitcraftlyLoaderVariant, LoaderDensity, LoaderTheme } from "@/components/loading/loaderTypes";

export default function BitcraftlyLoader(props: BitcraftlyLoaderProps) {
  const Design = LOADER_DESIGN === "aura" ? BitcraftlyLoaderAura : BitcraftlyLoaderClassic;
  return <Design {...props} />;
}
