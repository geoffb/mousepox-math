/* tslint:disable:no-bitwise */

/** A numeric value with specific bits (flags) set or unset */
export class BitFlags {

  /** The combined value */
  public value: number;

  constructor(value?: number) {
    this.value = value ?? 0;
  }

  /** Clear bits */
  public clear(): void {
    this.value = 0;
  }

  /** Set a bit mask */
  public set(mask: number): void {
    this.value |= mask;
  }

  /** Check if a bit mask is set */
  public has(mask: number): boolean {
    return (this.value & mask) !== 0;
  }

}
