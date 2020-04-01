import Entity from "../entity/entity";

export default class Scene {
  name: string;
  entities: Entity[];
  ctx: CanvasRenderingContext2D;
  update: any;
  readonly MS_PER_FRAME: number;
  previous: number;
  lag: number;

  constructor(name: string) {
    this.name = name;
    this.entities = [];
    this.previous = Date.now();
    this.lag = 0;
    this.MS_PER_FRAME = 16;
    this.update = () => {
      let current: number = Date.now();
      let elapsed = current - this.previous;
      this.previous = current;
      this.lag += elapsed;

      while (this.lag > this.MS_PER_FRAME) {
        this.loop();
        this.lag -= this.MS_PER_FRAME;
      }
      requestAnimationFrame(this.update);
    };
  }

  loop(): void {
    for (let entity of this.entities) entity.update(this.ctx);
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
}
