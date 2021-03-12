// tslint:disable:no-bitwise
import * as tape from "tape";
import { BitFlags } from "../lib";

tape("BitFlags", (t) => {
  const flags = new BitFlags();

  t.notok(flags.has(16));
  t.notok(flags.has(128));

  flags.set(16);
  t.equal(flags.value, 16);
  t.ok(flags.has(16));

  flags.set(128);
  t.equal(flags.value, 144);
  t.ok(flags.has(128));

  flags.clear();
  t.equal(flags.value, 0);
  t.notok(flags.has(16));
  t.notok(flags.has(128));

  flags.clear();
  flags.set(2);
  flags.set(8);
  t.equal(flags.value, 2 | 8, "Flag value = 10");
  t.notok(flags.has(1), "North is false");
  t.ok(flags.has(2), "East is true");
  t.notok(flags.has(4), "South is false");
  t.ok(flags.has(8), "West is true");

  t.end();
});
