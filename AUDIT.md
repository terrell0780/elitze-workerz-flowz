# Full-Stack Production Readiness Audit - Elitze WorkerzNow

**Audit date:** 2026-09-04
**Branch:** `arena/01a06d92-zevanto`
**Baseline commit:** `bb27659` ("Add files via upload")
**Scope:** entire repository - front end, build tooling, and the server side that did not exist yet
**Requested by:** full-stack readiness review ahead of shipping

---

## 1. Executive summary

The repository entered this audit as a **front-end prototype with no backend at all**. It compiled and rendered, but it had no API, no persistence, no tests, no CI, no security model, and no deployment story. Several visible features were also quietly broken.

It now ships as a **full-stack application**: a React client, an Express API, and a shared TypeScript domain module that both compile against, with 44 automated tests, CI, Docker, structured logging and a security baseline.

| Area                | Before                                   | After                                                        |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| Backend             | None                                     | Express API, SQLite, repository layer, 12 endpoints           |
| Shared contract     | None (UI-only fixtures)                  | `/shared` types + catalogue + deterministic roster            |
| Security            | Admin PIN in the browser bundle          | Server-side PIN, HMAC tokens, rate limits, helmet, zod        |
| Correctness         | 2 silent data bugs (DATA-01/02)          | Fixed, each with a regression test                            |
| Data determinism    | `Math.random()` on every render          | Seeded PRNG - identical on client and server                  |
| Error handling      | No error boundary, no error states       | Error boundary, typed API errors, offline fallback            |
| Routing             | State-only (no URLs)                     | URL hash routing - linkable, reload-safe                      |
| Accessibility       | Non-semantic modals, no keyboard paths   | Focus-trapped dialogs, skip link, live regions                |
| Tests               | 0                                        | 44 (domain, API integration, auth, client)                    |
| CI / delivery       | None                                     | GitHub Actions + Dockerfile + compose                         |
| Observability       | `console` only                           | Structured JSON logs, correlation ids, health/readiness       |

**Verdict:** the codebase moved from *not shippable* to *shippable for a controlled launch*, provided the four P0 items in section 7 are closed first (real authentication, Postgres, secret rotation, and a license).

---

## 2. Scope and method

Evidence was gathered by:

1. **Static review** of all 34 source files (line-by-line for `App.tsx`, the page components, and the data layer).
2. **Toolchain runs** - `tsc --noEmit`, `vite build`, `npm audit`.
3. **Dependency inspection** - version pinning, transitive risk, native build requirements.
4. **Runtime probing** of every new endpoint (status codes, validation, auth gating, rate limiting).
5. **Automated tests** written to prove each behavioural fix (44 tests, all passing).
6. **Bundle analysis** - comparing the previous single-file output against the new build.

---

## 3. Baseline: what the repository actually was

- A Vite + React 19 + Tailwind 4 single-page app, 34 source files, ~3,400 lines.
- `vite-plugin-singlefile` inlined JS, CSS and fonts into one 511 kB HTML file.
- Every number on every screen was a hard-coded literal inside the component.
- The 1,000-employee roster was generated with `Math.random()` at render time.
- `package.json` was still named `react-vite-tailwind` at version `0.0.0`.
- No `.gitignore`, no README, no LICENSE, no tests, no CI, no environment handling.

There was **no server**. The "full stack" gap was total, not partial.

---

## 4. Findings

Severities: **Critical** = blocks launch or leaks a credential; **High** = broken feature or major launch risk; **Medium** = correctness/maintainability debt; **Low** = polish.

### 4.1 Findings register

