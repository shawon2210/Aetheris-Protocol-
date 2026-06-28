import { Controller, Get } from '@nestjs/common';
import { SystemStatusService } from './system-status.service';
import { SystemStatus } from './models/system-status.model';

@Controller('system-status')
export class SystemStatusController {
  constructor(private readonly systemStatusService: SystemStatusService) {}

  /** GET /api/system-status — powers Chronos latency bars, sessions, thread load */
  @Get()
  get(): SystemStatus {
    return this.systemStatusService.get();
  }
}
