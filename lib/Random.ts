const M = 0x80000000; // 2^31
const A = 1103515245;
const C = 12345;

/** Deterministic pseudorandom number generator */
export class Random {

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

}
