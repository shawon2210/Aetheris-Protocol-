import { Controller, Get } from '@nestjs/common';
import { LiveFeedService } from './live-feed.service';
import { LiveEvent } from './models/live-event.model';

@Controller('live-feed')
export class LiveFeedController {
  constructor(private readonly liveFeedService: LiveFeedService) {}

  /** GET /api/live-feed — powers the scrolling LIVE_DATA marquee */
  @Get()
  findRecent(): LiveEvent[] {
    return this.liveFeedService.findRecent();
  }
}
