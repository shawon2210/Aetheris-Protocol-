import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { Sector, SectorState } from './models/sector.model';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  /** GET /api/sectors — powers the "SECTOR STATUS" HUD card */
  @Get()
  findAll(@Query('status') status?: SectorState): Sector[] {
    return this.sectorsService.findAll(status);
  }

  /** GET /api/sectors/:id — single sector detail (e.g. for a drill-down view) */
  @Get(':id')
  findOne(@Param('id') id: string): Sector {
    const sector = this.sectorsService.findOne(id);
    if (!sector) {
      throw new NotFoundException(`Sector "${id}" not found`);
    }
    return sector;
  }
}
