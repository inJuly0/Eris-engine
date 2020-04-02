import Entity from "../entity/entity";
import Game from "../game/game";
import Group from "./groups.js";

export default class Scene {
  name: string; // name so that the scene can be referenced later
  entities: Entity[]; // entities specific to this scene
  ctx: CanvasRenderingContext2D;
  update: FrameRequestCallback;
  readonly MS_PER_FRAME: number; // Milliseconds each frame lasts
  previous: number; // last time the scene was rendered
  lag: number; // lag between the previous and current render
  active: boolean;
  private parentGame: Game;
  group: Group;
  private _collisionMasks: Map<string|Entity,  any[]>;

  constructor(name: string) {
    this.name = name;
    this.entities = [];
    this.group = new Group();
    this._collisionMasks = new Map<string|Entity, any[]>();

    // The update loop of the game, called 60 times a second
    // TODO: make the FPS user controllable.

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


  setCollision(key: string | Entity, val: string | Entity): void{
    if(this._collisionMasks.has(key)){
      this._collisionMasks.get(key).push(val);
    }else{
      this._collisionMasks.set(key, [val]);
    }
  }   

  // the loop and create functions are typically overridden by the user

  setParentGame(game: Game): void {
    this.parentGame = game;
  }

  clearScreen(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  create(): void {}

  loop(): void {
    for (let entity of this.entities) entity.update(this.ctx);
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
}
