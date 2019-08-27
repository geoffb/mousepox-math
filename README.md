# @mousepox/math

Math-related objects and utilities.

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fgeoffb%2Fmousepox-math%2Fbadge&style=flat-square)](https://actions-badge.atrox.dev/geoffb/mousepox-math/goto)

## API Reference

* [Interfaces](#interfaces)
  * [`ICircle`](#icircle)
  * [`IPoint`](#ipoint)
  * [`IRectangle`](#irectangle)
* [Constants](#constants)
  * [`GoldenRatio`](#goldenratio)
  * [`Tau`](#tau)
* [Functions](#functions)
  * [`clamp`](#clamp)

### Interfaces

#### ICircle

```ts
interface ICircle {
  x: number;
  y: number;
  radius: number;
}
```

A circle in 2D space.

#### IPoint

```ts
interface IPoint {
  x: number;
  y: number;
}
```

A point in 2D space.

#### IRectangle

```ts
interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

A rectangle in 2D space.

### Constants

#### GoldenRatio

`const GoldenRatio: number;`

The [Golden Ratio](https://en.wikipedia.org/wiki/Golden_ratio).

#### Tau

`const Tau: number;`

A full circle, or 2PI. See [The Tau Manifesto](https://tauday.com/).

### Functions

#### clamp

```ts
clamp(value: number, min: number, max: number): number;
```

Clamp a value between a given minimum and maximum.

Example:
```ts
const n = clamp(100, 20, 70);
// n = 70
```
