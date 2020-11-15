import { Grid } from "./Grid";
import { Noise } from "./Noise";

export class NoiseGrid extends Grid {

  public frequency = 0.01;

  public octaves = 4;

  public persistence = 1;

  private readonly noise = new Noise();

  public generate(): NoiseGrid {
    const seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.noise.seed(seed);
    const len = this.width * this.height;
    for (let i = 0; i < len; i++) {
      const x = this.indexToX(i);
      const y = this.indexToY(i);
      this.set(x, y, this.noise2(x, y));
    }
    return this;
  }

  private noise2(x: number, y: number): number {
    let value = 0;
    let frequency = this.frequency;
    let amplitude = 1;
    let max = 0;
    for (let i = 0; i < this.octaves; i++) {
      value += this.noise.perlin2(x * frequency, y * frequency) * amplitude;
      max += amplitude;
      amplitude *= this.persistence;
      frequency *= 2;
    }
    return value / max;
  }

}
