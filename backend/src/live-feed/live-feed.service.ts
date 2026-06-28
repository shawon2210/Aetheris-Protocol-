import { Injectable } from '@nestjs/common';
import { LiveEvent } from './models/live-event.model';

@Injectable()
export class LiveFeedService {
  private readonly templates: string[] = [
    'NEURAL_BRIDGE_READY',
    'SECTOR_7G_CALIBRATED',
    'SYSTEM_HEALTH_NOMINAL',
    'ARCHIVE_LINK_ESTABLISHED',
    'QUANTUM_TUNNEL_STABLE',
  ];

  findRecent(): LiveEvent[] {
    const packetId = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0');
    const lat = (Math.random() * 90).toFixed(1);
    const lon = (Math.random() * 180).toFixed(1);

    const events = [
      `STREAMING_PACKET_ID:0x${packetId}`,
      `SYNCING_COORDINATES:${lat}N_${lon}W`,
      `UPTIME_99.${Math.floor(900 + Math.random() * 99)}%`,
      ...this.templates,
    ];

    return events.map(
      (message, index) =>
        new LiveEvent({
          id: `${Date.now()}-${index}`,
          message,
          timestamp: new Date().toISOString(),
        }),
    );
  }
}
