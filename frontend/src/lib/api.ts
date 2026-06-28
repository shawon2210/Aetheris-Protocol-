import { API_BASE_URL } from './config';
import type {
  ApiResponse,
  ArchiveStats,
  LinkSession,
  LiveEvent,
  Sector,
  SystemStatus,
  TerminalLine,
} from '@/types';

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    ...options,
  });

  if (!response.ok) {
    throw new Error(`NEBULA_OS_API request failed: ${path} (${response.status})`);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
}

export const api = {
  getSectors: () => request<Sector[]>('/sectors'),
  getArchiveStats: () => request<ArchiveStats>('/archive'),
  recalibrateArchive: () =>
    request<ArchiveStats>('/archive/recalibrate', { method: 'POST' }),
  getSystemStatus: () => request<SystemStatus>('/system-status'),
  getLiveFeed: () => request<LiveEvent[]>('/live-feed'),
  initializeLink: () =>
    request<LinkSession>('/link/initialize', { method: 'POST' }),
  getTerminalLines: () => request<TerminalLine[]>('/terminal'),
  executeCommand: (input: string) =>
    request<TerminalLine>('/terminal/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    }),
  simulateActivity: () =>
    request<TerminalLine>('/terminal/simulate', { method: 'POST' }),
};
