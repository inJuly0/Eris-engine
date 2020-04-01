import Entity from "../entity/entity";

interface frameSet {
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
  delay: number;
  loop: boolean;
  direction?: string;
}

export default class GraphicsComponent {
  spriteSheet: HTMLImageElement;
  frameSets: Map<string, frameSet>;
  currentFrameSet: frameSet;
  frameIndex: number;
  parent: Entity | any;
  cycles: number;
  constructor(parent, spritesheet : HTMLImageElement) {
    this.parent = parent;
    this.spriteSheet = spritesheet;
    this.frameSets = new Map<string, frameSet>();
    this.currentFrameSet = null;
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
    loop: boolean = true,
    delay: number = 16,
    direction: string = "horizontal"
  ): void {
    this.frameSets.set(name, { x, y, width, height, count, loop, delay : delay, direction });
  }

  update(ctx: CanvasRenderingContext2D): void {

    if(!this.currentFrameSet) return;
    this.cycles++;
    if (this.cycles > this.currentFrameSet.delay) {
      this.cycles = 0;
      this.frameIndex =
        this.frameIndex >= this.currentFrameSet.count - 1 ? 0 : this.frameIndex + 1;
    }
    this.show(ctx);
  }

  play(key: string){
    this.currentFrameSet = this.frameSets.get(key);
  }

  show(ctx: CanvasRenderingContext2D) {
    // TODO: extend  this so it can draw both vertically and horizontally
    ctx.drawImage(
      this.spriteSheet,
      this.currentFrameSet.x + this.frameIndex * this.currentFrameSet.width,
      this.currentFrameSet.y,
      this.currentFrameSet.width,
      this.currentFrameSet.height,
      this.parent.pos.x,
      this.parent.pos.y,
      this.currentFrameSet.width,
      this.currentFrameSet.height
    );
  }
}
