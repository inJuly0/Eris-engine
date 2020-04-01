import Entity from "../entity/entity";
import Game from "../game/game";

export default class Scene {
  name: string; // name so that the scene can be referenced later
  entities: Entity[]; // entities specific to this scene
  ctx: CanvasRenderingContext2D;
  update: any;
  readonly MS_PER_FRAME: number; // Milliseconds each frame lasts
  previous: number; // last time the scene was rendered
  lag: number; // lag between the previous and current render
  active: boolean;
  private parentGame: Game;

  constructor(name: string) {
    this.name = name;
    this.entities = [];
    this.previous = Date.now();
    this.lag = 0;
    this.MS_PER_FRAME = 16;
    this.active = true;
    this.update = (): void => {
      let current: number = Date.now();
      let elapsed = current - this.previous;
      this.previous = current;
      this.lag += elapsed;

      while (this.lag > this.MS_PER_FRAME) {
        this.loop();
        this.lag -= this.MS_PER_FRAME;
      }
      if (this.active) requestAnimationFrame(this.update);
    };
  }

  // the loop and create functions are typically overridden by the user

  setParentGame(game: Game): void {
    this.parentGame = game;
  }

  create(): void {}

  loop(): void {
    for (let entity of this.entities) entity.update(this.ctx);
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
}
