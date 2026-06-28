import { Injectable } from '@nestjs/common';
import { ArchiveStats } from './models/archive-stats.model';

@Injectable()
export class ArchiveService {
  private stats: ArchiveStats = new ArchiveStats({
    archiveId: 'ARC-SYST-42-0',
    loadDensityEb: 1.28,
    encryptionCipher: 'AES-X',
    encryptionTier: 'G9',
    nodeCount: 14209,
    loadSegments: [0.6, 0.5, 0.3, 0.1],
  });

  get(): ArchiveStats {
    return this.stats;
  }

  /** Simulates the "RECALIBRATE" button — regenerates plausible telemetry. */
  recalibrate(): ArchiveStats {
    const loadDensityEb = Math.round((1.1 + Math.random() * 0.6) * 100) / 100;
    const nodeCount =
      14000 + Math.floor(Math.random() * 600) - 300 + this.stats.nodeCount % 10;

    this.stats = new ArchiveStats({
      ...this.stats,
      loadDensityEb,
      nodeCount,
      loadSegments: Array.from(
        { length: 4 },
        (_, i) => Math.max(0.05, 0.65 - i * 0.18 + (Math.random() - 0.5) * 0.1),
      ),
    });

    return this.stats;
  }
}