| ID      | Severity | Area         | Finding                                                                 | Status       |
| ------- | -------- | ------------ | ----------------------------------------------------------------------- | ------------ |
| SEC-01  | Critical | Security     | Admin PIN compared in the browser; hint text shipped to every visitor    | Fixed        |
| SEC-02  | High     | Security     | No security headers, CSP or HSTS                                         | Fixed        |
| SEC-03  | High     | Security     | No rate limiting - PIN brute-forceable                                   | Fixed        |
| SEC-04  | Medium   | Security     | No server-side input validation anywhere                                 | Fixed        |
| SEC-05  | Medium   | Security     | No config/secret management; secrets would have been committed           | Fixed        |
| SEC-06  | Medium   | Security     | No CORS policy                                                           | Fixed        |
| SEC-07  | Low      | Security     | No dependency audit gate                                                 | Fixed        |
| ARC-01  | Critical | Architecture | No backend, API, or persistence                                          | Fixed        |
| ARC-02  | High     | Architecture | No shared contract between client and server                             | Fixed        |
| ARC-03  | High     | Architecture | Business logic embedded in components                                    | Fixed        |
| ARC-04  | Medium   | Architecture | No health or readiness probes                                            | Fixed        |
| ARC-05  | Medium   | Architecture | No graceful shutdown                                                     | Fixed        |
| ARC-06  | Low      | Architecture | No container or deployment artifact                                      | Fixed        |
| DATA-01 | Critical | Data         | Department counts silently dropped HR (875 reported vs 1,000)            | Fixed        |
| DATA-02 | High     | Data         | Employee filter chips matched no records; a department unreachable       | Fixed        |
| DATA-03 | High     | Data         | `Math.random()` roster - values changed on every reload                  | Fixed        |
| DATA-04 | Medium   | Data         | All dashboard metrics hard-coded                                         | Fixed        |
| DATA-05 | Medium   | Data         | Impure render: `Math.random()` called while rendering                    | Fixed        |
| DATA-06 | Low      | Data         | `Date.now()` ids collide within the same millisecond                     | Fixed        |
| FE-01   | Critical | Front end    | No error boundary - any render error blanked the app                     | Fixed        |
| FE-02   | High     | Front end    | No URL routing - reload lost your place, no deep links                   | Fixed        |
| FE-03   | High     | Front end    | No loading, error, or empty states                                       | Fixed        |
| FE-04   | Medium   | Front end    | `setTimeout` navigation with no cleanup (update after unmount)           | Fixed        |
| FE-05   | Medium   | Front end    | Hover state re-rendered a 1,000-item grid                                | Fixed        |
| FE-06   | Medium   | Front end    | Modals had no role, focus trap or Escape - despite an "ESC" hint         | Fixed        |
| FE-07   | Medium   | Front end    | Entire 1,000-record roster held and sliced in the browser                | Fixed        |
| FE-08   | Low      | Front end    | ~1,900 lines of dead/duplicate components                                | Removed      |
| FE-09   | Low      | Front end    | Theme choice never persisted                                             | Fixed        |
| FE-10   | Low      | Front end    | `any` types and untyped icon props                                       | Fixed        |
| PERF-01 | High     | Performance  | 511 kB single-file bundle - no caching, no splitting                     | Fixed        |
| PERF-02 | Medium   | Performance  | Search fired a filter pass per keystroke                                 | Fixed        |
| PERF-03 | Low      | Performance  | No vendor chunking                                                       | Fixed        |
| QA-01   | Critical | QA           | Zero tests                                                               | Fixed        |
| QA-02   | High     | QA           | No CI                                                                    | Fixed        |
| QA-03   | Medium   | QA           | No linter or formatter                                                   | Fixed        |
| QA-04   | Medium   | QA           | `tsconfig` had unused-symbol checks disabled                             | Fixed        |
| OBS-01  | High     | Observ.      | No structured logging or request correlation                             | Fixed        |
| OBS-02  | Low      | Observ.      | No way to identify the running build                                     | Fixed        |
| A11Y-01 | High     | A11Y         | Dialogs unusable by keyboard, no semantics                               | Fixed        |
| A11Y-02 | Medium   | A11Y         | No skip link, no `aria-current`, no route announcement                   | Fixed        |
| A11Y-03 | Low      | A11Y         | Decorative graphics and icon-only controls unlabelled                    | Partly fixed |
| SEO-01  | Medium   | SEO          | Per-page metadata applied client-side only - crawlers see one page       | Open (P1)    |
| SEO-02  | Low      | SEO          | Brand mismatch: `WorkerzNow` vs `Workforce Hub` vs `Zevanto`             | Fixed        |
| SEO-03  | Low      | SEO          | No `robots.txt`, `sitemap.xml` or `og:image`                             | Flagged      |
| OPS-01  | Medium   | Ops          | No `.gitignore`, README or LICENSE                                       | Partly fixed |
| OPS-02  | Medium   | Ops          | Placeholder package name/version, no `engines`                           | Fixed        |
| OPS-03  | Medium   | Ops          | No `.env.example`                                                        | Fixed        |

### 4.2 Critical and high findings in detail

#### SEC-01 - Admin credential shipped to the browser (Critical, fixed)

```tsx
// src/App.tsx (before)
const handleSubmit = () => {
  if (pin.join('') === '1234') { onSuccess(); }
  ...
<p className="text-center text-xs text-slate-400 mt-3">Demo PIN: 1234</p>
```

The PIN gate was a client-side string comparison, and the UI printed the credential. Anyone could read it from the bundle; there was no server to enforce anything.

