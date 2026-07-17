import type { AdminAuthContext } from "./admin.types";

export const ADMIN_META = {
  productName: "Bitcraftly Admin",
  version: "0.1.0-architecture",
  environmentLabel: "UI preview — no backend",
} as const;

/** Placeholder auth context until FastAPI JWT is connected. */
export const ADMIN_AUTH_PREVIEW: AdminAuthContext = {
  authenticated: true,
  mode: "ui-preview",
  role: "admin",
};

/**
 * Architecture layers (no backend yet):
 * 1. Routes — `src/app/(admin)/admin/**`
 * 2. Feature UI — `src/features/admin/**`
 * 3. Future data — replace `admin.mock-data.ts` with services hitting FastAPI
 * 4. Future auth — gate `(admin)/layout.tsx` with session/JWT
 * 5. Future mutations — server actions / API routes per resource
 */
export const ADMIN_ARCHITECTURE_NOTES = [
  "Route group (admin) is isolated from marketing chrome.",
  "Feature module owns nav, types, mock data, and page compositions.",
  "Mock repositories mirror future CMS/CRM resource endpoints.",
  "Auth, CRUD, and media uploads are intentionally deferred.",
] as const;
