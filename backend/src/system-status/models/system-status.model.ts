export class SystemStatus {
  networkLatencyMs: number;
  /** 0-1 strength per bar, mirrors the 4-bar latency indicator in the HUD */
  signalBars: number[];
  activeSessions: number;
  threadLoadPercent: number;

  constructor(partial: Partial<SystemStatus>) {
    Object.assign(this, partial);
  }
}