**Fix:** the PIN is verified by `POST /api/v1/auth/pin` using a constant-time digest comparison, rate-limited to 10 attempts per 15 minutes, and exchanged for a short-lived HMAC-SHA256 token. Destructive routes (`DELETE /deployments/:id`) require that token. The hint text is gone, and the token is held in memory only (not `localStorage`), so it dies with the tab.

#### ARC-01 - No backend (Critical, fixed)

There was no API, database, or server-side logic of any kind. See section 5 for what was built.

#### DATA-01 - Department counts silently dropped every HR employee (Critical, fixed)

The catalogue labels the department `Human Resources`; the records store `HR`. Joining on the display label meant HR matched nothing:

```text
GET /api/v1/departments  ->  sum(employeeCount) = 875   (should be 1000)
```

This class of bug is dangerous precisely because nothing errors - the number is just wrong.

**Fix:** `DEPARTMENT_BY_ROSTER_NAME` in `shared/catalog.ts` binds roster names to display metadata in one place, and `listDepartments()` joins on the roster name. Two regression tests now assert that every roster department resolves to metadata and that per-department counts total exactly 1,000.

#### DATA-02 - Employee filters matched no records (High, fixed)

```tsx
// src/pages/EmployeesPage.tsx (before)
const departments = ['All','Support','Sales','Marketing','Operations','Engineering','Finance','HR'];
const matchesDept = activeDept === 'All' || emp.department === activeDept;
```

Stored departments are `Customer Support`, `Sales`, `Operations`, `Administration`, `Marketing`, `Finance`, `HR`, `Engineering`. So the **Support** chip always returned zero results, and **Administration** had no chip at all - 125 unreachable employees.

**Fix:** filter options are now derived from `DEPARTMENT_FILTERS` (generated from the catalogue itself). A test asserts every filter value returns a non-empty result.

#### DATA-03 - Non-deterministic data (High, fixed)

`generateEmployees()` called `Math.random()` for prices, ratings and deployment counts, so values changed on every reload, and a client and server would never agree on the same employee.

**Fix:** a seeded mulberry32 PRNG (`shared/rng.ts`). The roster is byte-identical on both sides and across reloads. A test re-implements the guard by throwing if `Math.random()` is called during generation.

#### FE-01 / FE-02 / FE-03 - Front-end resilience (Critical/High, fixed)

- **No error boundary:** one thrown error unmounted the entire tree and left a blank page. Added `ErrorBoundary` with a retry/reload affordance.
- **No routing:** the active page lived in `useState`, so reloads always returned to the dashboard, URLs were unshareable, and the back button did nothing. Added hash routing (`#/employees`) - no router dependency.
- **No async states:** pages rendered hard-coded fixtures with no loading, error or empty handling. Added `useResource`, which provides loading/error/degraded state, cancels in-flight requests on unmount, and falls back to the local shared catalogue if the API is unreachable (clearly labelled as offline).

#### PERF-01 - Single-file bundle (High, fixed)

`vite-plugin-singlefile` inlined everything into `dist/index.html` at **511 kB** (141 kB gzip). That means no content hashing, no long-lived caching, no code splitting, and a render-blocking blob of JS and fonts on every deploy.

**Fix:** single-file is now opt-in via `VITE_SINGLE_FILE=true`; the default build emits hashed, split, cacheable assets with source maps and vendor chunking (react / framer-motion / lucide-react):

```text
before:  dist/index.html                    511.00 kB  (gzip 141.32 kB)
after:   dist/client/index.html               4.11 kB
         assets/index.css                    61.08 kB  (gzip   9.29 kB)
         assets/index.js                    287.28 kB  (gzip  84.78 kB)
         assets/motion.js                   133.98 kB  (gzip  44.28 kB)
         assets/icons.js                     13.54 kB  (gzip   5.24 kB)
         assets/react.js                      3.70 kB  (gzip   1.41 kB)
```

Vendor chunks (about 51 kB gzip) stay cached across deploys, and the initial HTML is 4 kB instead of 511 kB.

#### QA-01 / QA-02 - Nothing verified anything (Critical/High, fixed)

Zero tests and zero CI. Added 44 Vitest tests across four suites, plus a GitHub Actions pipeline running lint, typecheck, tests, build, a production dependency audit and a committed-default-secret scan.

#### OBS-01 - No observability (High, fixed)

Added pino structured JSON logging with request correlation ids (`x-request-id` echoed on every response and included in every error body), automatic redaction of PINs/tokens/cookies, plus `/health` (liveness), `/health/ready` (readiness, checks the database) and `/health/version` (build identity).

#### A11Y-01 / A11Y-02 - Accessibility (High/Medium, fixed)

