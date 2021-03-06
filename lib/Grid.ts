import { DirectionMask, IPoint } from "./core";
import { BitFlags } from "./BitFlags";
import { Vector2 } from "./Vector2";

/** A cell offset */
interface IGridCellOffset extends IPoint {
  mask: DirectionMask;
}

/** Scratch BitFlags for inline calculations */
const ScratchBitFlags = new BitFlags();

/** Scratch Vector2 for inline calculations */
const ScratchVector2 = new Vector2();

/** Orthogonally adjecent cell offsets */
const OrthogonalAdjacentOffsets: IPoint[] = [
  { x: 0, y: -1 }, // Top
  { x: -1, y: 0 }, // Left
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Bottom
];

/** Cardinal and intercardinal adjacent cell offsets */
const AdjacentOffsets: IGridCellOffset[] = [
  { x: -1, y: -1, mask: DirectionMask.NorthWest },
  { x: 0, y: -1, mask: DirectionMask.North },
  { x: 1, y: -1, mask: DirectionMask.NorthEast },
  { x: -1, y: 0, mask: DirectionMask.West },
  { x: 1, y: 0, mask: DirectionMask.East },
  { x: -1, y: 1, mask: DirectionMask.SouthWest },
  { x: 0, y: 1, mask: DirectionMask.South },
  { x: 1, y: 1, mask: DirectionMask.SouthEast },
];

/** Results of casting a ray */
export interface IGridRaycastResult {
  /** Distance from ray origin */
  distance: number;
  /** Which side of the wall was hit: 0 = x, 1 = y */
  side: number;
  /** Cell value */
  value: number | undefined;
}

/** Handler passed to "forEach" methods */
type GridForEach = (value: number, x: number, y: number) => void;

/** 2D grid of numeric values */
export class Grid {

  /** Width of the grid, in cells */
  public width = 0;

  /** Height of the grid, in cells */
  public height = 0;

  /** Cell values */
  public cells: number[] = [];

  /** Center point of the grid */
  private readonly center: IPoint = { x: 0, y: 0 };

  /** Create a new Grid */
  constructor(width = 0, height = 0) {
    this.resize(width, height);
  }

