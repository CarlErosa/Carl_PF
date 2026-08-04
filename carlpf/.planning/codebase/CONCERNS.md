# Codebase Concerns

**Analysis Date:** 2026-08-04

## Overview

`carlpf` is a single-page Next.js (App Router) portfolio site: `app/page.tsx` composes
`Header`, `Hero`, `About`, `Skills`, `Hackathons`, `Projects`, `Footer`. It is small but
carries a significant amount of dead code and duplicate implementations. The site is
otherwise a straightforward static presentation layer plus one edge function
(`app/api/visitors/route.ts`) backed by Upstash Redis.

---

## Tech Debt

**Dead UI components (never imported anywhere by `app/page.tsx` or its children):**
- `app/components/ui/SkillGlobe.tsx` — full 3D globe (second, competing implementation)
- `app/components/ui/SkillOrbit.tsx` — CSS-orbit globe (third implementation)
- `app/components/ui/LanyardScene.tsx` — legacy lanyard 3D scene (imports `Lanyard`)
- `app/components/ui/Lanyard.tsx` — heavy rapier physics ID card (heavy `any`/`@ts-expect-error`)
- `app/components/ui/TextType.tsx` — text typewriter element
- `app/components/ui/RotatingText.tsx` — bit-rotated text animation
- `components/RotatingText.tsx` — byte-identical copy of the above
- `app/hooks/useScrollAnimation.tsx` — IntersectionObserver hook

- Impact: Repo bloat, confusion about which component is "the" globe, ~1300 lines
  of dead code. These are excluded from the production bundle (Next tree-shakes
  unimported files), so the primary cost is maintenance and onboarding confusion, not
  payload — except the unused deps they pull in (see below).
- Fix approach: Delete all unused files and their now-orphaned dependencies. Keep only
  `GlobeScene.tsx` (the one wired into `Hero`).

**Triple-implemented skill globe:**
- Three independent renditions of the same idea: `GlobeScene.tsx` (active), `SkillGlobe.tsx`
  (dead), `SkillOrbit.tsx` (dead). Fix: keep one, delete the other two.

**Duplicate component:** `components/RotatingText.tsx` and `app/components/ui/RotatingText.tsx`
are the same file. Both unused. Fix: delete both (the site uses `useTypewriter` for its
typewriter effect, not either).

**Unused production dependencies** (declared in `package.json`, imported only by dead code):
- `gsap`, `react-bits`, `class-variance-authority` — no imports anywhere in `app/`, `components/`, `lib/`.
- `@react-three/rapier`, `meshline` — imported only by the dead `Lanyard.tsx`/`LanyardScene.tsx`.
- Impact: Rebundle size of the installed `node_modules` (dev-time bloat); `class-variance-authority`
  is a shadcn scaffold leftover although there are no generated `components/ui/*` shadcn primitives.
- Fix: `npm uninstall` the unused packages.

**Dead CSS in `app/globals.css`:**
- Keyframes `orbit-spin`, `twinkle` (only used by dead `SkillOrbit.tsx`) and `.animate-float`,
  `.animate-fade-in`, `.animate-slide-in`, `.animate-fade-in`/`.slide-in` (unreferenced).
- Impact: minor dead stylesheet weight. Value: the `@theme inline` block in `globals.css:19` maps
  `inter`/`geist-mono` to CSS vars, but `layout.tsx` passes font classNames directly. The `--font-sans`/
  `--font-mono` theme vars are unused by the markup.
- Fix: prune unused keyframes.

## Known Bugs

**Contradictory visitor/platform statistics.**
- `app/components/Projects.tsx:34` states ADPH handled "50,000+ requests"; `app/components/Hackathons.tsx:46`
  states the same platform handled "25,000+ requests and 1,000+ concurrent users". Same page, two numbers.
- Impact: credibility/confusion, not a runtime error. One source of truth per platform.

**"0 visitors" failure masking.**
- `app/api/visitors/route.ts:14-16` returns `{ count: 0 }` on any Redis error, and the client
  `app/components/VisitorCounter.tsx:14` also `.catch(() => setCount(0))`. Both failure modes render as a
  persistent "0 visitors" label, indistinguishable from a genuinely-empty counter.
