# Portfolio showcases (monorepo packages)

Each interactive portfolio demo is an **isolated workspace package** under `showcases/`.

Changing one showcase must not require edits in another showcase package.

## Layout

```text
showcases/
  shared/                 @bitcraftly/showcase-shared
  dayal-builders/         @bitcraftly/showcase-dayal-builders
  clinic-healthcare/      @bitcraftly/showcase-clinic-healthcare
  claycraft-crockery/     ...
  gym-fitness/
  school-website/
  ecommerce-store/
  restaurant-website/
  restaurant-ai-chatbot/
  society-management/
  builder-real-estate/
  local-services-leads/
  toy-store/
  rpytech-training/
  react-video-demo/
```

## Platform wiring

Next.js App Router keeps **thin re-export routes** only:

```text
src/app/portfolio/<route>/page.tsx  →  export from @bitcraftly/showcase-...
```

Public assets stay in `public/` (shared static hosting). Platform chrome (`@/`) may be imported by packages when needed (providers, shared libs).

## Working on one showcase

1. Edit only `showcases/<id>/src/**`
2. Do not edit another showcase package unless intentionally sharing via `@bitcraftly/showcase-shared`
3. Run `npm run dev` from repo root
4. Open `/portfolio/<route>`

## Adding a new showcase

1. Create `showcases/<id>/package.json` named `@bitcraftly/showcase-<id>`
2. Put all UI/data/CSS under `showcases/<id>/src`
3. Add path aliases in `tsconfig.json` + entry in `next.config.ts` `transpilePackages`
4. Add thin re-exports under `src/app/portfolio/<route>/`