  /** Resize grid */
  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.center.x = Math.floor(width / 2);
    this.center.y = Math.floor(height / 2);
    this.cells.length = width * height;
    this.fill(0);
  }

  /** Fill the grid with a specified value */
  public fill(value: number) {
    this.cells.fill(value);
  }

  /** Returns whether or not a given x,y coordinate is a valid cell */
  public valid(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  /** Gets the value of a cell by its x,y coordinates */
  public get(x: number, y: number): number {
    if (this.valid(x, y)) {
      const index = this.xyToIndex(x, y);
      return this.cells[index];
    } else {
      throw new Error(`Invalid cell coordinates: ${x}, ${y}`);
    }
  }

  /** Returns a bit mask indicating which adjacent cells are equal */
  public getAdjacentFlags(x: number, y: number): number {
    const v = this.get(x, y);
    ScratchBitFlags.clear();
    for (const offset of AdjacentOffsets) {
      const ox = x + offset.x;
      const oy = y + offset.y;
      if (!this.valid(ox, oy) || this.get(ox, oy) === v) {
        ScratchBitFlags.set(offset.mask);
      }
    }
    return ScratchBitFlags.value;
  }

  /** Sets the value of a cell by its x,y coordinates */
  public set(x: number, y: number, value: number) {
    if (this.valid(x, y)) {
      const index = this.xyToIndex(x, y);
      this.setIndex(index, value);
    } else {
      throw new Error(`Invalid cell coordinates: ${x}, ${y}`);
    }
  }

  /** Sets the value of a cell by its index */
  public setIndex(index: number, value: number) {
    if (index >= 0 && index < this.cells.length) {
      this.cells[index] = value;
    } else {
      throw new Error(`Invalid cell index: ${index}`);
    }
  }

  /** Copy values from another grid */
  public copy(grid: Grid) {
    grid.forEach((value, x, y) => this.set(x, y, value));
  }

  /** Invokes a handler for each cell in the grid */
  public forEach(handler: GridForEach) {
    const len = this.cells.length;
    for (let index = 0; index < len; ++index) {
      const x = this.indexToX(index);
      const y = this.indexToY(index);
      handler(this.get(x, y), x, y);
    }
  }

  /** Invokes a handler for each cell within a given area */
  public forEachInArea(x: number, y: number, width: number, height: number, handler: GridForEach) {
    for (let iy = y; iy < y + height; ++iy) {
      for (let ix = x; ix < x + width; ++ix) {
        if (!this.valid(ix, iy)) { continue; }
        handler(this.get(ix, iy), ix, iy);
      }
    }
  }

  /** Invokes a handler for each cell adjacent to a given cell */
  public forEachAdjacent(x: number, y: number, handler: GridForEach) {
    for (const offset of OrthogonalAdjacentOffsets) {
      const ax = x + offset.x;
      const ay = y + offset.y;
      if (!this.valid(ax, ay)) { continue; }
      handler(this.get(ax, ay), ax, ay);
    }
  }

  /** Rotate this grid clockwise by 90 degrees, a given number of times */
  public rotate(rotations = 1) {
    Scratch.resize(this.height, this.width);
    for (let i = 0; i < rotations; ++i) {
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          Scratch.set(Scratch.width - y - 1, x, this.get(x, y));
        }
      }
      this.copy(Scratch);
    }
  }

  /** Rotate a given point within this grid around its center */
  public rotatePoint(p: IPoint, angle: number) {
    ScratchVector2.set(p.x, p.y);
    ScratchVector2.rotate(angle, this.center);
    p.x = Math.round(ScratchVector2.x);
    p.y = Math.round(ScratchVector2.y);
  }

  /** "Paste" the contents of another grid at specified location */
  public paste(grid: Grid, x: number, y: number) {
    grid.forEach((value, sx, sy) => {
      this.set(x + sx, y + sy, value);
    });
  }

  /** Cast a ray and return information about cells hit, etc */
  public raycast(origin: IPoint, direction: Vector2, result?: IGridRaycastResult): IGridRaycastResult {
    if (result === undefined) {
      // Create a new result object
      result = {
        distance: 0,
        side: 0,
        value: undefined,
      };
    } else {
      // Reset provided result object
      result.distance = 0;
      result.side = 0;
      result.value = undefined;
    }

    // Cell coordinates begin at the cell containing the ray's origin
    let x = Math.floor(origin.x);
    let y = Math.floor(origin.y);

    const deltaDistX = Math.sqrt(1 + (direction.y * direction.y) / (direction.x * direction.x));
    const deltaDistY = Math.sqrt(1 + (direction.x * direction.x) / (direction.y * direction.y));

    let sideDistX = 0;
    let sideDistY = 0;
    let stepX = 0;
    let stepY = 0;
    let hit = false;

    // Calculate step and sideDist
    if (direction.x < 0) {
      stepX = -1;
      sideDistX = (origin.x - x) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (x + 1.0 - origin.x) * deltaDistX;
    }
    if (direction.y < 0) {
      stepY = -1;
      sideDistY = (origin.y - y) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (y + 1.0 - origin.y) * deltaDistY;
    }

    // Perform DDA
    while (!hit) {
      // Jump to next map square
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        x += stepX;
        result.side = 0;
      } else {
        sideDistY += deltaDistY;
        y += stepY;
        result.side = 1;
      }

      if (this.valid(x, y)) {
        const value = this.get(x, y);
        // TODO: Don't assume non-zero cell values are "walls"?
        if (value !== 0) {
          result.value = value;
          hit = true;
        }
      } else {
        // We hit an invalid cell
        break;
      }
    }

    // Calculate distance projected on camera direction (oblique distance will give fisheye effect!)
    if (result.side === 0) {
      result.distance = (x - origin.x + (1 - stepX) / 2) / direction.x;
    } else {
      result.distance = (y - origin.y + (1 - stepY) / 2) / direction.y;
    }

    return result;
  }

  /** Converts an x,y coordinate into a flattened index */
  public xyToIndex(x: number, y: number): number {
    return (y * this.width) + x;
  }

  /** Returns the x coordinate of a given grid index */
  private indexToX(index: number): number {
    return index % this.width;
  }

  /** Returns the y coordinate of a given grid index */
  private indexToY(index: number): number {
    return Math.floor(index / this.width);
  }

}

/** Modular level scratch object */
const Scratch = new Grid();
