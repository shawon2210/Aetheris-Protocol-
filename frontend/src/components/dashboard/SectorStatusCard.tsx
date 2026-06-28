'use client';

import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';
import type { Sector } from '@/types';

const DEFAULT_SECTORS: Sector[] = [
  { id: 'orion_belt', name: 'ORION_BELT', state: 'STABLE', statusCode: 'STABLE' },
  { id: 'alpha_7', name: 'ALPHA_7', state: 'STABLE', statusCode: 'STABLE' },
  { id: 'void_core', name: 'VOID_CORE', state: 'ERROR', statusCode: 'ERR_0X' },
];

const DOT_CLASS: Record<Sector['state'], string> = {
  STABLE: 'bg-primary shadow-[0_0_12px_#00f0ff]',
  WARNING: 'bg-tertiary-fixed-dim shadow-[0_0_12px_#ffba20]',
  ERROR: 'bg-error shadow-[0_0_12px_#ffb4ab]',
};

const TEXT_CLASS: Record<Sector['state'], string> = {
  STABLE: 'text-primary',
  WARNING: 'text-tertiary-fixed-dim',
  ERROR: 'text-error',
};

const HOVER_TEXT_CLASS: Record<Sector['state'], string> = {
  STABLE: 'group-hover/row:text-primary',
  WARNING: 'group-hover/row:text-tertiary-fixed-dim',
  ERROR: 'group-hover/row:text-error',
};

export function SectorStatusCard() {
  const { data } = usePolling(api.getSectors, 5000);
  const sectors = data ?? DEFAULT_SECTORS;

  return (
    <GlassPanel
      bracket="br"
      hoverable
      className="col-span-12 md:col-span-4 p-6 md:p-10 flex flex-col bg-surface-container-low/50"
    >
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white font-bold">
          SECTOR STATUS
        </h3>
        <Link
          href="/sectors"
          className="font-label-mono text-[10px] text-primary/50 hover:text-primary transition-colors uppercase tracking-wider no-underline"
        >
          View All
        </Link>
      </div>
      <div className="flex-1 space-y-6 md:space-y-8">
        {sectors.slice(0, 3).map((sector) => (
          <div
            key={sector.id}
            className="flex justify-between items-center group/row"
          >
            <div className="flex items-center gap-4 md:gap-5">
              <div
                className={`w-2 h-2 md:w-2.5 md:h-2.5 digital-pulse rounded-full ${DOT_CLASS[sector.state]}`}
              />
              <span
                className={`font-label-mono text-[12px] md:text-[13px] text-white/80 transition-colors font-bold ${HOVER_TEXT_CLASS[sector.state]}`}
              >
                {sector.name}
              </span>
            </div>
            <span
              className={`font-data-readout text-[12px] md:text-[13px] font-bold ${TEXT_CLASS[sector.state]}`}
            >
              {sector.statusCode}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/terminal"
        className="mt-6 md:mt-10 py-4 border border-primary/20 hover:border-primary/60 transition-colors font-label-mono text-[11px] tracking-[0.3em] uppercase font-bold text-primary/70 hover:text-primary bg-primary/5 block text-center no-underline"
      >
        Open Terminal
      </Link>
    </GlassPanel>
  );
}
