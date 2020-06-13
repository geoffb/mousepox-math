import { IRange } from "./core";

const M = 0x80000000; // 2^31
const A = 1103515245;
const C = 12345;

/** RegEx for parsing dice notation */
const DiceNotationPattern = /([0-9]+)?d([0-9]+)([+-]{1}[0-9]+)?/;

/** Dice information */
interface IDiceInfo {
  count: number;
  sides: number;
  bonus: number;
}

/** Parse dice info from notation */
function parseDiceNotation(notation: string): IDiceInfo {
  // Parse dice notation
  const matches = notation.match(DiceNotationPattern);
  if (matches === null) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }

  return {
    bonus: Number(matches[3]),
    count: Number(matches[1]),
    sides: Number(matches[2]),
  };
}

/** Deterministic pseudorandom number generator */
export class Random {

  /** Return the possible range for a given dice notation */
  public static getDiceNotationRange(notation: string): IRange {
    const { count, sides, bonus } = parseDiceNotation(notation);
    return {
      max: count * sides + bonus,
      min: count * 1 + bonus,
    };
  }

  /** Current state of the random number generator */
  public state = 0;

  constructor(seed?: number) {
    this.reset(seed);
  }

  /** Resets the random number state */
  public reset(seed?: number) {
    if (seed !== undefined) {
      this.state = seed;
    } else {
      this.state = Math.floor(Math.random() * (M - 1));
    }
  }

  /** Returns the next random number */
  public next(): number {
    this.state = (A * this.state + C) % M;
    return this.state / M;
  }

  /** Returns a random integer between min and max, inclusive */
  public integer(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Returns true if a random number falls within a given probability */
  public chance(probability: number): boolean {
    return this.next() <= probability;
  }

  /** Choose a random item from an array, optionally removing it */
  public choice<T>(items: T[], remove = false): T {
    const index = this.integer(0, items.length - 1);
    const pick = items[index];
    if (remove) {
      items.splice(index, 1);
    }
    return pick;
  }

  /** Shuffles an array of items in place */
  public shuffle(items: any[]) {
    const len = items.length;
    if (len < 2) { return; }
    for (let i = 0; i < len; ++i) {
      const j = this.integer(i, len - 1);
      const swap = items[i];
      items[i] = items[j];
      items[j] = swap;
    }
  }

  /** Roll some dice defined by "dice notation", e.g. "2d4+1" */
  public rollDiceNotation(notation: string): number {
    const { count, sides, bonus } = parseDiceNotation(notation);

    // Roll dice
    let result = bonus;
    for (let i = 0; i < count; ++i) {
      result += this.integer(1, sides);
    }

    return result;
  }

}
