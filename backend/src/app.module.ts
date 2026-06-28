import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectorsModule } from './sectors/sectors.module';
import { ArchiveModule } from './archive/archive.module';
import { SystemStatusModule } from './system-status/system-status.module';
import { LiveFeedModule } from './live-feed/live-feed.module';
import { LinkModule } from './link/link.module';
import { TerminalModule } from './terminal/terminal.module';

@Module({
  imports: [
    SectorsModule,
    ArchiveModule,
    SystemStatusModule,
    LiveFeedModule,
    LinkModule,
    TerminalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
