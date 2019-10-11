import { clamp, IPoint } from "./core";

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

  /** Mangitude (or length of this vector) */
  public get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
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

  /**
   * Copy the components of another vector
   * @chainable
   */
  public copy(v: Vector2): Vector2 {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Normalize this vector
   * @chainable
   */
  public normalize(): Vector2 {
    const mag = this.magnitude;
    if (mag === 0) {
      return this;
    } else {
      return this.scale(1 / mag);
    }
  }

  /** Scale this vector by a given scalar */
  public scale(n: number): Vector2 {
    this.x *= n;
    this.y *= n;
    return this;
  }

  public subtract(v: Vector2): Vector2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /** Constrain this vector's components by specified bounds */
  public constrain(x: number, y: number, width: number, height: number): Vector2 {
    this.x = clamp(this.x, x, x + width);
    this.y = clamp(this.y, y, y + height);
    return this;
  }

}