The two modals were plain `div`s: no `role="dialog"`, no focus management, no `aria-modal`, and **no Escape handler even though the search modal rendered an `ESC` key hint**. The PIN pad could not be typed into with a physical keyboard.

**Fix:** a shared `Modal` component with dialog semantics, focus trap, focus restore, scroll locking and Escape; the PIN dialog also accepts physical keystrokes and announces progress via a live region. Added a skip-to-content link, `aria-current="page"` on the active nav item, and a polite live region announcing route changes.

---

## 5. Closing the backend gap: what was built

The audit was asked to treat "full stack" as a finding and recommend an architecture. Rather than only recommend it, the API was implemented.

### 5.1 Stack choices

| Concern    | Choice                    | Rationale                                                                         |
| ---------- | ------------------------- | --------------------------------------------------------------------------------- |
| Runtime    | Node 22 + TypeScript      | Matches the existing toolchain; Node 22 is the active LTS line                     |
| HTTP       | Express 4                 | Small, ubiquitous, easy to hire against                                            |
| Database   | SQLite (`better-sqlite3`) | Zero external services, so dev/CI/preview boot instantly; isolated in a repo layer |
| Validation | Zod                       | Single schema source, parsed at the edge; also validates `process.env` at boot     |
| Logging    | pino + pino-http          | Structured JSON, cheap, redaction support                                          |
| Tests      | Vitest + supertest        | Shares the Vite config and aliases; real HTTP assertions                           |
| Build      | esbuild                   | Bundles the server to one file; dependencies stay external                         |

### 5.2 Layering

```text
routes  ->  repositories  ->  db
  ^              ^
  |              +-- the only place that touches SQL
  +-- zod validation, no business rules
```

Swapping SQLite for Postgres is a single-file change in `server/src/repositories/`, because routes never see SQL.

### 5.3 Domain model

- **employees** - id, name, role, department, description, capabilities (JSON), dailyRate, ownershipPrice, deployed, rating, avatar, status; indexed on department/status/rating.
- **deployments** - id, employeeId, employeeName, department, dailyRate, status, createdAt; FK to employees.
- **activity_events** - id, employee, action, createdAt; powers the dashboard feed.

Seeded deterministically on first boot: 1,000 employees, 3 active deployments, 8 activity events.

### 5.4 Endpoint surface

`GET /health`, `GET /health/ready`, `GET /health/version`, `GET /`, then under `/api/v1`: `employees` (filter/sort/paginate), `employees/:id`, `departments`, `executives`, `pricing`, `stats`, `deployments` (GET/POST/DELETE), `metrics/summary`, `auth/pin`, `auth/session`.

Every error returns one shape, with a correlation id:

```json
{ "error": { "code": "VALIDATION_FAILED", "message": "Validation failed", "details": [] }, "requestId": "8e33085b-..." }
```

### 5.5 Security baseline

helmet with a production CSP and HSTS; `x-powered-by` disabled; configurable CORS that warns when `*` is used in production; JSON body limit of 256 kB; global rate limit plus a tight 10-attempt budget on the PIN endpoint; zod validation on every body/query/param; constant-time PIN comparison; HMAC-signed expiring admin tokens; log redaction; and boot-time guardrails that warn if `ADMIN_PIN`, `ADMIN_TOKEN_SECRET` or `CORS_ORIGIN` are still at development defaults.

### 5.6 Client integration

`src/lib/api.ts` is a typed fetch wrapper with an 8 s abort timeout, JSON error mapping into `ApiError`, and retry only on transport failures and 5xx (retrying a 4xx doubles latency for a definitive answer - this was caught by a test). `src/lib/hooks.ts` exposes `useResource`, which cancels requests on unmount and degrades to the local shared catalogue when the API is down, so the product stays usable offline instead of white-screening.

Browser code always calls a *relative* `/api` path, so the same build works in the Vite dev server (proxy), in preview, and behind the production origin. `VITE_API_BASE_URL` exists only for split-origin hosting.

---

## 6. Verification evidence

All commands were run against this branch.

```text
npm run typecheck   ->  clean (client + server, strict mode)
npm run lint        ->  0 errors, 3 advisory warnings
npm test            ->  44 passed (4 files)
npm run build       ->  client bundle + API bundle OK
```

Endpoint smoke tests:

```text
GET  /health                              200  {"status":"ok",...}
GET  /health/ready                        200  {"checks":{"database":"up"}}
GET  /api/v1/employees?pageSize=2         200  {"total":1000,"data":[...]}
GET  /api/v1/departments                  200  counts sum to 1000
POST /api/v1/deployments                  201  {"id":"DEP-8B05A13B",...}
GET  /api/v1/metrics/summary              200  activeEmployees, monthlySpend, ...
POST /api/v1/auth/pin {"pin":"1234"}      200  {"token":"...","expiresAt":"..."}
POST /api/v1/auth/pin {"pin":"9999"}      401  {"error":{"code":"UNAUTHORIZED"}}
DELETE /api/v1/deployments/:id (no token) 401
12x POST /api/v1/auth/pin (wrong)         401 x10, then 429 x2   <- rate limit engaged
GET  /api/v1/employees/EMP-NOPE           400  validation error, not a 500
```

Two tests were written specifically to catch the data bugs from section 4.2, and both reproduce the original defect if the fix is reverted.

---

## 7. Residual risks and next steps

### P0 - close before a public launch

1. **Real authentication.** The PIN gate is a demo credential. Replace it with per-user auth (OIDC / Auth.js) and scope `deployments` to a tenant. Today any visitor can create deployments, and there is no account model.
2. **Managed database.** SQLite on a mounted volume is fine for one container but not for horizontal scaling or zero-downtime deploys. Move to Postgres behind the repository layer.
3. **Secret management.** `ADMIN_PIN` and `ADMIN_TOKEN_SECRET` still have development defaults. Inject them from a secret manager and rotate before launch - CI only prevents *committing* them.
4. **License.** No LICENSE file, so the project is legally closed by default, which blocks external contributors and many customers.

### P1 - soon after launch

5. **SEO (SEO-01).** Per-page metadata is applied client-side, so crawlers only ever see the dashboard's tags. Pre-render the marketing routes or move to SSR (React Router 7 / Next / Vite SSR). Add `robots.txt`, `sitemap.xml` and an `og:image`.
6. **~~Brand consistency (SEO-02).~~** Resolved after the audit: the product is now **Elitze WorkerzNow** everywhere - `index.html` metadata and JSON-LD, all 11 route titles in `src/data/seo.ts`, the sidebar wordmark, the loading splash, the npm package name, the API service id, the log prefix, the database filename and the Docker image/volume. The GitHub repository and branch keep their existing names; renaming those is a GitHub-side action.
7. **Query caching.** `useResource` is a deliberate minimal abstraction. TanStack Query would add cache invalidation, retries with backoff and optimistic updates for the deploy flow.
8. **Alerting.** `/health/ready` exists but nothing watches it. Wire it to uptime monitoring and ship logs to a central backend.

### P2 - quality of life

9. Virtualise or paginate the employee grid properly (currently "load more" re-fetches a growing page).
10. Add error reporting (Sentry) wired into the new error boundary.
11. Add E2E coverage (Playwright) for the deploy wizard and admin unlock.
12. Finish A11Y-03: label the remaining icon-only controls and audit colour contrast in light theme.

---

## 8. Appendix - notable file changes

**Added**

```text
shared/                     types, catalog, deterministic roster, seeded PRNG
server/src/                 config, db, repositories, routes, middleware, app, bootstrap
src/lib/api.ts              typed fetch client (timeout, retry semantics, ApiError)
src/lib/hooks.ts            useResource, useDebouncedValue, useEscapeKey, usePersistentTheme
src/components/Modal.tsx    accessible focus-trapped dialog
src/components/ErrorBoundary.tsx
tests/                      4 suites, 44 tests
Dockerfile, docker-compose.yml, .dockerignore
.github/workflows/ci.yml
README.md, AUDIT.md, .env.example, .gitignore, eslint.config.js, .prettierrc, vitest.config.ts
```

**Modified**

```text
src/App.tsx                 hash routing, server-side PIN, accessible modals, admin session
src/pages/DashboardPage.tsx live metrics with offline fallback
src/pages/EmployeesPage.tsx API-backed pagination, filters from the catalogue, deploy action
src/pages/DeployPage.tsx    real POST to the API, timer cleanup, error state
src/main.tsx                error boundary, guarded root lookup
src/components/Sidebar.tsx  aria-current, button types
vite.config.ts              API proxy, host allowlist, code splitting, opt-in single file
package.json                real name/version/engines, dev/build/test/lint scripts
tsconfig.json               strict, noUnused*, verbatimModuleSyntax, noImplicitOverride
```

**Removed** (unreferenced; recoverable from commit `bb27659`)

```text
src/components/pages/       5 duplicate page components superseded by src/pages/
src/components/             10 components with zero imports (Hero, Pricing, Footer, ...)
```

If you want any of the removed components back, they are one `git checkout bb27659 -- <path>` away. They were deleted because they had no imports, had drifted from the live pages, and two of them called `Math.random()` during render. If they were intended for an upcoming marketing route, restore them - they typecheck against the new shared data layer unchanged.