- Impact: when Upstash reconfigures/expires and deploy fails to set `UPSTASH_REDIS_REST_*`, the hero shows a
  misleading "0 visitors" with no signal.
- Fix: on API failure return a distinct shape (e.g. omit `count`) and have the component render the loading
  skeleton or hide the counter instead of `0`.

**Unbounded `requestAnimationFrame` in `CursorFollower` (`app/components/CursorFollower.tsx`).**
- The `animate()` loop (line 49-55) recurses via `requestAnimationFrame` and is never cancelled in the
  cleanup (lines 62-66 only remove listeners). Once mounted it runs forever, continuing to write `style.left/top`
  on the (detached) cursor node after unmount.
- Impact: a per-frame leak that persists for the app's lifetime; the component returns early on touch devices
  (`matchMedia('(hover: none) and (pointer: coarse)')`) so the loop only runs on pointer devices.
- Fix: capture the `rafId` and `cancelAnimationFrame(rafId)` on cleanup.

**Stale experience "duration" strings in `app/components/Hackathons.tsx`.**
- Several roles list `period: 'Sep 2025 – Present'` with `duration: '3 mos'` (e.g. lines 31-35, 45-56),
  which evaluate as ~1 year as of the 2026-08 analysis date. The `CyberPH` entry even uses `'2026–Present'` for one role
  and `'Sep 2025 – Present'` for another.
- Impact: resume/timeline reads as stale/self-contradictory.

**Multiple un-throttled scroll listeners.**
- `Header.tsx:30` runs `document.getElementById` for 5 sections, plus `setIsScrolled`, on every frame; `Footer.tsx`
  adds a second independent `scroll` listener. No `requestAnimationFrame` or throttle.
- Impact: needless layout-thrash churn per scroll event on low-end devices; redundant listeners.
- Fix: coalesce both into one rAF-throttled handler (or native anchor links).

---

## Security Considerations

**Public unauthenticated, metered counter endpoint.**
- `/api/visitors` is a public `GET` that `redis.incr`s a key. Upstash REST is metered/billed per request, so this
  endpoint is an unauthenticated, unthrottled cost/DoS vector: a few thousand bots/hits silently billable and inflates
  the count. It also counts page-loads (and bots), not unique visitors.
- Files: `app/api/visitors/route.ts`, `app/components/VisitorCounter.tsx:11`.
- Current mitigation: none (no rate limit, no cache, no revalidation).
- Recommendations: add a minimal rate/cache step (e.g.   a per-visitor session flag or a CDN cache with a TTL instead
  of an increment on every hit), and/or use Vercel Analytics or a server-side unique-visitor count instead.

**Open-source security: 3 high-severity advisories (dev/prod transitive).**
- `npm audit --omit=dev` reports high severity: PostCSS (multiple CVEs via `node_modules/next/node_modules/postcss`)
  and `sharp` (CVEs via `next`), all by `next` 16.x – `npm audit fix` is available.
- Files: `package.json`, `package-lock.json`.
- Current mitigation: none applied; `.env*` is gitignored.
- Recommendation: run `npm audit fix` and pin `next`/transitive deps; re-audit.

---

## Performance Bottlenecks

**Heavy 3D scene above the fold.**
- `Hero` mounts `GlobeScene` (a react-three-fiber   `<Canvas>` with 15 `Html` DOM icons, 200 stars + 60 particles,
  a wireframe globe with 48×48 segments, and `OrbitControls` with `autoRotate`) as the hero's primary visual on every
  desktop visit, SSR-disabled. `GlobeScene` uses `frameloop="demand"` (`GlobeScene.tsx:266`) but `OrbitControls`
  auto-rotate invalidates every frame, so the frame budget is continuous.
- Files: `app/components/Hero.tsx:9`, `app/components/ui/GlobeScene.tsx`.
- Improvement path: pause/stop rendering behind a `IntersectionObserver` or `prefers-reduced-motion`, cap `dpr`
  (already `[1,2]`), or defer mount to idle time.

