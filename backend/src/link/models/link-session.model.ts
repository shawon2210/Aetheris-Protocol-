export type LinkStatus = 'ESTABLISHED' | 'DENIED';

export class LinkSession {
  sessionId: string;
  status: LinkStatus;
  sector: string;
  establishedAt: string;

  constructor(partial: Partial<LinkSession>) {
    Object.assign(this, partial);
  }
}
