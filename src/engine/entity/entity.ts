import Vector2 from "../vector/vector.js";
import GraphicsComponent from "../graphics/GraphicsComponent.js";

export default class Entity {
  pos: Vector2;
  vel: Vector2;
  width: number;
  height: number;
  colliderMasks: object[];
  anim: GraphicsComponent;
  _groupKeys: string[];

  constructor(x: number, y: number) {
    this.pos = new Vector2(x, y);
    this._groupKeys = [];
  }

  initSprite(image: HTMLImageElement): void {
    this.anim = new GraphicsComponent(this, image);
  }

  addCollider() {}

  update(ctx: CanvasRenderingContext2D): void {
    this.anim.update(ctx);
  }

  move(vel: Vector2){
    this.pos.add(vel);
  }

}
