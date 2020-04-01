import Vector2 from "../vector/vector.js";
import GraphicsComponent from "../graphics/GraphicsComponent.js";

export default class Entity {
  pos: Vector2;
  vel: Vector2;
  width: number;
  height: number;
  colliderMasks: object[];
  anim: GraphicsComponent;

  constructor(x: number, y: number) {
    this.pos = new Vector2(x, y);
  }

  initSprite(image: HTMLImageElement): void {
    this.anim = new GraphicsComponent(this, image);
  }

  addCollider() {}

  update(ctx: CanvasRenderingContext2D): void {
    this.anim.update(ctx);
  }
}
