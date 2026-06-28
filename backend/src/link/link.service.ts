import { Injectable } from '@nestjs/common';
import { LinkSession } from './models/link-session.model';

@Injectable()
export class LinkService {
  /** Simulates authorizing a Tier-1 Operator session — backs the hero CTA. */
  initialize(): LinkSession {
    return new LinkSession({
      sessionId: `SESS-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      status: 'ESTABLISHED',
      sector: '7G_SECTOR',
      establishedAt: new Date().toISOString(),
    });
  }
}
