export default class Vector2 {
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector2): void {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(vec: Vector2): void {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  mult(num: number): void {
    this.x *= num;
    this.y *= num;
  }

  div(num: number): void {
    this.x /= num;
    this.y /= num;
  }

  normalize(): void {
    this.div(this.mag());
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  equals(vec: Vector2): boolean {
    return vec.x == this.x && vec.y == this.y;
  }

  static mult(vec: Vector2, num: number){
    const temp = new Vector2(vec.x, vec.y);
    temp.mult(num);
    return temp;
  }

  static add(vecA, vecB): Vector2 {
    return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
  }

  static sub(vecA: Vector2, vecB: Vector2): Vector2 {
    return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
  }

  static zero(): Vector2{
    return new Vector2(0, 0);
  }

  static left(): Vector2{
    return new Vector2(-1, 0);
  }

  static right():Vector2{
    return new Vector2(1, 0);
  }

  static up(): Vector2{
    return new Vector2(0, -1);
  }

  static down(): Vector2{
    return new Vector2(0, 1);
  }

}
