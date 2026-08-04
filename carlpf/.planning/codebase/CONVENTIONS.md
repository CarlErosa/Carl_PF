# Coding Conventions

**Analysis Date:** 2026-08-04

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `VisitorCounter.tsx`, `GlobeScene.tsx`)
- Hooks: camelCase prefixed with `use` — `useTypewriter.ts`, `useScrollAnimation.tsx`
- API route files: lowercase route file under feature folder — `app/api/visitors/route.ts`
- Utility: lowercase — `lib/utils.ts`

**Functions:**
- Components/hooks: named `function` declarations exported as `export default function ComponentName()` — see `app/components/Header.tsx:6`, `app/components/Skills.tsx:70`
- Local helpers: plain `function` declarations in the same file, PascalCase for component-like helpers (e.g., `ProficiencyDots` in `app/components/Skills.tsx:17`), camelCase for logic helpers (e.g., `useFibonacciSphere` in `app/components/ui/GlobeScene.tsx:29`)
- Hooks and utilities use **named exports** (`export function useTypewriter`, `export function cn` in `lib/utils.ts:4`), components use **default exports**

**Variables:**
- camelCase — `displayedText`, `currentTextIndex`, `isDeleting` (`app/components/ui/TextType.tsx:20-23`)
- State pairs follow the `[value, setter]` destructuring convention — `[isScrolled, setIsScrolled]` (`app/components/Header.tsx:7`)

**Types:**
- `interface` for props and object shapes: `RotatingTextProps`, `BandProps`, `SkillItem`, `SkillCategory` (`app/components/Skills.tsx:7-15`)
- `type` for unions: `type Proficiency = 'Proficient' | 'Comfortable'` (`app/components/Skills.tsx:5`)
- Props interfaces co-located in the same file as the component — no separate types/ directory
- Module-level constants (asset paths, static data) are SCREAMING_SNAKE / camelCase at top of file: `const cardGLB = '/assets/lanyard/card.glb'` (`app/components/ui/Lanyard.tsx:18`), `const categories: SkillCategory[]` (`app/components/Skills.tsx:36`)

## Code Style

**Formatting:**
- No Prettier or other formatter configured (no `.prettierrc`, no format script in `package.json`)
- **Mixed quote/terminator style exists** — follow the dominant style:
  - Single quotes + semicolons: most app code (`app/page.tsx`, `app/components/*`, `app/hooks/*`, `app/api/visitors/route.ts`, `components/RotatingText.tsx`)
  - Double quotes + no semicolons: `app/layout.tsx` and `lib/utils.ts` (shadcn/ui-generated style)
  - When adding new files, use single quotes + semicolons unless editing inside a file that already uses the double-quote/no-semicolon style
- 2-space indentation, trailing commas in multiline objects/args (both styles)

**Linting:**
- ESLint 9 flat config — `eslint.config.mjs` extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Run via `npm run lint` (alias for `eslint`)
- Per-file suppression used where needed: `/* eslint-disable react/no-unknown-property */` at top of `app/components/ui/Lanyard.tsx:1` (Three.js JSX attributes); `@ts-expect-error` inline comments for extended JSX elements (`app/components/ui/Lanyard.tsx:188,190`)

## Import Organization

**Order:**
1. `'use client';` directive first (client components) — 17 files use it
2. React hooks (`react`, `next/dynamic`, `motion/react`) 
3. Third-party libraries (`lucide-react`, `@react-three/*`, `@upstash/redis`)
4. Local imports with relative paths (`./components/...`, `../hooks/...`)
5. Side-effect/CSS imports last (`import "./globals.css"` in `app/layout.tsx:4`)

**Path Aliases:**
- `@/*` → project root, defined in `tsconfig.json:21-23` and mirrored in `components.json` aliases (`@/components`, `@/lib/utils`, `@/hooks`)
- **Not yet used in source imports** — all current imports are relative (`./components/Header`, `../hooks/useTypewriter`). New code may use either, but prefer relative for components in the same directory tree

## Error Handling

**Patterns:**
- API routes: try/catch around external calls returning a graceful fallback response — `app/api/visitors/route.ts:5-16` catches Redis failures and returns `Response.json({ count: 0 })`
- Client data fetching: `.catch()` on fetch chains, falling back to a default value — `app/components/VisitorCounter.tsx:10-15` (`setCount(0)`)
- No error boundaries, no toast/error UI components, no centralized error logging
- Environment config defaults to empty string rather than throwing: `process.env.UPSTASH_REDIS_REST_URL || ''` (`app/api/visitors/route.ts:8-9`)

