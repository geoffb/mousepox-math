import { IPoint } from "./core";

/** A vector in 2D space */
export class Vector2 implements IPoint {

  /** Create a new vector from an angle, in radians */
  public static fromAngle(radians: number): Vector2 {
    return new Vector2(Math.cos(radians), Math.sin(radians));
  }

  /** X component */
  public x: number;

  /** Y component */
  public y: number;

  /** Radians expressing this vector's angle */
  public get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Set this vector's components to specified values
   * @chainable
   */
  public set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  /** Scale this vector by a given scalar */
  public scale(n: number): Vector2 {
    this.x *= n;
    this.y *= n;
    return this;
  }

}
