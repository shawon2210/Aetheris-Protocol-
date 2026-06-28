'use client';

import { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { api } from '@/lib/api';
import type { LinkSession } from '@/types';

export function HeroModule() {
  const [session, setSession] = useState<LinkSession | null>(null);
  const [pending, setPending] = useState(false);

  const handleInitialize = async () => {
    setPending(true);
    try {
      const result = await api.initializeLink();
      setSession(result);
    } catch {
      setSession(null);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl flex items-center justify-center mb-12 md:mb-24 orbiting-content">
      <GlassPanel
        className="relative z-10 text-center space-y-6 md:space-y-8 p-6 md:p-12 rounded-xl border-primary/20 shadow-2xl overflow-hidden"
      >
        <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 glass-ui rounded-full bg-surface-container-low border-primary/30">
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary-container digital-pulse shadow-[0_0_15px_#00f0ff]" />
          <span className="font-label-mono text-[10px] md:text-[11px] text-primary tracking-[0.35em] uppercase font-bold">
            Orbital Link: {session ? session.sector : '7G_Sector'}
          </span>
        </div>
        <h2 className="font-display-lg text-4xl md:text-6xl lg:text-display-lg hero-title uppercase drop-shadow-[0_0_50px_rgba(0,219,233,0.45)] leading-tight md:leading-none">
          Aetheris Protocol
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-sm md:text-base lg:text-lg font-light">
          Securely interface with the distributed consciousness of the{' '}
          <span className="text-primary font-medium">Nebula Archive</span>.
          Neural links established via encrypted quantum tunnels. Access
          granted to Tier-1 Operators.
        </p>
        <div className="pt-6 md:pt-10 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-6">
            <button
              type="button"
              onClick={handleInitialize}
              disabled={pending}
              className="group relative px-8 md:px-14 py-4 md:py-5 bg-primary/10 border border-primary/60 hover:border-primary transition-all overflow-hidden backdrop-blur-2xl disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative z-10 font-label-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-primary font-bold">
                {pending
                  ? 'ESTABLISHING...'
                  : session
                    ? 'LINK ESTABLISHED'
                    : 'INITIALIZE LINK'}
              </span>
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-br" />
            </button>
          </div>
          {session && (
            <p className="font-data-readout text-[11px] text-primary/70">
              SESSION {session.sessionId} &middot; {session.status}
            </p>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
