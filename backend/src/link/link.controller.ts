import { Controller, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkSession } from './models/link-session.model';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  /** POST /api/link/initialize — wired to the "INITIALIZE LINK" button */
  @Post('initialize')
  initialize(): LinkSession {
    return this.linkService.initialize();
  }
}
