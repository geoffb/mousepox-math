import { Grid } from "./Grid";

/** A rule for converting a given adjacent flags value */
export interface IAutoGridRule {
  flags: number[];
  value: number;
}

/** A collection of auto grid rules, indexed by source grid value */
export interface IAutoGridRules {
  [index: number]: IAutoGridRule[];
}

/** A grid which automatically applies transform rules */
export class AutoGrid extends Grid {

  /** The source grid */
  private readonly source: Grid;

  /** Transform rules */
  private readonly rules: IAutoGridRules;

  constructor(source: Grid, rules: IAutoGridRules) {
    super(source.width, source.height);
    this.source = source;
    this.rules = rules;
    this.update();
  }

  /** Update the entire grid from source */
  public update(): void {
    this.forEach((_, x, y) => this.updateSingleCell(x, y));
  }

  /** Update a single cell within the grid */
  private updateSingleCell(x: number, y: number): void {
    const tile = this.source.get(x, y);
    if (this.rules[tile] !== undefined) {
      const flags = this.source.getAdjacentFlags(x, y);
      if (this.rules[tile] !== undefined) {
        for (const rule of this.rules[tile]) {
          if (rule.flags.indexOf(flags) !== -1) {
            this.set(x, y, rule.value);
            return;
          }
        }
      }
    }
    this.set(x, y, tile);
  }

}
