import * as tape from "tape";
import { Vector2 } from "../lib/Vector2";

tape("Vector2.rotate", (t) => {
  const v1 = new Vector2(0, 1);
  v1.rotate(Math.PI / 2);
  t.equal(Math.round(v1.x), -1);
  t.equal(Math.round(v1.y), 0);

  const v2 = new Vector2(0, 1);
  v2.rotate(Math.PI / 2, { x: 2, y: 2 });
  t.equal(Math.round(v2.x), 3);
  t.equal(Math.round(v2.y), 0);

  const v3 = new Vector2(2, 3);
  v3.rotate(Math.PI, { x: 2, y: 2 });
  t.equal(Math.round(v3.x), 2);
  t.equal(Math.round(v3.y), 1);

  t.end();
});
