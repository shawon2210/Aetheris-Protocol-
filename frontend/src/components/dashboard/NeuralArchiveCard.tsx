'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';

export function NeuralArchiveCard() {
  const { data } = usePolling(api.getArchiveStats, 10000);
  const [recalibrating, setRecalibrating] = useState(false);
  const [override, setOverride] = useState<typeof data>(null);

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

  const segments = stats?.loadSegments ?? [0.6, 0.5, 0.3, 0.1];

  return (
    <GlassPanel
      bracket="tl"
      hoverable
      className="p-6 md:p-10 bg-surface-container-low/50"
    >
      <div className="flex justify-between items-start mb-6 md:mb-10">
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <div className="w-10 h-10 md:w-16 md:h-16 glass-ui flex items-center justify-center border-primary/30 bg-surface-bright/30 rounded-lg shrink-0">
            <span className="material-symbols-outlined text-primary scale-110 md:scale-150">
              neurology
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white font-bold truncate">
              NEURAL ARCHIVE
            </h3>
            <p className="font-label-mono text-[9px] md:text-[11px] text-primary/70 tracking-widest uppercase font-bold truncate">
              Memory Index // Sec-42
            </p>
          </div>
        </div>
        <div className="hidden sm:block font-data-readout text-[10px] md:text-[12px] text-primary/60 font-bold shrink-0">
          [{stats?.archiveId ?? 'ARC-SYST-42-0'}]
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-10">
        <div className="space-y-1 md:space-y-3">
          <p className="font-label-mono text-[9px] md:text-[11px] text-on-surface-variant/80 uppercase tracking-tight font-bold">
            Load Density
          </p>
          <div className="flex items-baseline gap-1 md:gap-2 flex-wrap">
            <span className="font-data-readout text-base md:text-xl lg:text-3xl text-primary font-light">
              {(stats?.loadDensityEb ?? 1.28).toFixed(2)}
            </span>
            <span className="font-label-mono text-[9px] md:text-[12px] text-primary/60 font-bold">
              EB
            </span>
          </div>
        </div>
        <div className="space-y-1 md:space-y-3">
          <p className="font-label-mono text-[9px] md:text-[11px] text-on-surface-variant/80 uppercase tracking-tight font-bold">
            Encryption
          </p>
          <div className="flex items-baseline gap-1 md:gap-2 flex-wrap">
            <span className="font-data-readout text-base md:text-xl lg:text-3xl text-primary font-light break-all">
              {stats?.encryptionCipher ?? 'AES-X'}
            </span>
            <span className="font-label-mono text-[9px] md:text-[12px] text-primary/60 font-bold">
              {stats?.encryptionTier ?? 'G9'}
            </span>
          </div>
        </div>
        <div className="space-y-1 md:space-y-3">
          <p className="font-label-mono text-[9px] md:text-[11px] text-on-surface-variant/80 uppercase tracking-tight font-bold">
            Nodes
          </p>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="font-data-readout text-base md:text-xl lg:text-3xl text-primary font-light">
              {(stats?.nodeCount ?? 14209).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-10 pt-6 md:pt-10 border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-1.5 md:gap-2 h-1 md:h-1.5 flex-1 max-w-[150px] md:max-w-[300px]">
          {segments.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-primary"
              style={{ opacity: Math.max(0.1, value) }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/archive"
            className="font-label-mono text-[10px] md:text-[11px] text-primary/50 hover:text-primary transition-colors uppercase tracking-wider no-underline"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={handleRecalibrate}
            disabled={recalibrating}
            className="font-label-mono text-[10px] md:text-[12px] text-primary/80 hover:text-primary transition-colors flex items-center gap-2 md:gap-3 font-bold uppercase tracking-widest disabled:opacity-50"
          >
            <span className="hidden sm:inline">{recalibrating ? 'RECALIBRATING' : 'RECALIBRATE'}</span>
            <span className="sm:hidden">{recalibrating ? '...' : 'RECAL'}</span>
            <span className="material-symbols-outlined text-[14px] md:text-[18px]">
              refresh
            </span>
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}
