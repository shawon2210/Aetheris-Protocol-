import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  bracket?: 'tl' | 'br' | 'both' | 'none';
  hoverable?: boolean;
}

export function GlassPanel({
  children,
  className = '',
  bracket = 'none',
  hoverable = false,
}: GlassPanelProps) {
  const hoverClass = hoverable ? 'hover-digital transition-all group' : '';

  return (
    <div className={`glass-ui ${hoverClass} ${className}`.trim()}>
      {(bracket === 'tl' || bracket === 'both') && (
        <div className="hud-bracket-tl opacity-80" />
      )}
      {(bracket === 'br' || bracket === 'both') && (
        <div className="hud-bracket-br opacity-80" />
      )}
      {children}
    </div>
  );
}
