'use client';

import { EarthScene } from '@/components/three/EarthScene';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';
import { useSystemClock } from '@/lib/useSystemClock';

function Gauge({ label, value, max = 100, unit = '%' }: { label: string; value: number; max?: number; unit?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct > 80 ? 'bg-error' : pct > 50 ? 'bg-[#ffba20]' : 'bg-primary';
  return (
    <div className="glass-ui rounded-lg p-4 md:p-6 border-primary/10">
      <p className="font-label-mono text-[9px] md:text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-bold mb-1 md:mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1 md:gap-2 mb-2 md:mb-3">
        <span className="font-data-readout text-xl md:text-2xl lg:text-3xl font-light text-primary">
          {value.toFixed(1)}
        </span>
        <span className="font-label-mono text-[10px] md:text-[11px] text-primary/50 font-bold">{unit}</span>
      </div>
      <div className="w-full h-1.5 md:h-2 glass-ui rounded-full overflow-hidden border border-primary/10">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function SystemPage() {
  const { data } = usePolling(api.getSystemStatus, 4000);
  const { time, date } = useSystemClock();
  const bars = data?.signalBars ?? [1, 0.9, 0.4, 0.15];
  const latency = data?.networkLatencyMs ?? 12.4;
  const sessions = data?.activeSessions ?? 1402;
  const threadLoad = data?.threadLoadPercent ?? 12.4;

  return (
    <>
      <EarthScene />
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
      </div>
      <Header />
      <Sidebar />

      <main className="relative z-10 min-h-screen pl-0 md:pl-32 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white font-bold">
                SYSTEM STATUS
              </h1>
              <p className="font-label-mono text-[10px] md:text-[11px] text-primary/70 tracking-[0.3em] uppercase font-bold mt-1">
                Chronos Sync // {date} {time}
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary digital-pulse shrink-0" />
              <span className="font-label-mono text-[9px] md:text-[11px] text-primary/60 font-bold uppercase tracking-wider">
                All Systems Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            <Gauge label="Thread Load" value={threadLoad} unit="%" />
            <Gauge label="Active Sessions" value={sessions} max={5000} unit="sessions" />
            <div className="glass-ui rounded-lg p-4 md:p-6 border-primary/10">
              <p className="font-label-mono text-[9px] md:text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-bold mb-1 md:mb-2">
                Network Latency
              </p>
              <div className="flex items-baseline gap-1 md:gap-2 mb-2 md:mb-3">
                <span className="font-data-readout text-xl md:text-2xl lg:text-3xl font-light text-primary">
                  {latency.toFixed(1)}
                </span>
                <span className="font-label-mono text-[10px] md:text-[11px] text-primary/50 font-bold">ms</span>
              </div>
              <div className="flex gap-1.5 md:gap-2">
                {bars.map((opacity, i) => (
                  <div
                    key={i}
                    className="flex-1 h-6 md:h-8 bg-primary transition-all"
                    style={{ opacity }}
                  />
                ))}
              </div>
            </div>
          </div>

          <GlassPanel className="p-4 md:p-6 lg:p-8">
            <h2 className="font-headline-lg text-base md:text-lg text-white font-bold mb-4 md:mb-6">
              Signal Diagnostics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-label-mono text-[9px] md:text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-bold">
                  Signal Bars
                </h3>
                <div className="space-y-1.5 md:space-y-2">
                  {bars.map((opacity, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-4">
                      <span className="font-label-mono text-[9px] md:text-[10px] text-on-surface-variant/40 w-8 md:w-12 font-bold shrink-0">
                        CH-{i + 1}
                      </span>
                      <div className="flex-1 h-1.5 md:h-2 glass-ui rounded-full overflow-hidden border border-primary/10">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${opacity * 100}%`, opacity: Math.max(0.2, opacity) }}
                        />
                      </div>
                      <span className="font-data-readout text-[9px] md:text-[11px] text-primary/50 w-8 md:w-10 text-right shrink-0">
                        {(opacity * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-label-mono text-[9px] md:text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-bold">
                  System Metrics
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center py-2 md:py-3 border-b border-outline-variant/30">
                    <span className="font-label-mono text-[10px] md:text-[11px] text-on-surface-variant/60 uppercase font-bold">Uptime</span>
                    <span className="font-data-readout text-[10px] md:text-xs text-primary">142d 7h 32m</span>
                  </div>
                  <div className="flex justify-between items-center py-2 md:py-3 border-b border-outline-variant/30">
                    <span className="font-label-mono text-[10px] md:text-[11px] text-on-surface-variant/60 uppercase font-bold">Memory Usage</span>
                    <span className="font-data-readout text-[10px] md:text-xs text-primary">1.8 / 8.0 GB</span>
                  </div>
                  <div className="flex justify-between items-center py-2 md:py-3 border-b border-outline-variant/30">
                    <span className="font-label-mono text-[10px] md:text-[11px] text-on-surface-variant/60 uppercase font-bold">Packets Received</span>
                    <span className="font-data-readout text-[10px] md:text-xs text-primary">12.4M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 md:py-3">
                    <span className="font-label-mono text-[10px] md:text-[11px] text-on-surface-variant/60 uppercase font-bold">Error Rate</span>
                    <span className="font-data-readout text-[10px] md:text-xs text-primary">0.02%</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </main>

      <Footer />
    </>
  );
}
