import { Controller, Get, Post, Body } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalLine } from './models/terminal-line.model';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Get()
  getLines(): TerminalLine[] {
    return this.terminalService.getLines();
  }

  @Post('command')
  executeCommand(@Body('input') input: string): TerminalLine {
    return this.terminalService.executeCommand(input ?? '');
  }

  @Post('simulate')
  simulateActivity(): TerminalLine {
    return this.terminalService.simulateActivity();
  }
}
