import { Injectable } from '@nestjs/common';
import { SystemStatus } from './models/system-status.model';

@Injectable()
export class SystemStatusService {
  get(): SystemStatus {
    const networkLatencyMs = Math.round((8 + Math.random() * 10) * 10) / 10;
    const threadLoadPercent = Math.round((8 + Math.random() * 12) * 10) / 10;
    const activeSessions = 1300 + Math.floor(Math.random() * 200);

    return new SystemStatus({
      networkLatencyMs,
      signalBars: this.latencyToBars(networkLatencyMs),
      activeSessions,
      threadLoadPercent,
    });
  }

  private latencyToBars(latencyMs: number): number[] {
    // Lower latency -> more bars lit, same visual language as the mock's
    // four bg-primary/[opacity] bars.
    const strength = Math.max(0, Math.min(1, 1 - latencyMs / 30));
    return [1, 0.9, 0.4, 0.15].map((base) =>
      Math.max(0.1, Math.min(1, base * (0.6 + strength))),
    );
  }
}
