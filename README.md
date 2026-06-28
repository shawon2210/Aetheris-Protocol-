# Aetheris Protocol — NEBULA_OS

A full-stack orbital command HUD built with **Next.js 14** (frontend) and **NestJS** (backend). Features a real-time WebGL Earth simulation, live-polling telemetry dashboard, and a cyberpunk NEBULA_OS interface.

![Tech Stack](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![Tech Stack](https://img.shields.io/badge/NestJS-10.4-red?logo=nestjs)
![Tech Stack](https://img.shields.io/badge/Three.js-0.185-lightgrey?logo=threedotjs)
![Tech Stack](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Tech Stack](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)

## Architecture

```
┌─────────────────────┐        REST (JSON)        ┌──────────────────────┐
│   frontend (3000)    │ ───────────────────────▶ │    backend (4000)     │
│   Next.js + Three.js │ ◀─────────────────────── │   NestJS, /api/*       │
└─────────────────────┘                            └──────────────────────┘
```

## Quick Start

```bash
# Terminal 1 — Backend API
cd backend
cp .env.example .env
npm install
npm run start:dev      # → http://localhost:4000/api

# Terminal 2 — Frontend
cd frontend
cp .env.local.example .env.local
npm install
npm run dev             # → http://localhost:3000
```

## API Modules

| Module          | Route                          | HUD Component              |
|-----------------|--------------------------------|----------------------------|
| `sectors`       | `GET /api/sectors?status=`     | Sector Status card         |
| `archive`       | `GET /api/archive`             | Neural Archive card        |
|                 | `POST /api/archive/recalibrate`| "RECALIBRATE" button       |
| `system-status` | `GET /api/system-status`       | Chronos / Latency / Threads|
| `live-feed`     | `GET /api/live-feed`           | LIVE_DATA marquee          |
| `link`          | `POST /api/link/initialize`    | Hero CTA button            |
| `terminal`      | `GET /api/terminal`            | Command terminal           |
|                 | `POST /api/terminal/command`   | Execute terminal command   |
| (root)          | `GET /api/health`              | Health check               |

All responses are wrapped in a consistent envelope:
```json
{ "success": true, "timestamp": "2026-06-29T...", "data": { ... } }
```

## Frontend Structure

```
frontend/src/
  app/               layout, page, global styles
  components/
    layout/          Header, Sidebar, Footer
    hud/             ChronosClock, NetworkLatencyIndicator, FrameAccents
    hero/            HeroModule (INITIALIZE LINK)
    dashboard/       NeuralArchiveCard, SectorStatusCard, LiveDataStream
    three/           EarthScene (WebGL Earth with shaders)
    ui/              GlassPanel (reusable glassmorphism card)
  lib/               api.ts, usePolling.ts, useSystemClock.ts, config.ts
  types/             TypeScript interfaces mirroring backend models
```

## Tech Stack

- **Frontend:** Next.js 14.2, React 18, TypeScript, Tailwind CSS 3.4, Three.js 0.185
- **Backend:** NestJS 10.4, TypeScript, class-transformer/class-validator
- **Pattern:** MVC-style (Model → Controller → Service per feature)

## Project Brief

This project was built from a design brief that included an HTML mockup with:
- A 3D Earth simulation with custom vertex/fragment shaders
- HUD-style UI with glassmorphism cards, scanlines, and frame brackets
- Real-time sector status, archive telemetry, and system monitoring
- A terminal interface for executing commands
