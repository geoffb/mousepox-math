import { GoldenRatio, IRectangle } from "./core";

/** A pair of potentially colliding rectangles */
export type SpatialHashPair = [IRectangle, IRectangle];

/** Spatial partitioning of rectangles */
export class SpatialHash {

  /** Potentially colliding pairs */
  public pairs: SpatialHashPair[] = [];

  /** Bucket size, in units */
  private size: number;

  /** Buckets */
  private buckets: Map<number, IRectangle[]> = new Map();

  /** Create a new SpatialHash */
  constructor(size: number) {
    this.size = size;
  }

  /** Clear this spatial hash of all data */
  public clear() {
    this.buckets.clear();
  }

  /** Insert a new rectangle into this spatial hash */
  public insert(rect: IRectangle) {
    // Determine extents along the X axis
    const ox = Math.floor(rect.x / this.size);
    const tx = Math.floor((rect.x + rect.width) / this.size);

    // Interate over all intersecting buckets along the X axis
    for (let x = ox; x <= tx; ++x) {
      // Determine extents along the Y axis
      const oy = Math.floor(rect.y / this.size);
      const ty = Math.floor((rect.y + rect.height) / this.size);

      // Iterate over all intersecting buckets on the Y axis
      for (let y = oy; y <= ty; ++y) {
        // Derive bucket key from bucket X,Y coordinates
        const key = x + (GoldenRatio * y % 1);

        // Get bucket for this key
        let bucket = this.buckets.get(key);
        if (bucket === undefined) {
          // No bucket exists for this key yet
          bucket = [];
          this.buckets.set(key, bucket);
        } else {
          // Existing bucket; add all pre-existing rects to potentially colliding pairs
          for (const other of bucket) {
            this.pairs.push([other, rect]);
          }
        }

        // Add this rect to the bucket
        bucket.push(rect);
      }
    }
  }

}
