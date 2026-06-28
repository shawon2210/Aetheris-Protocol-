import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return {
      service: 'NEBULA_OS_API',
      status: 'NOMINAL',
      uptimeSeconds: Math.round(process.uptime()),
    };
  }
}
