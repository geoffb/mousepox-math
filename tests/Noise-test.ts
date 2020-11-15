import * as tape from "tape";
import { Noise } from "../lib/Noise";

tape("Noise", (t) => {
  const noise = new Noise();
  t.ok(noise instanceof Noise);

  const size = 100;
  for (let i = 0; i < size * size; i++) {
    const v = noise.perlin2(i % size, Math.floor(i / size));
    t.ok(v >= 0 && v <= 1);
  }

  t.end();
});
