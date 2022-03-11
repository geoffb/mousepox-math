import * as tape from "tape";
import { Random } from "../lib/Random";

tape("rollDiceByNotation", (t) => {
  t.plan(2);
  const rng = new Random();

  try {
    rng.rollDiceNotation("dasdasdadas");
  } catch (e) {
    if (e instanceof Error) {
      t.ok(e.message, "Invalid dice notation: dasdasdadas");
    } else {
      t.fail(`Unexpected error type: ${typeof e}`);
    }
  }

  const r1 = rng.rollDiceNotation("2d4+3");
  t.ok(r1 > 4 && r1 < 12);
});

tape("Random.getDiceNotationRange", (t) => {
  const range = Random.getDiceNotationRange("2d4+3");
  t.equal(range.min, 5);
  t.equal(range.max, 11);
  t.end();
});
