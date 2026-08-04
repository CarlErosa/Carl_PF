# Codebase Structure

**Analysis Date:** 2026-08-04

## Directory Layout

```
carlpf/                      # Next.js 16 App Router portfolio (npm)
├── app/                     # App Router source root
│   ├── layout.tsx           # Root layout: fonts, metadata, global cursor
│   ├── page.tsx             # Single page composing section order
│   ├── globals.css          # Tailwind 4 entry + custom keyframes
│   ├── icon.jpg             # PWA/app icon (served at /icon.jpg)
│   ├── api/
│   │   └── visitors/
│   │       └── route.ts     # Edge API: Redis visitor counter
│   ├── components/          # Section + feature components (client)
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Hackathons.tsx
│   │   ├── Projects.tsx
│   │   ├── Footer.tsx
│   │   ├── VisitorCounter.tsx
│   │   ├── CursorFollower.tsx
│   │   └── ui/              # 3D / animation primitives (client)
│   │       ├── GlobeScene.tsx       # used — dynamic import in Hero
│   │       ├── SkillOrbit.tsx       # unused
│   │       ├── SkillGlobe.tsx       # unused
│   │       ├── Lanyard.tsx          # unused (LanyardScene imports it)
│   │       ├── LanyardScene.tsx     # unused
│   │       ├── RotatingText.tsx     # unused
│   │       └── TextType.tsx         # unused
│   └── hooks/               # Shared effect hooks (client)
│       ├── useTypewriter.ts        # used in Hero
│       └── useScrollAnimation.tsx  # unused
├── components/
│   └── RotatingText.tsx     # orphan duplicate of app/components/ui/RotatingText.tsx (unused)
├── lib/
│   └── utils.ts             # cn() — clsx + tailwind-merge (shadcn)
├── public/
│   └── assets/
│       ├── icons/           # 15 tech skill SVGs (globe scenes)
│       └── lanyard/         # card.glb, textures, project/hackathon photos
├── .planning/               # GSD planning artifacts
│   └── codebase/            # mapped codebase documents (STACK.md, etc.)
├── components.json          # shadcn/ui config (new-york, rsc: true)
├── next.config.ts           # empty default config
├── tsconfig.json            # @/* → ./* alias, strict
├── eslint.config.mjs        # eslint-config-next (web-vitals + typescript)
├── postcss.config.mjs       # @tailwindcss/postcss
├── package.json / package-lock.json
```

## Directory Purposes

**`app/`** — Next.js App Router root. Contains the single page (`page.tsx`), single layout (`layout.tsx`), the API route (`api/`), and all client components (`components/`, `hooks/`). This is where all application source lives.

**`app/components/`** — Client section and feature components. Each section is one `<section id="...">` scroll target. `ui/` holds reusable 3D/animation primitives.

**`app/components/ui/`** — R3F and motion client primitives. Only `GlobeScene.tsx` is currently referenced (via `next/dynamic` in `Hero.tsx`); the others are dead code pending wiring into sections or deletion.

**`app/hooks/`** — Shared client effect hooks. `useTypewriter.ts` powers the Hero subtitle; `useScrollAnimation.tsx` is currently unused.

**`app/api/`** — Route handlers. Only `visitors/route.ts` (Edge) exists.

**`components/`** (repo root) — shadcn's configured component location (`components.json` aliases `components → @/components`). Currently contains a single orphan file, `RotatingText.tsx`, duplicated in `app/components/ui/`; no section imports from this directory. Prefer `app/components/` for new components unless deliberately adding a shadcn primitive here.

**`lib/`** — Shared framework-agnostic helpers. Only `cn()` (`lib/utils.ts`).

**`public/assets/`** — Static media served at `/assets/...`: `icons/` (15 skill SVGs) and `lanyard/` (photos, textures, `.glb` 3D models). Browsers load these directly; referenced by literal paths in components (e.g., `/assets/icons/react.svg`, `/assets/lanyard/picture.jpg`).

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout — fonts, metadata, global `<CursorFollower/>`
- `app/page.tsx`: Single-page composition (section order)
- `app/api/visitors/route.ts`: Edge API — the only backend endpoint

