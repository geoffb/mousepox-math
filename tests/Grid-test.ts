import * as tape from "tape";
import { approximately, distance, DirectionMask, Grid, IPoint, Vector2 } from "../lib";

tape("Grid", (t) => {
  // Create a simple grid for testing
  // This grid has non-zero "walls" around the edges
  const grid = new Grid(9, 9);
  grid.forEach((_, x, y) => {
    if (x === 0 || y === 0 || x === grid.width - 1 || y === grid.height - 1) {
      grid.set(x, y, 1);
    }
  });

  // The origin is where the ray is cast FROM
  const origin = new Vector2(4.5, 7.5);

  // The wall is where the ray is cast TOWARDS
  const wall = new Vector2(1, 4.5);

  // The Euclidean distance from origin to wall
  // This is used later to verify the raycast results
  const edist = distance(origin.x, origin.y, wall.x, wall.y);

  // Calculate direction from camera to wall
  const dir = new Vector2().copy(wall).subtract(origin).normalize();

  // Cast a ray
  const result = grid.raycast(origin, dir);

  // Ensure that ray distance matches the distance between origin and wall
  t.ok(approximately(result.distance, edist, 0.00000000000001));

  // Calculate the wall hit coordinates, based upon raycast result distance
  const hit = new Vector2(
    origin.x + dir.x * result.distance,
    origin.y + dir.y * result.distance);

  // Ensure the calculated hit coordinates match the original wall coordinates
  t.equal(hit.x, wall.x);
  t.equal(hit.y, wall.y);

  t.end();
});

tape("Grid.rotatePoint", (t) => {
  const g = new Grid(5, 5);
  const p: IPoint = { x: 0, y: 1 };
  g.rotatePoint(p, Math.PI / 2);
  t.equal(p.x, 3);
  t.equal(p.y, 0);
  t.end();
});

tape("Grid.getAdjacentFlags", (t) => {
  const g = new Grid(5, 5);
  g.set(2, 1, 1);
  g.set(2, 2, 1);
  t.equal(g.getAdjacentFlags(2, 1), DirectionMask.South);
  t.equal(g.getAdjacentFlags(2, 2), DirectionMask.North);
  t.end();
});
