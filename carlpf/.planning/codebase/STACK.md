# Technology Stack

**Analysis Date:** 2026-08-04

## Languages

**Primary:**
- TypeScript 5.9 — All application source (`app/`, `components/`, `lib/`), `jsx: react-jsx`, `strict: true` (`tsconfig.json`)
- CSS — Tailwind utility classes in TSX components (no standalone CSS modules found)

## Runtime

**Environment:**
- Node.js (Next.js runtime). The single API route (`app/api/visitors/route.ts`) declares `export const runtime = 'edge'` (Vercel Edge runtime).

**Package Manager:**
- npm (lockfiles: `package-lock.json` present)
- Scripts (`package.json`): `dev` = `next dev`, `build` = `next build`, `start` = `next start`, `lint` = `eslint`

## Frameworks

**Core:**
- Next.js 16.2.6 (App Router) — full-stack framework; client components served from `app/`, API routes under `app/api/`
- React 19.2.0 / React DOM 19.2.0

**3D / Motion (visually driven portfolio):**
- three 0.181.2 — WebGL 3D
- @react-three/fiber 9.6.1 — React renderer for Three.js
- @react-three/drei 10.7.7 — helpers for R3F
- @react-three/rapier 2.2.0 — physics engine for 3D scenes
- motion 12.40.0 — animations (imported as `motion/react`)
- gsap 3.15.0 — animation (declared; not directly imported in current source)

**Styling / UI component system:**
- Tailwind CSS 4.x (via `@tailwindcss/postcss` in `postcss.config.mjs`), tw-animate-css
- shadcn/ui config (`components.json`, style `new-york`, `rsc: true`, icon lib = lucide)
- lucide-react — icons
- react-bits (declared; registry used via `components.json` for fetching scaffolds)
- class-variance-authority, tailwind-merge, clsx — shadcn/cva utility chain; `cn()` in `lib/utils.ts`

**Data store:**
- @upstash/redis 1.38.0 — serverless Redis (visitor counter, only external dependency)

**Build/Dev:**
- TypeScript 5 (compiler)
- ESLint 9 + eslint-config-next (core-web-vitals + typescript) via `eslint.config.mjs`
- Next.js font optimization via `next/font/google` (`app/layout.tsx`)

## Key Dependencies

**Critical:**
- upstash/redis — powers the visitor counter API (`app/api/visitors/route.ts`); no DB/auth backend otherwise
- three + @react-three/fiber + drei — all 3D scene components (`app/components/ui/GlobeScene.tsx`, `SkillOrbit.tsx`, `SkillGlobe.tsx`, `LanyardScene.tsx`, `Lanyard.tsx`)

**Infrastructure:**
- npm-run scripts only; no test runner, no CI config detected in repo

## Configuration

**Environment:**
- No `.env` file committed (gitignored via `.env*`). Expected env vars:
  - `UPSTASH_REDIS_REST_URL` (`app/api/visitors/route.ts:8`)
  - `UPSTASH_REDIS_REST_TOKEN` (`app/api/visitors/route.ts:9`)

**Build:**
- `next.config.ts` — empty default config (no options set)
- `tsconfig.json` — path alias `@/* → ./*`
- `components.json` — shadcn aliases (components→`@/components`, utils→`@/lib/utils`, ui→`@/components/ui`)

## Platform Requirements

**Development:**
- Node.js; run `npm install && npm run dev` (port 3000)

**Production:**
- Vercel deployment declared in README (`Deploy on Vercel`); Vercel assets present in `public/` (`vercel.svg`) and `.vercel` in `.gitignore`

---

*Stack analysis: 2026-08-04*