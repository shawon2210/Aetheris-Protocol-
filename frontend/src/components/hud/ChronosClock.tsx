'use client';

import { useEffect, useState } from 'react';

function formatClock(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
  return `${h}:${m}:${s}:${ms}`;
}

export function ChronosClock() {
  const [label, setLabel] = useState('00:00:00:00');

  useEffect(() => {
    const id = setInterval(() => setLabel(formatClock(new Date())), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-24 md:top-28 right-5 md:right-margin-desktop z-30 pointer-events-none text-right">
      <div className="font-label-mono text-[10px] text-primary/80 uppercase tracking-[0.25em] mb-1 font-bold">
        Chronos Sync
      </div>
      <div className="font-data-readout text-primary glow-text-subtle text-lg md:text-2xl font-light">
        {label}
      </div>
    </div>
  );
}