**Configuration:**
- `tsconfig.json`: TS strict, `paths: { "@/*": ["./*"] }`
- `next.config.ts`: Empty (defaults)
- `components.json`: shadcn aliases (components→`@/components`, utils→`@/lib/utils`, ui→`@/components/ui`)
- `eslint.config.mjs`: eslint-config-next (core-web-vitals + typescript), ignores `.next/`, `out/`, `build/`, `next-env.d.ts`
- `postcss.config.mjs`: Tailwind 4 via `@tailwindcss/postcss`

**Core Logic:**
- `app/components/Hero.tsx`: typewriter + dynamic 3D globe + visitor counter wiring
- `app/components/Header.tsx`: scroll-spy navigation and section IDs (`home`, `about`, `skills`, `hackathons`, `projects`)
- `app/components/Skills.tsx`, `Projects.tsx`, `Hackathons.tsx`: content-data colocation patterns
- `app/components/ui/GlobeScene.tsx`: R3F canvas scene

## Naming Conventions

**Files:**
- Component files: `PascalCase.tsx` — e.g., `Header.tsx`, `VisitorCounter.tsx`, `GlobeScene.tsx`
- Hook files: `camelCase` prefixed `use` — e.g., `useTypewriter.ts`, `useScrollAnimation.tsx`
- Route handler: `route.ts` for file-based convention handlers under `app/api/<name>/route.ts`
- Config files: `kebab-case.<ext>` — `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`

**Directories:**
- Lowercase singular feature dirs: `components/`, `components/ui/`, `hooks/`, `api/`, `lib/`, `public/assets/icons/`
- Section components live flat in `app/components/` (no per-section subdirectories)

**Internal styling & naming:**
- Every client component starts with `'use client';` directive
- Default export per component file; named export for hooks, and the `cn` helper
- Props typed inline with `interface`/`type` declared above the component (e.g., `SkillItem`/`SkillCategory` in `Skills.tsx:7-15`, `ProjectStack` in `Projects.tsx:6-8`)
- Section component content data as a typed module-level `const` array at the top of the file

## Where to Add New Code

**New section (e.g., "Certifications"):**
- Create `app/components/Certifications.tsx` following the section pattern (`'use client'`, `<section id="certifications">`, `motion` reveal, data `const` array)
- Add it to `app/page.tsx` between `</Skills>` and `<Projects>` (or the appropriate position)
- Add the id to the scroll-spy array in `app/components/Header.tsx:15` and the `navItems` list (`Header.tsx:58`)

**New animation / 3D primitive:**
- Implementation: `app/components/ui/<Name>.tsx` (client)
- Wire it into its section (e.g., `Hero` imports `GlobeScene` via `next/dynamic` with `ssr: false`)
- ESLint directive comment: `Lanyard.tsx` uses `/* eslint-disable react/no-unknown-property */` (`Lanyard.tsx:1`) for R3F intrinsic elements

**New hook:**
- `app/hooks/useXxx.ts` (must be `.ts` unless it contains JSX/`.tsx`); `'use client'`; consume in the relevant section component

**New API endpoint:**
- `app/api/<name>/route.ts` exporting HTTP handlers; declare `runtime` (`edge`) and any env vars

**Static asset:**
- Tech icons → `public/assets/icons/`; photos/3D models → `public/assets/lanyard/`; reference as absolute public paths (`/assets/...`), not imports

**Shared util:**
- Add to `lib/` beside `lib/utils.ts`

## Special Directories

**`node_modules/`:** Dependencies; not committed (`gitignore`). Do not add source here.

**`.planning/`:** GSD planning metadata including `codebase/` (STACK.md, ARCHITECTURE.md, STRUCTURE.md). Internal planning artifacts.

**`public/`:** Static files served verbatim at the root URL. Committed. All assets referenceable at `/assets/...` or `/icon.jpg`.

**`.next/`:** Next.js build output (gitignored); generated by `next build`/`next dev`.

---

*Structure analysis: 2026-08-04*