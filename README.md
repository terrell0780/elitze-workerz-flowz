# Zevanto

Autonomous AI-workforce platform: a React + TypeScript client and a Node/Express API sharing a single typed domain module.

> This repository was audited for full-stack production readiness. See [`AUDIT.md`](./AUDIT.md) for every finding, its severity, and what was remediated.

---

## Architecture

```
   Browser  --->  Vite dev server (:5173)
                    - serves the React client
                    - proxies /api/* and /health to the API
                            |
                            v
                  Express API (:4000)
                    helmet - cors - compression - rate limit - request id - pino
                    /health  /health/ready  /health/version
                    /api/v1/employees   /api/v1/departments
                    /api/v1/deployments /api/v1/metrics/summary
                    /api/v1/auth/pin  (PIN -> short-lived HMAC token)
                    repository layer --> SQLite (better-sqlite3)
                            ^
                            | imports the same types + catalogue
                     /shared (TypeScript)
                       types - catalog - roster - rng
                            ^
                            | imports
                     React client
```

**Key principle:** `/shared` is the single source of truth for types, the department catalogue and roster generation. The client and the API compile against the same contract, so they cannot drift apart.

---

## Quick start

Requires **Node 22+**.

```bash
npm install
cp .env.example .env      # optional - all values have safe development defaults
npm run dev
```

- Web client: http://localhost:5173
- API: http://localhost:4000 (health: http://localhost:4000/health)

The API seeds itself on first boot with a 1,000-employee roster, three active deployments and an activity feed.

### Production

```bash
npm run build     # typecheck + client bundle + server bundle
npm start         # serves the API on :4000 and the compiled client from the same origin
```

### Docker

```bash
docker compose up --build        # http://localhost:4000
docker compose --profile dev up  # also starts the Vite dev server on :5173
```

---

## Scripts

| Script                  | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `npm run dev`           | API (tsx watch) + Vite dev server with `/api` proxy   |
| `npm run build`         | Typecheck, client bundle, server bundle               |
| `npm start`             | Run the built API (also serves the client in prod)    |
| `npm run typecheck`     | `tsc --noEmit` for client and server                  |
| `npm run lint`          | ESLint (TypeScript + React hooks rules)               |
| `npm run format`        | Prettier                                              |
| `npm test`              | Vitest: shared domain, API integration, auth, client  |
| `npm run test:coverage` | Coverage report                                       |
| `npm run verify`        | lint - typecheck - test - build (the CI pipeline)     |

---

## Project layout

```
shared/          Domain contract + catalogue + deterministic roster generator
  types.ts       Shared API/domain types
  catalog.ts     Departments, roles, capabilities, pricing, executive AIs
  employees.ts   Roster generation, filtering, sorting, pagination
  rng.ts         Seeded PRNG (replaces Math.random)

server/src/
  index.ts       HTTP bootstrap + graceful shutdown
  app.ts         Middleware chain, routing, static client in production
  config/env.ts  Zod-validated environment + deployment guardrails
  db/            SQLite connection, migrations, deterministic seed
  repositories/  The only layer that touches SQL
  routes/        health - catalog - employees - deployments - metrics - auth
  middleware/    request id, logging, validation, admin auth, errors

src/             React client
  App.tsx        Hash routing, theme, admin session, modals
  lib/api.ts     Typed fetch client (timeouts, retries, ApiError)
  lib/hooks.ts   useResource (loading/error/fallback), debounce, theme
  components/    Sidebar, PageHeader, Modal (focus-trapped), ErrorBoundary
  pages/         Dashboard, Employees, Deploy, Analytics, Billing, ...
```

---

## API

Base path `/api/v1`. Error responses use one shape:

```json
{ "error": { "code": "NOT_FOUND", "message": "Employee EMP-9999 not found" }, "requestId": "..." }
```

| Method   | Endpoint                          | Notes                                                                         |
| -------- | --------------------------------- | ----------------------------------------------------------------------------- |
| `GET`    | `/health`                         | Liveness - never touches dependencies                                         |
| `GET`    | `/health/ready`                   | Readiness - includes a live database check                                    |
| `GET`    | `/health/version`                 | Version, commit, build id                                                     |
| `GET`    | `/employees`                      | `q`, `department`, `status`, `minRating`, `sort`, `order`, `page`, `pageSize` |
| `GET`    | `/employees/:id`                  | `EMP-0001` format                                                             |
| `GET`    | `/departments`                    | Counts computed from the roster                                               |
| `GET`    | `/executives` `/pricing` `/stats` | Shared catalogue                                                              |
| `GET`    | `/deployments`                    | Optional `?status=`                                                           |
| `POST`   | `/deployments`                    | `{ employeeId, department?, status? }`                                        |
| `DELETE` | `/deployments/:id`                | **Admin token required**                                                      |
| `GET`    | `/metrics/summary`                | Dashboard KPIs derived from persisted state                                   |
| `POST`   | `/auth/pin`                       | Exchanges the PIN for a short-lived HMAC token                                |
| `GET`    | `/auth/session`                   | Validates an admin token                                                      |

```bash
curl 'http://localhost:4000/api/v1/employees?department=Sales&sort=rating&order=desc&pageSize=3'
```

---

## Configuration

Copy `.env.example` to `.env`. Every value is validated at boot by Zod; invalid configuration fails fast with a precise message. The server also logs a warning at startup if production defaults (`ADMIN_PIN`, `ADMIN_TOKEN_SECRET`, `CORS_ORIGIN=*`) were not changed.

| Variable                  | Default            | Notes                                    |
| ------------------------- | ------------------ | ---------------------------------------- |
| `PORT` / `HOST`           | `4000` / `0.0.0.0` | API bind address                         |
| `DATABASE_FILE`           | `.data/zevanto.db` | `:memory:` for ephemeral/test runs       |
| `ADMIN_PIN`               | `1234`             | **Change before deploying**              |
| `ADMIN_TOKEN_SECRET`      | dev default        | `openssl rand -hex 32`                   |
| `ADMIN_TOKEN_TTL_SECONDS` | `3600`             | Admin session lifetime                   |
| `CORS_ORIGIN`             | `*`                | Restrict in production                   |
| `RATE_LIMIT_MAX`          | `1000` / 15 min    | Global API budget                        |
| `AUTH_RATE_LIMIT_MAX`     | `10` / 15 min      | PIN attempt budget                       |
| `VITE_API_BASE_URL`       | _(empty)_          | Empty = same-origin `/api` (recommended) |

---

## Accessibility & resilience

- Routing is URL-based (`#/employees`) so pages are linkable and the back button works.
- Dialogs use `role="dialog"` with focus trapping, focus restore and Escape handling.
- A skip link, `aria-current` nav state and a live region announcing route changes are included.
- An error boundary catches render failures instead of blanking the screen.
- If the API is unreachable, pages fall back to the shared local catalogue and label themselves as offline.

---

## Roadmap (carried over from the audit)

1. Replace the demo PIN gate with real accounts (OIDC/Auth.js) and per-tenant data scoping.
2. Move to Postgres behind the repository layer and add migration tooling.
3. Add server-rendered or pre-rendered marketing routes for real SEO.
4. Introduce TanStack Query for cache invalidation and optimistic updates.
5. Ship structured logs and metrics to an observability backend; alert on `/health/ready`.
