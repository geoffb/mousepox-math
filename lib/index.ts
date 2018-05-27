export * from "./Random";
export * from "./Vector2";

export interface IPoint {
  x: number;
  y: number;
}

export interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Clamp a number between two values
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Return the sign of a number
export function sign(n: number): number {
  return n > 0 ? 1 : n === 0 ? 0 : -1;
}

// Linear interpolate between two numbers
export function lerp(a: number, b: number, t: number): number {
  return a + ((b - a) * t);
}