**Guideline:** new data-fetching or external-call code should follow the fallback-value pattern (never crash the UI/route on upstream failure).

## Logging

**Framework:** None — no logger dependency; no `console.log`/`console.error` in source (`app/`, `components/`, `lib/`)

**Patterns:**
- No logging conventions established. If logging is needed, `console` is the only option currently available
- Errors are silently converted to fallback values instead of logged (see `app/api/visitors/route.ts:14`)

## Comments

**When to Comment:**
- Sparse. Comments are used only to explain non-obvious third-party integrations:
  - `// Using "any" for refs since the exact types depend on Rapier's internals` (`app/components/ui/Lanyard.tsx:39`)
  - `// @ts-expect-error - meshLineGeometry is extended via @react-three/fiber extend()` (`app/components/ui/Lanyard.tsx:188`)
- No JSDoc/TSDoc anywhere
- No TODO/FIXME/HACK markers in source

## Function Design

**Size:**
- Section components are large single-file modules (e.g., `app/components/ui/SkillGlobe.tsx` at 416 lines, `app/components/Hackathons.tsx` at 307) — helpers are split into co-located `function`s within the same file rather than separate modules

**Parameters:**
- Props typed inline with `interface XProps` and destructured in the function signature with defaults: `function Band({ maxSpeed = 50, minSpeed = 0 }: BandProps)` (`app/components/ui/Lanyard.tsx:38`)
- Small prop objects typed inline: `function Stars({ count = 200 }: { count?: number })` (`app/components/ui/GlobeScene.tsx:139`)

**Return Values:**
- Hooks return plain objects: `return { displayed, isDone }` (`app/hooks/useTypewriter.ts:27`), `return { ref, isVisible }` (`app/hooks/useScrollAnimation.tsx:34`)

## Module Design

**Exports:**
- Components: single `export default` per file
- Hooks/utilities: named `export function`
- Route handlers: `export async function GET()` plus `export const runtime = 'edge'` (`app/api/visitors/route.ts:3-5`)
- Next.js layout exports: `export const metadata: Metadata`, `export const viewport: Viewport`, `export default function RootLayout` (`app/layout.tsx:14-38`)

**Barrel Files:** None — imports reference component files directly

## React & Styling Conventions

**Client/Server split:**
- Add `'use client';` as the first line for any component using hooks or browser APIs — all of `app/components/*` and `app/components/ui/*` are client components
- `app/layout.tsx` and `app/page.tsx` remain server components

**Animation (motion/react):**
- Use `initial`/`animate` for mount animations and `whileInView` + `viewport={{ once: true, margin: '-80px' }}` for scroll-triggered reveals — see `app/components/Skills.tsx:78-101`
- Transition objects use `{ duration, delay, ease: 'easeOut' }` — see `app/components/Hero.tsx:45-48`

**Styling (Tailwind v4):**
- Utility-first with arbitrary values for the palette: `bg-[#6FCF7C]`, `text-[#7A9180]`, `border-[#1F2D22]` — see `app/components/Skills.tsx:112`
- CSS variables defined in `@theme inline` + `@layer base` in `app/globals.css` (`--color-background`, `--color-accent`, etc.)
- Custom non-Tailwind CSS classes live in `app/globals.css`: `.dot-grid`, `.bg-noise`, `.blink`, `.pulse-visited`, `.animate-float`, `.animate-fade-in`, `.animate-slide-in`
- Class merging: use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) — the shadcn convention; a local `cn` variant exists in `components/RotatingText.tsx:11`

**Three.js scenes:**
- Load lazily with `next/dynamic` and `ssr: false`, wrapped in `Suspense` with a skeleton fallback — see `app/components/Hero.tsx:9-14,107-113`
- Extend R3F with custom elements via `extend({ ... })` and `declare global` JSX augmentation (`app/components/ui/Lanyard.tsx:22-31`)

**Icons:** `lucide-react` (`Menu`, `X` in `app/components/Header.tsx:4`)
**Fonts:** `next/font/google` — Inter + Geist_Mono, applied in `app/layout.tsx:2,6-12`

---

*Convention analysis: 2026-08-04*
