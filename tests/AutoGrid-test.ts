import * as tape from "tape";
import { AutoGrid, Grid } from "../lib";

tape("AutoGrid", (t) => {
  const g = Grid.fromStrings([
    "###",
    "#.#",
    "###",
  ], "#.");

  const a = new AutoGrid(g, {
    0: [
      { value: 100, flags: [254] },
    ],
  });

  t.equal(a.get(1, 1), 1);
  t.equal(a.get(1, 2), 100);
  t.end();
});
