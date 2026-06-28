export class TerminalLine {
  constructor(
    public message: string,
    public type: 'log' | 'warn' | 'error' | 'success' = 'log',
    public timestamp: string = new Date().toISOString(),
    public id: string = crypto.randomUUID(),
  ) {}
}
