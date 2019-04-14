# @mousepox/math

Math-related objects and utilities.

## API Reference

* [Interfaces](#interfaces)
  * [`ICircle`](#icircle)
  * [`IPoint`](#ipoint)
  * [`IRectangle`](#irectangle)
* [Constants](#constants)
  * [`GoldenRatio`](#goldenratio)
  * [`Tau`](#tau)

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
