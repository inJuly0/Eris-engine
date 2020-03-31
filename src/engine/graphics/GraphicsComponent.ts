import Entity from "../entity/entity";

interface frame {
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
  delay: number;
  direction?: string;
}

export default class GraphicsComponent {
  spriteSheet: HTMLImageElement;
  frameSets: Map<string, object>;
  frame: frame;
  frameIndex: number;
  parent: Entity | any;
  cycles: number;
  constructor(parent, spritesheet : HTMLImageElement) {
    this.parent = parent;
    this.spriteSheet = spritesheet;
    this.frameSets = new Map<string, object>();
    this.frame = null;
    this.frameIndex = 0;
    this.cycles = 0;
  }

  add(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    count: number,
    delay: number = 16,
    direction: string = "horizontal"
  ): void {
    this.frameSets.set(name, { x, y, width, height, count, delay, direction });
  }

  update(ctx: CanvasRenderingContext2D): void {
    this.cycles++;
    if (this.cycles > this.frame.delay) {
      this.cycles = 0;
      this.frameIndex =
        this.frameIndex >= this.frame.count - 1 ? 0 : this.frameIndex + 1;
    }
    this.show(ctx);
  }

  show(ctx: CanvasRenderingContext2D) {
    if (!this.frame) return;
    // TODO: extend  this so it can draw both vertically and horizontally
    ctx.drawImage(
      this.spriteSheet,
      this.frame.x + this.frameIndex * this.frame.width,
      this.frame.y,
      this.frame.width,
      this.frame.height,
      this.parent.pos.x,
      this.parent.pos.y,
      this.frame.width,
      this.frame.height
    );
  }
}
