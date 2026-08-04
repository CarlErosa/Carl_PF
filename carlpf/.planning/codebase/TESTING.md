# Testing Patterns

**Analysis Date:** 2026-08-04

## Test Framework

**Runner:** Not configured — no Jest, Vitest, Playwright, or other test runner installed

**Assertion Library:** Not configured

**Config:** No `jest.config.*`, `vitest.config.*`, or `playwright.config.*` exist.

**Run Commands:**
```bash
npm run lint     # The only quality check wired up (runs `eslint`)
npm run build    # Next.js production build (type-checks via next build)
```

There are **no test scripts** in `package.json`. Verification currently relies on `next build` (which runs TypeScript type-checking) and `next lint`.

## Test File Organization

**Location:** Not applicable — no test files exist in the project. The only `.test.*`/`.spec.*` files are inside `node_modules` (third-party dependencies).

**Naming:** Not established. Recommendation for when tests are added: co-locate `*.test.ts`/`*.test.tsx` next to the source, or place under a `__tests__/` directory.

**Structure:** Not applicable.

## Test Structure

No test suites exist. If a runner is introduced, the natural first targets given the codebase's pure-logic content are:

- `app/hooks/useTypewriter.ts` — pure state-machine logic (interval-based char reveal)
- `lib/utils.ts` — the `cn()` class-merge helper
- `app/api/visitors/route.ts` — Redis increment handler with a fallback path

Example shape (recommended pattern for the project, Vitest):
```typescript
// colocated: app/hooks/useTypewriter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from './useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('increments displayed text over time', () => {
    const { result } = renderHook(() => useTypewriter('abc', 10));
    expect(result.current.displayed).toBe('');
    act(() => vi.advanceTimersByTime(20));
    expect(result.current.displayed).toBe('a');
  });
});
```

## Test Structure

**Suite Organization:** Not applicable — follow the runner's `describe`/`it` conventions when added.

**Patterns:** No patterns to report.

## Mocking

**Framework:** Not configured.

**What would need mocking (based on current code):**
- `@upstash/redis` in `app/api/visitors/route.ts` (instantiated from env vars; `process.env.UPSTASH_REDIS_REST_URL`/`_TOKEN`)
- `window`/`document` browser APIs in client hooks and components (`app/hooks/useScrollAnimation.tsx`, `app/components/CursorFollower.tsx`)
- Timers (`setInterval`/`setTimeout`) in `app/hooks/useTypewriter.ts`, `app/components/ui/TextType.tsx`, `app/components/VisitorCounter.tsx`
- `fetch` in `app/components/VisitorCounter.tsx:11`

**Guidelines:** Mock at the module boundary — mock the Redis client and `fetch`, not internal implementation. Use fake timers for interval/timeout logic.

## Fixtures and Factories

**Test Data:** Not applicable — no fixtures exist.
**Location:** No fixtures directory.

## Coverage

**Requirements:** None enforced — no coverage tooling or thresholds configured (`/coverage` is git-ignored in `.gitignore`, anticipating a future setup).

**View Coverage:** Not possible until a runner with coverage is added.

## Test Types

**Unit Tests:** None. The highest-value unit candidates are the hooks and `lib/utils.ts` listed above.

**Integration Tests:** None. `app/api/visitors/route.ts` is the primary candidate — a request/response test against the route handler.

**E2E Tests:** None. No Playwright/Cypress. The site is a static portfolio; if E2E is added, Playwright is the common choice for Next.js.

## Common Patterns

**Error Testing:** No tests. The fallback behavior is the important contract to test:
- `app/api/visitors/route.ts` returns `{ count: 0 }` when Redis throws
- `app/components/VisitorCounter.tsx` sets `count` to `0` when `fetch` rejects

---

*Testing analysis: 2026-08-04*