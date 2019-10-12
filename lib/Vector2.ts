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

  /** Mangitude (or length) of this vector */
  public get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** Create a new Vector2 */
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
   * Add a point to this vector
   * @chainable
   */
  public add(p: IPoint): Vector2 {
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  /**
   * Copy the components of another vector
   * @chainable
   */
  public copy(p: IPoint): Vector2 {
    this.x = p.x;
    this.y = p.y;
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

  /**
   * Scale this vector by a given scalar
   * @chainable
   */
  public scale(n: number): Vector2 {
    this.x *= n;
    this.y *= n;
    return this;
  }

  /**
   * Subtract a point from this vector
   * @chainable
   */
  public subtract(p: IPoint): Vector2 {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }

  /**
   * Constrain this vector's components by specified bounds
   * @chainable
   */
  public constrain(x: number, y: number, width: number, height: number): Vector2 {
    this.x = clamp(this.x, x, x + width);
    this.y = clamp(this.y, y, y + height);
    return this;
  }

}
