export default class Vector2 {
  x: number;
  y: number;
  
  static ZERO : Vector2 = new Vector2(0, 0);
  static LEFT : Vector2 = new Vector2(-1, 0);
  static RIGHT : Vector2 = new Vector2(1, 0);
  static UP : Vector2 = new Vector2(0, -1);
  static DOWN : Vector2 = new Vector2(0, 1);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector2): void {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(vec: Vector2) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  mult(num: number): void {
    this.x *= num;
    this.y *= num;
  }

  div(num: number) {
    this.x /= num;
    this.y /= num;
  }

  normalize(): void {
    this.div(this.mag());
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static add(vecA, vecB): Vector2 {
    return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
  }

  static sub(vecA: Vector2, vecB: Vector2): Vector2 {
    return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
  }

}
