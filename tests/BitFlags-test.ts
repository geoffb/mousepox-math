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

  t.end();
});
