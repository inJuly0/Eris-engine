import Vector2 from "../vector./vector";

export default class Entity {
  pos: Vector2;
  vel: Vector2;
  width: number;
  height: number;
  colliderMasks: object[];
  
  constructor(x: number, y: number, width: number, height: number) {
    this.pos = new Vector2(x, y);
    this.vel = new Vector2(0, 0);
    this.width = width;
    this.height = height;
    this.colliderMasks = [];
  }

  

  update() {}
}
