import Entity from "../entity/entity";
import Vector2 from "../vector/vector.js";

type collisionSurface = 'top'|'bottom'|'left'|'right';

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

  static getCollisionDirection(a: Entity, b: Entity):collisionSurface {
    const dist: Vector2 = Vector2.sub(a.pos, b.pos);
    const dX: number = a.pos.x - b.pos.x,
      dY:number = a.pos.y - b.pos.y;

    if(Math.abs(dX) == Math.abs(dY)) {
        if(dY > 0) return 'bottom';
        return 'top';
    }
    else if(Math.abs(dX) > Math.abs(dY)){
        if(dX > 0) return 'right';
        return 'left';
    }else{
        if(dY > 0) return 'bottom';
        return 'top'
    }
  }
}
