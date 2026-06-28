import { Controller, Get, Post } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveStats } from './models/archive-stats.model';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  /** GET /api/archive — powers the "NEURAL ARCHIVE" HUD card */
  @Get()
  get(): ArchiveStats {
    return this.archiveService.get();
  }

  /** POST /api/archive/recalibrate — wired to the "RECALIBRATE" button */
  @Post('recalibrate')
  recalibrate(): ArchiveStats {
    return this.archiveService.recalibrate();
  }
}
