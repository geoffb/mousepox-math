export class Vector2 {

  public x: number;

  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  public scale(n: number): Vector2 {
    this.x *= n;
    this.y *= n;
    return this;
  }

}
