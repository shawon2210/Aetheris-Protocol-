'use client';

import { useState } from 'react';
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
      className="col-span-12 md:col-span-8 p-10 bg-surface-container-low/50"
    >
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 glass-ui flex items-center justify-center border-primary/30 bg-surface-bright/30 rounded-lg">
            <span className="material-symbols-outlined text-primary scale-[1.5]">
              neurology
            </span>
          </div>
          <div>
            <h3 className="font-headline-lg text-headline-lg text-white font-bold">
              NEURAL ARCHIVE
            </h3>
            <p className="font-label-mono text-[11px] text-primary/70 tracking-widest uppercase font-bold">
              Memory Index // Sec-42
            </p>
          </div>
        </div>
        <div className="font-data-readout text-[12px] text-primary/60 font-bold">
          [{stats?.archiveId ?? 'ARC-SYST-42-0'}]
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="space-y-3">
          <p className="font-label-mono text-[11px] text-on-surface-variant/80 uppercase tracking-tight font-bold">
            Load Density
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-data-readout text-3xl text-primary font-light">
              {(stats?.loadDensityEb ?? 1.28).toFixed(2)}
            </span>
            <span className="font-label-mono text-[12px] text-primary/60 font-bold">
              EB
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-label-mono text-[11px] text-on-surface-variant/80 uppercase tracking-tight font-bold">
            Encryption
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-data-readout text-3xl text-primary font-light">
              {stats?.encryptionCipher ?? 'AES-X'}
            </span>
            <span className="font-label-mono text-[12px] text-primary/60 font-bold">
              {stats?.encryptionTier ?? 'G9'}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-label-mono text-[11px] text-on-surface-variant/80 uppercase tracking-tight font-bold">
            Nodes
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-data-readout text-3xl text-primary font-light">
              {(stats?.nodeCount ?? 14209).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-outline-variant flex items-center justify-between">
        <div className="flex gap-2 h-1.5 flex-1 max-w-[300px]">
          {segments.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-primary"
              style={{ opacity: Math.max(0.1, value) }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleRecalibrate}
          disabled={recalibrating}
          className="font-label-mono text-[12px] text-primary/80 hover:text-primary transition-colors flex items-center gap-3 font-bold uppercase tracking-widest disabled:opacity-50"
        >
          {recalibrating ? 'RECALIBRATING' : 'RECALIBRATE'}
          <span className="material-symbols-outlined text-[18px]">
            refresh
          </span>
        </button>
      </div>
    </GlassPanel>
  );
}
