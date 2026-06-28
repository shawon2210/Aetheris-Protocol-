'use client';

import { useState } from 'react';
import { EarthScene } from '@/components/three/EarthScene';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';
import type { ArchiveStats } from '@/types';

function StatCard({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="glass-ui rounded-lg p-4 md:p-6 border-primary/10">
      <p className="font-label-mono text-[9px] md:text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-bold mb-1 md:mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1 md:gap-2 flex-wrap">
        <span className="font-data-readout text-lg md:text-2xl lg:text-3xl text-primary font-light break-all">
          {value}
        </span>
        {unit && (
          <span className="font-label-mono text-[10px] md:text-[11px] text-primary/50 font-bold">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ArchivePage() {
  const { data } = usePolling(api.getArchiveStats, 10000);
  const [recalibrating, setRecalibrating] = useState(false);
  const [override, setOverride] = useState<ArchiveStats | null>(null);

  const stats = override ?? data;

  const handleRecalibrate = async () => {
    setRecalibrating(true);
    try {
      const result = await api.recalibrateArchive();
      setOverride(result);
    } finally {
      setRecalibrating(false);
    }
  };

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
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-14 lg:w-16 md:h-14 lg:h-16 glass-ui flex items-center justify-center border-primary/30 bg-surface-bright/30 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-primary scale-110 md:scale-150">
                  neurology
                </span>
              </div>
              <div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white font-bold">
                  NEURAL ARCHIVE
                </h1>
                <p className="font-label-mono text-[10px] md:text-[11px] text-primary/70 tracking-[0.3em] uppercase font-bold mt-1">
                  Memory Index // Sec-42
                </p>
              </div>
            </div>
            <span className="font-data-readout text-[10px] md:text-xs text-primary/50">
              [{stats?.archiveId ?? 'ARC-SYST-42-0'}]
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
            <StatCard
              label="Load Density"
              value={(stats?.loadDensityEb ?? 1.28).toFixed(2)}
              unit="EB"
            />
            <StatCard
              label="Encryption"
              value={stats?.encryptionCipher ?? 'AES-X'}
              unit={stats?.encryptionTier ?? 'G9'}
            />
            <StatCard
              label="Active Nodes"
              value={(stats?.nodeCount ?? 14209).toLocaleString()}
            />
            <StatCard
              label="System Status"
              value="ONLINE"
            />
          </div>

          <GlassPanel className="p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
            <h2 className="font-headline-lg text-base md:text-lg text-white font-bold mb-4 md:mb-6">
              Load Distribution
            </h2>
            <div className="space-y-3 md:space-y-4">
              {(stats?.loadSegments ?? [0.6, 0.5, 0.3, 0.1]).map((value, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-4">
                  <span className="font-label-mono text-[9px] md:text-[11px] text-on-surface-variant/60 w-12 md:w-16 uppercase font-bold shrink-0">
                    Node-{String.fromCharCode(65 + i)}
                  </span>
                  <div className="flex-1 h-2 md:h-3 glass-ui rounded-full overflow-hidden border border-primary/10">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.max(5, value * 100)}%`, opacity: Math.max(0.3, value) }}
                    />
                  </div>
                  <span className="font-data-readout text-[10px] md:text-xs text-primary/70 w-8 md:w-10 text-right shrink-0">
                    {(value * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleRecalibrate}
              disabled={recalibrating}
              className="group relative px-8 md:px-14 py-4 md:py-5 bg-primary/10 border border-primary/60 hover:border-primary transition-all overflow-hidden backdrop-blur-2xl disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative z-10 font-label-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-primary font-bold">
                {recalibrating ? 'RECALIBRATING...' : 'RECALIBRATE ARCHIVE'}
              </span>
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-br" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
