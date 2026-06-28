/**
 * Domain model for the Neural Archive telemetry card.
 */
export class ArchiveStats {
  archiveId: string;
  loadDensityEb: number;
  encryptionCipher: string;
  encryptionTier: string;
  nodeCount: number;
  /** 0-1 segmented bar values, mirrors the 4-segment load bar in the HUD */
  loadSegments: number[];

  constructor(partial: Partial<ArchiveStats>) {
    Object.assign(this, partial);
  }
}
