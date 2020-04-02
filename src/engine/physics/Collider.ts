import Entity from "../entity/entity";

export default class Collider {
  parent: Entity;
  width: number;
  height: number;
  constructor(parent: Entity, width: number, height: number) {
    this.parent = parent;
    this.width = width;
    this.height = height;
  }

  top() {
    return this.parent.pos.y;
  }

  left() {
    return this.parent.pos.x;
  }

  right() {
    return this.parent.pos.x + this.width;
  }

  bottom() {
    return this.parent.pos.y + this.height;
  }

  static collision(bodyA: Entity, bodyB: Entity): boolean {
    return !(
      bodyA.collider.left() > bodyB.collider.right() ||
      bodyA.collider.right() < bodyB.collider.left() ||
      bodyA.collider.bottom() < bodyB.collider.top() ||
      bodyA.collider.top() > bodyB.collider.bottom()
    );
  }
}
