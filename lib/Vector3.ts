import { dot3, IPoint3 } from "./core";

/** A vector in 3D space */
export class Vector3 implements IPoint3 {

  /** X component */
  public x: number;

  /** Y component */
  public y: number;

  /** Y component */
  public z: number;

  /** Create a new Vector2 */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Set this vector's components to specified values
   * @chainable
   */
  public set(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Add a point to this vector
   * @chainable
   */
  public add(p: IPoint3): Vector3 {
    this.x += p.x;
    this.y += p.y;
    this.z += p.z;
    return this;
  }

  /**
   * Copy the components of another vector
   * @chainable
   */
  public copy(p: IPoint3): Vector3 {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
    return this;
  }

  /** Calculate the dot product of this vector and another */
  public dot(x: number, y: number, z = 0): number {
    return dot3(this.x, this.y, this.z, x, y, z);
  }

  public at(x: number, y?: number, z?: number): boolean {
    return (
      this.x === x &&
      (y !== undefined || this.y === y) &&
      (z !== undefined || this.z === z));
  }

}
