# Clinic & Healthcare — shared AI primitives

Reusable shell, catalog, motion helpers and types for every AI demo module.

## Public surface

- `data/catalog.ts` — module registry + feature-flag filtering
- `components/AiDemoShell.tsx` — demo page chrome
- `components/AiProcessing.tsx` — busy / analysing strip
- `components/AiMotionCard.tsx` — scroll / hover motion
- `hooks/useFakeAiDelay.ts` — deterministic demo latency
- `requireAiModule.ts` — page guard helper
- `types/` — shared domain types

Toggle modules from `src/config/features.ts`.
