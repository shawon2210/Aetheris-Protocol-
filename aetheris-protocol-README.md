# Aetheris Protocol (NEBULA_OS)

Full-stack rebuild of the orbital HUD from the project brief:

- **`frontend/`** — Next.js 14 + TypeScript + Tailwind. Same visual design as
  the original mock, restructured into components, with live data instead of
  hardcoded markup.
- **`backend/`** — NestJS API, organized as Controller / Service / Model per
  feature (the closest mapping NestJS has to classic MVC).

```
┌─────────────────────┐        REST (JSON)        ┌──────────────────────┐
│   frontend (3000)    │ ───────────────────────▶ │    backend (4000)     │
│   Next.js + Three.js │ ◀─────────────────────── │   NestJS, /api/*       │
└─────────────────────┘                            └──────────────────────┘
```

## Quick start

Two terminals:

```bash
# Terminal 1 — API
cd backend
cp .env.example .env
npm install
npm run start:dev      # http://localhost:4000/api

# Terminal 2 — Web
cd frontend
cp .env.local.example .env.local
npm install
npm run dev             # http://localhost:3000
```

Open `http://localhost:3000`. The Earth simulation, HUD cards, and marquee
should all render with the Sector Status / Neural Archive / Network Latency
cards now pulling live(-ish, simulated) telemetry from the NestJS API instead
of static numbers.

## Verified before delivery

- `cd backend && npm install && npx nest build` — compiles clean.
- Backend booted and every route (`/health`, `/sectors`, `/sectors/:id`,
  `/archive`, `/archive/recalibrate`, `/system-status`, `/live-feed`,
  `/link/initialize`) was hit with `curl` and returned the expected envelope,
  including a 404 case.
- `cd frontend && npx tsc --noEmit` — zero type errors.
- `cd frontend && npx next build` — production build, static prerender, and
  Tailwind/Three.js bundling all succeed.

## Where to go from here

- Swap the in-memory NestJS services for a real data source — none of the
  controllers would need to change.
- If you want the sectors/marquee to push updates instead of being polled,
  the `live-feed` and `system-status` modules are natural candidates for a
  NestJS WebSocket gateway (`@nestjs/websockets`) instead of `GET` polling.
- Add auth in front of `POST /link/initialize` if "Tier-1 Operator" access
  should mean something real.
