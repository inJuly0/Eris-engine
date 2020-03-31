import Vector2 from "../vector/vector.js";
import GraphicsComponent from "../graphics/GraphicsComponent.js";

export default class Entity {
  pos: Vector2;
  vel: Vector2;
  width: number;
  height: number;
  colliderMasks: object[];
  anim: GraphicsComponent;

  constructor(x: number, y: number, width: number, height: number) {
    this.pos = new Vector2(x, y);
    this.vel = new Vector2(0, 0);
    this.width = width;
    this.height = height;
  }

  initSprite(image: HTMLImageElement): void {
    this.anim = new GraphicsComponent(this, image);
  }

  initPhysics() {}

  update(ctx: CanvasRenderingContext2D): void {
    this.anim.update(ctx);
  }
}