**Continuous cursor-animation RAF** on desktop (see Bug above) plus `Header`/`Footer` un-throttled scroll handlers.
- Files: `app/components/CursorFollower.tsx:49-60`, `app/components/Header.tsx:30`, `app/components/Footer.tsx:28`.

**Two Google fonts bundled onto every page.**
- `layout.tsx` loads `Inter` (variable) and `Geist_Mono` and applies both `inter.className` and `geistMono.className` to
  `<body>` even though mono glyphs are used sparingly. Consider loading only `Inter` full-width and a subset for mono.

---

## Fragile Areas

- **`app/components/ui/GlobeScene.tsx`** — only active 3D component; `SurfaceLogos` renders 15 HTML icons inside a
  `<Canvas>` whose geometry depends on `useFibonacciSphere` positions; but `frameloop="demand"` + `useFrame`
  plus `useFrame` mutating `rotation` on `Stars`/`NearParticles` — behavior depends on the controls invalidating the
  frame loop; a subtle coupling. Any change is easy to break visually.
- **`app/api/visitors/route.ts`** — creates a fresh `Redis` client per request (no module-level reuse); `runtime = 'edge'`
  requires the REST URL/token env vars be present at build/deploy or the route silently returns `count: 0`.
- **Content lives in component source** — all project/story/achievement data is hardcoded in `Projects.tsx`,
  `Hackathons.tsx`, `About.tsx`, `Skills.tsx`, and the globe. Editing copy requires source edits; no CMS, no
  content schema, near-duplicate name strings across files (e.g. the ADPH stat mismatch above).
- **No test coverage of any kind** — any refactor of counter logic, scroll detection, or typewriter animation has
  no regression safety net (see Test Coverage Gaps).

---

## Scaling Limits

- Visitor counter counts HTTP requests, not unique visitors (bots and reloads inflate it), and its concurrency
  and cost scale linearly with untrusted traffic against a metered Upstash REST counter. Not a real scale limit for a
  portfolio; cap the counter via rate limiting or switch to an analytics-service-based count.

---

## Dependencies at Risk

- `next` pinned to `^16.1.1` (very recent major) and its transitive `postcss`/`sharp` currently fail audit
  as high severity. Watch for next patch bumps; `npm audit fix`.
- **`class-variance-authority`, `gsap`, `react-bits`, `@react-three/rapier`, `meshline`** are unused dead weight —
  removal candidates.
- `motion` (Framer Motion successor), `three`, `@react-three/fiber`, `@react-three/drei` are actively pinned in the
  active `GlobeScene.tsx`; no migration plan needed.

---

## Missing Critical Features

- **No automated tests** — no test framework, no `test` script, zero test files anywhere in the repo.
- **No CI pipeline** — no GitHub Actions (or other CI) file, so lint/type-check/build are only run locally; no
  deploy trigger beyond Vercel default behavior.
- **No SEO/robots/sitemap** — no `robots.txt`, no `sitemap.ts`, and `layout.tsx` lacks `metadataBase` (OG/Twitter
  cards are defined only as title/description, no images). `metadataBase` matters for URL-relative OG metadata.
- **No `next.config.ts` tuning** — the config file in `next.config.ts:3-7` is empty; no image optimizer for
  inline globes (plain `<img>` used inside globe HTML overlays), and no headers/security policy.

---

## Test Coverage Gaps

**Untested area:** effectively the entire codebase.
- What's not tested: visitor-counter API (`app/api/visitors/route.ts`), the count-up animation
  (`app/components/VisitorCounter.tsx`), the typewriter hook (`app/hooks/useTypewriter.ts`), header scroll/active-
  section detection (`app/components/Header.tsx`), and the 3D globe (`app/components/ui/GlobeScene.tsx`).
- Risk: refactors to the counter API shape, error-handling, or animation timing can regress silently; the 
  "0 visitors" bug above shipped without detection.
- Priority: High for the `/api/visitors` route + `VisitorCounter` (+ a unit test for `useTypewriter`); Low for the
  3D scene (visual).

---

*Concerns audit: 2026-08-04*