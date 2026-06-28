'use client';

import { api } from '@/lib/api';
import { usePolling } from '@/lib/usePolling';

export function NetworkLatencyIndicator() {
  const { data } = usePolling(api.getSystemStatus, 4000);
  const bars = data?.signalBars ?? [1, 0.9, 0.4, 0.15];
  const latency = data?.networkLatencyMs ?? 12.4;

  return (
    <div className="fixed bottom-6 md:bottom-12 right-5 md:right-margin-desktop z-30 pointer-events-none text-right">
      <div className="font-label-mono text-[10px] text-primary/80 uppercase tracking-[0.25em] mb-2 font-bold">
        Network Latency
      </div>
      <div className="flex items-center gap-3 justify-end">
        <div className="flex gap-1">
          {bars.map((opacity, index) => (
            <div
              key={index}
              className="w-2 md:w-2.5 h-4 md:h-5 bg-primary"
              style={{ opacity }}
            />
          ))}
        </div>
        <span className="font-data-readout text-xs md:text-[14px] text-primary font-bold">
          {latency.toFixed(1)}ms
        </span>
      </div>
    </div>
  );
}
