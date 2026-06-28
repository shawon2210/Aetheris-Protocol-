import { Injectable } from '@nestjs/common';
import { Sector, SectorState } from './models/sector.model';

/**
 * Service layer: owns the business logic and state for sector telemetry.
 * Controllers never touch data directly — they always go through here.
 */
@Injectable()
export class SectorsService {
  private readonly sectors: Sector[] = [
    new Sector({
      id: 'orion_belt',
      name: 'ORION_BELT',
      state: 'STABLE',
      statusCode: 'STABLE',
    }),
    new Sector({
      id: 'alpha_7',
      name: 'ALPHA_7',
      state: 'STABLE',
      statusCode: 'STABLE',
    }),
    new Sector({
      id: 'void_core',
      name: 'VOID_CORE',
      state: 'ERROR',
      statusCode: 'ERR_0X',
    }),
  ];

  findAll(status?: SectorState): Sector[] {
    const results = this.sectors.map((sector) =>
      sector.id === 'void_core' ? this.withJitter(sector) : sector,
    );
    if (status) {
      return results.filter((s) => s.state === status);
    }
    return results;
  }

  findOne(id: string): Sector | undefined {
    return this.sectors.find((sector) => sector.id === id);
  }

  private withJitter(sector: Sector): Sector {
    const roll = Math.random();
    const state: SectorState = roll > 0.85 ? 'WARNING' : 'ERROR';
    const statusCode = state === 'WARNING' ? 'WARN_4X' : 'ERR_0X';
    return new Sector({ ...sector, state, statusCode });
  }
}
