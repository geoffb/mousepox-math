/** A point in 2D space */
export interface IPoint {
  x: number;
  y: number;
}

/** A point in 3D space */
export interface IPoint3 {
  x: number;
  y: number;
  z: number;
}

/** A circle in 2D space */
export interface ICircle {
  x: number;
  y: number;
  radius: number;
}

/** A rectangle in 2D space */
export interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** A range of numbers */
export interface IRange {
  min: number;
  max: number;
}

/** Golden ratio */
export const GoldenRatio = (Math.sqrt(5) + 1) / 2;

/**
 * A full circle
 * @see https://tauday.com/tau-manifesto
 */
export const Tau = Math.PI * 2;

/** Compares two numbers for approximate equality */
export function approximately(a: number, b: number, threshold = Number.EPSILON): boolean {
  return Math.abs(a - b) < threshold;
}

/** Clamp a number between two values */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Calculate the Euclidean distance between two points */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/** Calculate the dot product of given 2D vectors */
export function dot2(x1: number, y1: number, x2: number, y2: number): number {
  return x1 * x2 + y1 * y2;
}

/** Calculate the dot product of given 3D vectors */
export function dot3(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return x1 * x2 + y1 * y2 + z1 * z2;
}

/** Calculate the Manhattan distance between two points */
export function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

/** Lerp betweeen two angles, via the shortest routes */
export function lerpAngle(a: number, b: number, t: number): number {
  const da = (b - a) % Tau;
  const n = 2 * da % Tau - da;
  return a + n * t;
}

/** Return the sign of a number */
export function sign(n: number): number {
  return n > 0 ? 1 : n === 0 ? 0 : -1;
}

/** Linear interpolate between two numbers */
export function lerp(a: number, b: number, t: number): number {
  return a + ((b - a) * t);
}

/** Wrap radians around a circle */
export function wrapRadians(radians: number): number {
  return ((radians % Tau) + Tau) % Tau;
}
