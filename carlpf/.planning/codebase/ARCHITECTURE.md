<!-- refreshed: 2026-08-04 -->
# Architecture

**Analysis Date:** 2026-08-04

## System Overview

Single-page portfolio site built on the Next.js 16 App Router. One route (`/`) renders a server-composed page of client-side section components; one Edge API route serves a visitor counter backed by Upstash Redis.

```text
┌────────────────────────────────────────────────────────────────┐
│              Root Layout (Server)                              │
│              `app/layout.tsx`                                   │
│              fonts · metadata · <CursorFollower/>              │
└───────────────────────────────┬────────────────────────────────┘
                                │ children
                                ▼
┌────────────────────────────────────────────────────────────────┐
│              Page Composition (Server)                          │
│              `app/page.tsx`                                     │
│   Header → Hero → About → Skills → Hackathons → Projects →      │
│   Footer                                                        │
└───────────────────────────────┬────────────────────────────────┘
                                │ renders
                                ▼
┌────────────────────────────────────────────────────────────────┐
│              Section Components (Client, 'use client')          │
│              `app/components/*.tsx`                             │
│   scroll-spy nav (Header) · animations (motion/react) ·         │
│   dynamic 3D (Hero → GlobeScene, ssr:false)                     │
│              │                                 │                │
│              ▼                                 ▼                │
│   Hooks            Features                3D Primitives        │
│   `app/hooks/`     `VisitorCounter`        `app/components/ui/` │
└───────┬─────────────────────────────┬───────────────────────────┘
        │                             │
        ▼  fetch('/api/visitors')      ▼
┌───────────────────────────────┐   ┌──────────────────────────────┐
│  Edge API Route (Server)      │   │  Static Assets               │
│  `app/api/visitors/route.ts`  │   │  `public/assets/`            │
│  @upstash/redis · incr        │   │  icons/ · lanyard/           │
└───────────────┬───────────────┘   └──────────────────────────────┘
                ▼
┌───────────────────────────────┐
│  Upstash Redis (external)     │
│  key: `portfolio_visitors`    │
└───────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `RootLayout` | HTML shell, font loading, metadata/OG/Viewport, global CursorFollower mount | `app/layout.tsx` |
| `Home` (page) | Composes section order for the single page | `app/page.tsx` |
| `Header` | Fixed nav, scroll-spy active section, mobile menu, smooth-scroll | `app/components/Header.tsx` |
| `Hero` | Hero copy, typewriter effect, dynamic 3D globe, visitor counter | `app/components/Hero.tsx` |
| `About` | Bio, photo, highlights grid | `app/components/About.tsx` |
| `Skills` | Skill category cards with proficiency dots | `app/components/Skills.tsx` |
| `Hackathons` | Tabbed Achievements/Experience (timeline) | `app/components/Hackathons.tsx` |
| `Projects` | Project card grid from local data | `app/components/Projects.tsx` |
| `Footer` | Social links, back-to-top button | `app/components/Footer.tsx` |
| `VisitorCounter` | Fetches and animates visitor count | `app/components/VisitorCounter.tsx` |
| `CursorFollower` | Custom cursor (rAF lerp), desktop only | `app/components/CursorFollower.tsx` |
| `GlobeScene` | R3F wireframe globe with skill icons | `app/components/ui/GlobeScene.tsx` |
| `GET` (route) | Increments Redis counter, returns JSON | `app/api/visitors/route.ts` |
| `cn` | Tailwind class merge helper (shadcn) | `lib/utils.ts` |
| `useTypewriter` | Char-by-char typing effect | `app/hooks/useTypewriter.ts` |

## Pattern Overview

**Overall:** Single-page section-composition. A server page (`app/page.tsx`) stacks independently authored client sections in DOM order; navigation is scroll-to-anchor via `id` attributes, not routes.

**Key Characteristics:**
- One route (`/`); every section is a `<section id="...">` targeted by the Header scroll-spy (`app/components/Header.tsx:15`)
- All section/UI components are client components (`'use client'`); only `app/layout.tsx` and `app/page.tsx` are server components
- Content data is colocated as module-level `const` arrays inside each section file (e.g., `projects` in `app/components/Projects.tsx:21`, `categories` in `app/components/Skills.tsx:36`, `experiences` in `app/components/Hackathons.tsx:20`) — no data layer, CMS, or server fetch for page content
- Animation is via `motion/react` (framer-motion successor); 3D via `@react-three/fiber` + `@react-three/drei`; physics via `@react-three/rapier`
- Heavy 3D scene (`GlobeScene`) is loaded with `next/dynamic({ ssr: false })` inside `app/components/Hero.tsx:9` to keep it out of the server bundle
- One external data dependency: Upstash Redis via a single Edge route

## Layers

**Root Layout (server):**
- Purpose: HTML shell, global fonts, metadata, global UI chrome
- Location: `app/layout.tsx`
- Contains: `next/font/google` (`Inter`, `Geist_Mono`), `Metadata`/`Viewport` exports, `<CursorFollower/>`
- Depends on: `./components/CursorFollower`, `./globals.css`
- Used by: Next.js (all routes)

**Page Composition (server):**
- Purpose: Declares the one-page section order
- Location: `app/page.tsx`
- Contains: `<Header/>`, `<main>` with `<Hero/> <About/> <Skills/> <Hackathons/> <Projects/>`, `<Footer/>`
- Depends on: `./components/*`
- Used by: Next.js router

**Section Components (client):**
- Purpose: Self-contained page sections with their own data + styling
- Location: `app/components/`
- Contains: `Header`, `Hero`, `About`, `Skills`, `Hackathons`, `Projects`, `Footer`, `VisitorCounter`, `CursorFollower`
- Depends on: `motion/react`, `lucide-react`, `next/image`, `next/dynamic`, hooks in `app/hooks/`, ui components in `app/components/ui/`
- Used by: `app/page.tsx`, each other (`Hero` renders `VisitorCounter` and `GlobeScene`)

**Feature/UI Primitives (client):**
- Purpose: Reusable animation and 3D building blocks
- Location: `app/components/ui/`
- Contains: `GlobeScene` (used), `SkillGlobe`, `SkillOrbit`, `Lanyard`, `LanyardScene`, `RotatingText`, `TextType` (all unused)
- Depends on: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`, `motion/react`
- Used by: `Hero` (GlobeScene only)

**Hooks (client):**
- Purpose: Shared effect logic
- Location: `app/hooks/`
- Contains: `useTypewriter` (used by Hero), `useScrollAnimation` (unused)
- Used by: section components

**API Route (edge):**
- Purpose: Visitor counter endpoint
- Location: `app/api/visitors/route.ts`
- Contains: `GET` handler, `export const runtime = 'edge'`, Upstash Redis client instantiated per-request
- Depends on: `@upstash/redis`, env vars `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
- Used by: `VisitorCounter` via `fetch('/api/visitors')`

**Shared Utilities:**
- Purpose: Framework-agnostic helpers
- Location: `lib/utils.ts`
- Contains: `cn()` (clsx + tailwind-merge)
- Used by: shadcn convention; currently not imported by any section component

## Data Flow

### Primary Request Path (page load)

1. Browser requests `/` → `app/layout.tsx` renders HTML shell with fonts and metadata, mounts `<CursorFollower/>` (`app/layout.tsx:48`)
2. `app/page.tsx` (server) renders the section stack — each section component executes on the client (`'use client'`)
3. `Hero` triggers `useTypewriter('Builder with a passion for scaling', 80)` and dynamically loads `GlobeScene` (`app/components/Hero.tsx:9`, `:19`)

### Visitor Counter Flow

1. `VisitorCounter` mounts and `fetch('/api/visitors')` (`app/components/VisitorCounter.tsx:11`)
2. Edge `GET` handler constructs an Upstash Redis client and calls `redis.incr('portfolio_visitors')` (`app/api/visitors/route.ts:12`)
3. Response `{ count }` flows back; `VisitorCounter` animates `display` from 0 to `count` in ~20ms steps (`app/components/VisitorCounter.tsx:25-35`)

**State Management:**
- No global state library. State is local `useState`/`useEffect` per component (e.g., `activeTab` in `app/components/Hackathons.tsx:129`, `activeSection` in `app/components/Header.tsx:8`)
- Counters and flags reset on mount (client) or via `next/dynamic` lazy loading

## Key Abstractions

**Section component:**
- Purpose: A scroll-targeted page section owning its content data and styling
- Examples: `app/components/About.tsx`, `app/components/Skills.tsx`, `app/components/Projects.tsx`, `app/components/Hackathons.tsx`
- Pattern: default-export function returning a `<section id="...">`; data as typed module-level constants; `motion` reveal animations with `whileInView` + `viewport={{ once: true }}`

**Client hook:**
- Purpose: Encapsulate imperative effect logic for reuse
- Examples: `app/hooks/useTypewriter.ts`, `app/hooks/useScrollAnimation.tsx`
- Pattern: `'use client'`, `useState` + `useEffect`, returns a plain object

**3D scene wrapper (client-only):**
- Purpose: Isolate Three.js canvas scenes behind a normal React component, loaded lazily
- Example: `app/components/ui/GlobeScene.tsx`, imported via `dynamic(() => import('./ui/GlobeScene'), { ssr: false })` in `app/components/Hero.tsx:9`
- Pattern: `'use client'`, `Canvas` from `@react-three/fiber`, `useFrame` for per-frame rotation, `memo` export (`GlobeScene.tsx:245`)

## Entry Points

**Root layout:**
- Location: `app/layout.tsx`
- Triggers: Every request (App Router root layout)
- Responsibilities: Fonts, metadata/OG/Twitter cards, viewport/themeColor, global custom cursor

**Home page:**
- Location: `app/page.tsx`
- Triggers: `GET /`
- Responsibilities: Compose section order for the single-page site

**Visitor counter API:**
- Location: `app/api/visitors/route.ts`
- Triggers: `GET /api/visitors`
- Responsibilities: Increment + return visitor count; graceful `{ count: 0 }` on any Redis failure

## Architectural Constraints

- **Client/server split:** Everything under `app/components/`, `app/components/ui/`, `app/hooks/` is client-rendered (`'use client'`). Only `app/layout.tsx`, `app/page.tsx`, and the API route run on the server/edge.
- **3D is client-only:** All Three.js scenes require `ssr: false` dynamic imports — do not import R3F components into server components.
- **Runtime:** The API route pins `export const runtime = 'edge'` (`app/api/visitors/route.ts:3`); the rest of the app uses the default Node.js server runtime.
- **Global state:** None module-level besides static data constants. Each component owns its state.
- **Circular imports:** None detected.
- **Alias vs relative imports:** `@/*` alias configured in `tsconfig.json:22`, but all current imports use relative paths (`'../hooks/useTypewriter'`, `'./components/Header'`).

## Anti-Patterns

### Duplicated component across directories

**What happens:** `components/RotatingText.tsx` and `app/components/ui/RotatingText.tsx` are near-identical copies (only difference: the `app/components/ui` copy adds a `'use client'` directive — see `diff` output). Neither is imported anywhere.
**Why it's wrong:** Two copies drift independently; the root `components/` directory (a shadcn/reserved location per `components.json`) is not part of the App Router component tree, which is confusing.
**Do this instead:** Keep a single copy. If a client component is needed, put it in `app/components/ui/` (or `app/components/`) and delete `components/RotatingText.tsx`.

### Dead feature components in `app/components/ui/`

**What happens:** `SkillGlobe.tsx` (416 lines), `SkillOrbit.tsx` (169), `Lanyard.tsx` (203), `LanyardScene.tsx` (54), `TextType.tsx` (59), and both `RotatingText.tsx` copies are exported but never imported (verified via grep — only `GlobeScene` and `Lanyard`→`LanyardScene` have internal references, and `LanyardScene` itself is unused).
**Why it's wrong:** ~900 lines of shipped-but-dead code plus unused assets (`public/assets/lanyard/*.glb`, `test.glb`, `test2.glb`, several images) inflate bundle-adjacent maintenance surface.
**Do this instead:** Wire them into sections (e.g., `SkillGlobe`/`SkillOrbit` into `Skills.tsx`) or delete them and their unused assets. `app/hooks/useScrollAnimation.tsx` is likewise unused — either use it in sections or remove it.

## Error Handling

**Strategy:** Fail-soft, display-default. The only failure-prone path is the Redis-backed counter.

**Patterns:**
- API route wraps the whole handler in `try/catch` and returns `{ count: 0 }` on any error (`app/api/visitors/route.ts:14-16`)
- `VisitorCounter` chains `.catch(() => setCount(0))` on the fetch (`app/components/VisitorCounter.tsx:14`) and renders a 0-count display
- No error boundaries, no loading states beyond a pulsing placeholder (`app/components/Hero.tsx:11-13`)

## Cross-Cutting Concerns

**Logging:** None — no console output, no logging framework in any component.
**Validation:** None — no runtime input validation (no forms, no user input beyond the counter).
**Authentication:** None — single public page; the Redis counter is unauthenticated by design.
**Accessibility:** CursorFollower disables on touch/coarse-pointer devices (`app/components/CursorFollower.tsx:9`); nav buttons carry `aria-label`/`aria-expanded` (`app/components/Header.tsx:113-114`); the RotatingText pattern includes an `sr-only` text copy (`components/RotatingText.tsx:188`).

---

*Architecture analysis: 2026-08-04*
