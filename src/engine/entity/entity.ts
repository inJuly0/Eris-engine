import Vector2 from "../vector/vector.js";
import GraphicsComponent from "../graphics/GraphicsComponent.js";
import Collider from "../physics/Collider.js";
import Scene from "../scene/scene.js";

export default class Entity {
  pos: Vector2;
  vel: Vector2;
  width: number;
  height: number;
  _colliderMasks: object[];
  anim: GraphicsComponent;
  _groupKeys: string[];
  collider: Collider;
  _parentScene: Scene;
  // TODO: Add more funcionality to this achor
  anchor: Vector2;

  constructor(x: number, y: number) {
    this.pos = new Vector2(x, y);
    this._groupKeys = [];
  }

  initSprite(image: HTMLImageElement): void {
    this.anim = new GraphicsComponent(this, image);
  }

  addCollider(width: number, height: number) {
    this.collider = new Collider(this, width, height);
  }

  update(ctx: CanvasRenderingContext2D): void {
    this.anim.update(ctx);
  }

  move(vel: Vector2) {
    this.pos.add(vel);
  }
}
