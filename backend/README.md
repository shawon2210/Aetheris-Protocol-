# Aetheris Protocol — NEBULA_OS API (NestJS)

Telemetry backend for the Aetheris Protocol HUD. Built with NestJS, organized
in an MVC-style layout per feature:

- **Model** — `*/models/*.model.ts`: plain data shapes, no framework code.
- **Controller** — `*.controller.ts`: HTTP routes only, delegates to a service.
- **Service** — `*.service.ts`: business logic and state.

NestJS itself doesn't enforce classic MVC (it's module/DI-based), but this
structure maps onto it closely and keeps each concern in its own file.

## Modules

| Module          | Route                       | Backs                                  |
|-----------------|------------------------------|-----------------------------------------|
| `sectors`       | `GET /api/sectors`          | Sector Status card                      |
| `archive`       | `GET /api/archive`          | Neural Archive card                     |
|                 | `POST /api/archive/recalibrate` | "RECALIBRATE" button               |
| `system-status` | `GET /api/system-status`    | Chronos latency bars, sessions, thread load |
| `live-feed`     | `GET /api/live-feed`        | Bottom LIVE_DATA marquee                |
| `link`          | `POST /api/link/initialize` | "INITIALIZE LINK" hero CTA              |
| (root)          | `GET /api/health`           | Health check                            |

Every response is wrapped in a consistent envelope by a global interceptor:

```json
{ "success": true, "timestamp": "...", "data": { ... } }
```

Errors go through a global exception filter and come back as:

```json
{ "success": false, "timestamp": "...", "path": "...", "statusCode": 404, "error": "..." }
```

## Running

```bash
cp .env.example .env
npm install
npm run start:dev
```

The API listens on `http://localhost:4000/api` by default (`PORT` in `.env`).
`FRONTEND_ORIGIN` controls the CORS allow-list — set it to wherever the
Next.js app is running.

## Notes

- Telemetry (load density, latency, sector state) is intentionally randomized
  within plausible ranges on each request, so the HUD feels "live" when the
  frontend polls it. Swap the in-memory services for a real data source
  (database, message bus, actual sensors) without touching the controllers.
