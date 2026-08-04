# External Integrations

**Analysis Date:** 2026-08-04

## APIs & External Services

**Data / Redis:**
- Upstash Redis (REST) — visitor counter. Only external service integration.
  - SDK/Client: `@upstash/redis` (`app/api/visitors/route.ts:1`)
  - Usage: `incr('portfolio_visitors')` on each `GET /api/visitors` (`app/api/visitors/route.ts:12`)
  - Auth: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` env vars (`app/api/visitors/route.ts:8-9`)
  - Failure mode: route catches all errors and returns `{ count: 0 }` (`app/api/visitors/route.ts:14-15`); client falls back to 0 on fetch failure (`app/components/VisitorCounter.tsx:14`)
  - Runs on Vercel Edge runtime (`app/api/visitors/route.ts:3`)

**Fonts:**
- Google Fonts via `next/font/google`: Inter and Geist Mono (`app/layout.tsx:2,6-12`). Fetched and self-hosted at build time by Next.js — no runtime API call.

## Data Storage

**Databases:**
- Upstash Redis (serverless key-value store) — single counter key `portfolio_visitors`.
  - Connection: `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
  - Client: `@upstash/redis` (REST over HTTPS; no local Redis)

**File Storage:**
- Local filesystem only (`public/` assets: `public/assets/`, svg files). No object storage.

**Caching:**
- None (beyond Next.js built-in fetch/static caching).

## Authentication & Identity

**Auth Provider:**
- None. No auth library, no login flow, no middleware guards.

## Monitoring & Observability

**Error Tracking:**
- None (no Sentry/LogRocket/etc.). API route silently swallows errors (`app/api/visitors/route.ts:14`).

**Logs:**
- None — no logging statements in source; relies on platform (Vercel) runtime logs.

## CI/CD & Deployment

**Hosting:**
- Vercel (README deployment section; `.vercel` in `.gitignore`; Edge runtime route target).

**CI Pipeline:**
- None detected in repo (no `.github/workflows`, no other CI config). Vercel build runs `next build`; `lint` script available but not wired to CI.

## Environment Configuration

**Required env vars:**
- `UPSTASH_REDIS_REST_URL` — Upstash REST endpoint (`app/api/visitors/route.ts:8`)
- `UPSTASH_REDIS_REST_TOKEN` — Upstash REST token (`app/api/visitors/route.ts:9`)

**Secrets location:**
- Not in repo. `.env*` gitignored; expected in Vercel project env settings.

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

## Outbound Links (non-API)

- Project showcase links in `app/components/Projects.tsx` (Vercel-hosted demo URLs, GitHub repo URLs)
- Social links: LinkedIn (`app/components/Hero.tsx:88`, `app/components/Footer.tsx:10,58`), GitHub (`app/components/Footer.tsx:15`)
- These are static anchor hrefs, not API integrations.

---

*Integration audit: 2026-08-04*