'use client';

import { EarthScene } from '@/components/three/EarthScene';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';
import type { SectorState } from '@/types';

const DOT_CLASS: Record<SectorState, string> = {
  STABLE: 'bg-primary shadow-[0_0_12px_#00f0ff]',
  WARNING: 'bg-[#ffba20] shadow-[0_0_12px_#ffba20]',
  ERROR: 'bg-error shadow-[0_0_12px_#ffb4ab]',
};

const TEXT_CLASS: Record<SectorState, string> = {
  STABLE: 'text-primary',
  WARNING: 'text-[#ffba20]',
  ERROR: 'text-error',
};

const BG_CLASS: Record<SectorState, string> = {
  STABLE: 'bg-primary/5 border-primary/20',
  WARNING: 'bg-[#ffba20]/5 border-[#ffba20]/20',
  ERROR: 'bg-error/5 border-error/20',
};

const SECTORS_INFO: Record<string, { region: string; nodes: number; desc: string }> = {
  orion_belt: { region: 'QUADRANT-7G', nodes: 4821, desc: 'Primary resource extraction zone. All automated harvesters operational.' },
  alpha_7: { region: 'QUADRANT-3A', nodes: 6310, desc: 'Research and development sector. Deep-space telemetry array active.' },
  void_core: { region: 'QUADRANT-0V', nodes: 3078, desc: 'Experimental void-energy containment. Anomaly levels within acceptable thresholds.' },
};

export default function SectorsPage() {
  const { data } = usePolling(api.getSectors, 5000);
  const sectors = data ?? [];
  const filterOptions: (SectorState | 'ALL')[] = ['ALL', 'STABLE', 'WARNING', 'ERROR'];

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
                SECTOR STATUS
              </h1>
              <p className="font-label-mono text-[10px] md:text-[11px] text-primary/70 tracking-[0.3em] uppercase font-bold mt-1">
                Real-time telemetry // Auto-sync enabled
              </p>
            </div>
            <div className="flex gap-1.5 md:gap-2 flex-wrap">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="px-3 md:px-4 py-1.5 md:py-2 border border-outline-variant text-label-mono font-label-mono text-[10px] md:text-[11px] uppercase tracking-wider text-on-surface-variant hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sectors.map((sector) => {
              const info = SECTORS_INFO[sector.id] ?? { region: 'UNKNOWN', nodes: 0, desc: '' };
              return (
                <GlassPanel
                  key={sector.id}
                  bracket="both"
                  hoverable
                  className={`p-6 md:p-8 flex flex-col ${BG_CLASS[sector.state]}`}
                >
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-2.5 h-2.5 md:w-3 md:h-3 digital-pulse rounded-full ${DOT_CLASS[sector.state]}`} />
                      <h2 className="font-headline-lg text-lg md:text-headline-lg text-white font-bold">
                        {sector.name}
                      </h2>
                    </div>
                    <span className={`font-data-readout text-xs md:text-sm font-bold ${TEXT_CLASS[sector.state]}`}>
                      {sector.statusCode}
                    </span>
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between text-label-mono font-label-mono text-[10px] md:text-[11px] uppercase tracking-wider">
                      <span className="text-on-surface-variant/60">Region</span>
                      <span className="text-primary/80">{info.region}</span>
                    </div>
                    <div className="flex justify-between text-label-mono font-label-mono text-[10px] md:text-[11px] uppercase tracking-wider">
                      <span className="text-on-surface-variant/60">Active Nodes</span>
                      <span className="text-primary/80">{info.nodes.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="font-body-md text-xs md:text-sm text-on-surface-variant/70 leading-relaxed mt-auto">
                    {info.desc}
                  </p>
                </GlassPanel>
              );
            })}
          </div>

          {sectors.length === 0 && (
            <div className="text-center py-16 md:py-20">
              <p className="font-data-readout text-sm md:text-base text-primary/50">AWAITING SECTOR DATA...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
