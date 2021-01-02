# Changelog

## 1.4.1

* :bug: Fix implementation of `Vector2.rotate`

## 1.4.0

* Add `Vector2.rotate`
* Add `Grid.rotatePoint`

## 1.3.1

* :bug: Avoid invalid cell coordinates in `Grid.forEachInArea`

## 1.3.0

* Add `IRange`
* Add `Random.rollDiceNotation`

## 1.2.0

* Add `Random.choice` method
* Change `Grid.cells` from `private` to `public`

## 1.1.0

* Add `Grid.copy` method
* Add `Grid.paste` method
* Add `Grid.rotate` method

## 1.0.0

* Add `astar` function (A* pathfinding using `Grid`)
* Add `Grid.forEachAdjacent` method
* Change `Grid.xyToIndex` from `private` to `public`

## 0.4.0

* Add `Grid` class
* Add `Vector2.add` method
* Add `Vector2.copy` method
* Add `Vector2.constrain` method
* Add `Vector2.normalize` method
* Add `Vector2.subtract` method
* Add `Vector2.magnitude` property
* `Vector2.copy` and `Vector2.subtract` methods now take an `IPoint` instead of a `Vector2`
* Add `approximately` function

## 0.3.1

* :bug: Correctly handle negative radians in wrapRadians

## 0.3.0

* Add `distance` function
* Add `manhattanDistance` function
* Add `SpatialHash` class

## 0.2.0

* Add `lerpAngle` function
* Add `wrapRadians` function
* Add `Tau` constant
* Add `Vector2.fromAngle` method

## 0.1.0

* :rocket: Initial version
