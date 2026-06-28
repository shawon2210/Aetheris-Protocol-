'use client';

import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';

export function LiveDataStream() {
  const { data: events } = usePolling(api.getLiveFeed, 8000);
  const { data: status } = usePolling(api.getSystemStatus, 4000);

  const tickerText = (events ?? [])
    .map((event) => event.message)
    .join('... ');

  return (
    <GlassPanel className="col-span-12 p-4 md:p-6 flex items-center justify-between border-x-0 overflow-hidden bg-surface-container-low/70">
      <div className="flex items-center gap-4 md:gap-10 w-full max-w-5xl">
        <span className="font-label-mono text-[10px] md:text-[12px] text-primary font-bold whitespace-nowrap tracking-widest">
          LIVE_DATA //
        </span>
        <div className="font-data-readout text-[12px] md:text-[13px] text-primary/60 flex-1 overflow-hidden relative h-5 md:h-6">
          <div className="absolute inset-0 flex whitespace-nowrap animate-marquee">
            {tickerText || 'AWAITING_TELEMETRY...'}
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 lg:gap-12 pl-8 lg:pl-12 border-l border-outline-variant">
        <Link href="/system" className="no-underline">
          <div className="text-right hover:opacity-80 transition-opacity">
            <p className="font-label-mono text-[10px] text-primary/60 uppercase font-bold">
              Active Sessions
            </p>
            <p className="font-data-readout text-primary text-sm lg:text-base font-bold">
              {(status?.activeSessions ?? 1402).toLocaleString()}
            </p>
          </div>
        </Link>
        <Link href="/system" className="no-underline">
          <div className="text-right hover:opacity-80 transition-opacity">
            <p className="font-label-mono text-[10px] text-primary/60 uppercase font-bold">
              Thread Load
            </p>
            <p className="font-data-readout text-primary text-sm lg:text-base font-bold">
              {(status?.threadLoadPercent ?? 12.4).toFixed(1)}%
            </p>
          </div>
        </Link>
      </div>
    </GlassPanel>
  );
}
