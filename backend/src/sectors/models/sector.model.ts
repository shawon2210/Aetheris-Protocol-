export type SectorState = 'STABLE' | 'WARNING' | 'ERROR';

/**
 * Domain model for a single planetary sector. This is the "Model" layer:
 * a plain shape with no framework or transport concerns baked in.
 */
export class Sector {
  id: string;
  name: string;
  state: SectorState;
  /** Short status code shown in the HUD, e.g. "STABLE" or "ERR_0X" */
  statusCode: string;

  constructor(partial: Partial<Sector>) {
    Object.assign(this, partial);
  }
}
