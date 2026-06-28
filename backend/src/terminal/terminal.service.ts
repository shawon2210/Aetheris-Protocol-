import { Injectable } from '@nestjs/common';
import { TerminalLine } from './models/terminal-line.model';

@Injectable()
export class TerminalService {
  private lines: TerminalLine[] = [];
  private counter = 0;

  private readonly MESSAGES = [
    'SCANNING ACTIVE NODES...',
    'LINK QUALITY: 98.7% — STABLE',
    'SECTOR 7G: ALL CLEAR',
    'ARCHIVE SYNC: 100%',
    'LATENCY: 12ms TO NODE-42',
    'ENCRYPTION HANDSHAKE: VERIFIED',
    'VOID_CORE: STABLE (Δ0.012)',
    'NEURAL BRIDGE: ACTIVE',
    'DATA THROUGHPUT: 1.42 TB/s',
    'SYSTEM CLOCK: SYNCHRONIZED',
  ];

  getLines(): TerminalLine[] {
    return this.lines;
  }

  executeCommand(input: string): TerminalLine {
    const lines: TerminalLine[] = [];

    lines.push(new TerminalLine(`> ${input}`, 'log'));

    const cmd = input.trim().toUpperCase();

    if (cmd === 'HELP') {
      lines.push(new TerminalLine('AVAILABLE COMMANDS: HELP, STATUS, CLEAR, SCAN, PING, SECTORS', 'success'));
    } else if (cmd === 'STATUS') {
      lines.push(new TerminalLine('ALL SYSTEMS OPERATIONAL', 'success'));
      lines.push(new TerminalLine('CPU: 23% | MEM: 1.8/8 GB | NET: STABLE', 'log'));
    } else if (cmd === 'CLEAR') {
      this.lines = [];
      return new TerminalLine('TERMINAL CLEARED', 'success');
    } else if (cmd === 'SCAN') {
      lines.push(new TerminalLine('INITIATING DEEP SCAN...', 'warn'));
      lines.push(new TerminalLine('SCANNING 14,209 NODES...', 'log'));
      lines.push(new TerminalLine('ANOMALIES DETECTED: 0', 'success'));
    } else if (cmd === 'PING') {
      lines.push(new TerminalLine('PONG — 4ms', 'success'));
    } else if (cmd === 'SECTORS') {
      lines.push(new TerminalLine('FETCHING SECTOR DATA...', 'log'));
      lines.push(new TerminalLine('SECTOR 7G: ONLINE | SECTOR ALPHA: STANDBY | SECTOR OMEGA: MAINTENANCE', 'success'));
    } else {
      lines.push(new TerminalLine(`UNKNOWN COMMAND: ${input}. TYPE 'HELP' FOR AVAILABLE COMMANDS.`, 'error'));
    }

    this.lines.push(...lines);
    return lines[lines.length - 1];
  }

  simulateActivity(): TerminalLine {
    const message = this.MESSAGES[this.counter % this.MESSAGES.length];
    this.counter++;
    const line = new TerminalLine(message, 'log');
    this.lines.push(line);

    if (this.lines.length > 100) {
      this.lines = this.lines.slice(-50);
    }

    return line;
  }
}
