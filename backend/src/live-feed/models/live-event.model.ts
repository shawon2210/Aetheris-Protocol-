export class LiveEvent {
  id: string;
  message: string;
  timestamp: string;

  constructor(partial: Partial<LiveEvent>) {
    Object.assign(this, partial);
  }
}
