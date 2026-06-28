# Aetheris Protocol — NEBULA_OS Frontend (Next.js + TypeScript)

The orbital command HUD from the project brief, rebuilt as a typed Next.js
(App Router) app. Visual output matches the original HTML mock; the static
mock data has been replaced with live calls to the NestJS API.

## Structure

```
src/
  app/
    layout.tsx       fonts, metadata, global frame accents
    page.tsx          composes the whole HUD
    globals.css       every custom class from the brief (glass-ui, hud-bracket, etc.)
  components/
    layout/           Header, Sidebar, Footer
    hud/               ChronosClock, NetworkLatencyIndicator, FrameAccents
    hero/              HeroModule (INITIALIZE LINK, wired to POST /link/initialize)
    dashboard/         NeuralArchiveCard, SectorStatusCard, LiveDataStream
    three/             EarthScene — the WebGL Earth simulation
    ui/                GlassPanel — shared glassmorphism card primitive
  lib/
    api.ts             typed fetch client for the backend
    usePolling.ts       small hook that re-fetches on an interval
  types/
    index.ts           types mirroring the backend's response shapes
```

## Running

```bash
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at the backend
npm install
npm run dev
```

Make sure the backend (`../backend`) is running on the URL in
`NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000/api`), or the HUD
cards will fall back to their static placeholder values.

## What's wired to the backend vs. local-only

- **Live**: Sector Status, Neural Archive (+ Recalibrate), Network Latency,
  Active Sessions / Thread Load, the LIVE_DATA marquee, Initialize Link.
- **Local-only**: the Chronos Sync clock (just `new Date()` ticking client-side
  — no server round trip needed for that).

## Notes on the Earth simulation

`EarthScene.tsx` ports the original vertex/fragment shaders verbatim into a
typed `useEffect`-managed Three.js scene. On unmount it disposes every
geometry/material and removes the renderer's canvas, so navigating away
doesn't leak a WebGL context.
