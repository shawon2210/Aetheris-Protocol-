export type SectorState = 'STABLE' | 'WARNING' | 'ERROR';

export interface Sector {
  id: string;
  name: string;
  state: SectorState;
  statusCode: string;
}

export interface ArchiveStats {
  archiveId: string;
  loadDensityEb: number;
  encryptionCipher: string;
  encryptionTier: string;
  nodeCount: number;
  loadSegments: number[];
}

export interface SystemStatus {
  networkLatencyMs: number;
  signalBars: number[];
  activeSessions: number;
  threadLoadPercent: number;
}

export interface LiveEvent {
  id: string;
  message: string;
  timestamp: string;
}

export type LinkStatus = 'ESTABLISHED' | 'DENIED';

export interface LinkSession {
  sessionId: string;
  status: LinkStatus;
  sector: string;
  establishedAt: string;
}

export interface TerminalLine {
  id: string;
  message: string;
  type: 'log' | 'warn' | 'error' | 'success';
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
}
