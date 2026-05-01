"use client";

import { Toaster as SonnerToaster } from "sonner";
import "sonner/dist/styles.css";

export default function Toaster() {
  return <SonnerToaster position="top-right" richColors closeButton />;
}
