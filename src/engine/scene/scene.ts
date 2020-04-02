import Entity from "../entity/entity.js";
import Game from "../game/game";
import Group from "./groups.js";
import Collider from "../physics/Collider.js";

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
  group: Group;
  private _collisionMasks: Map<string, string>;

  constructor(name: string) {
    this.name = name;
    this.entities = [];
    this.group = new Group(this);
    this._collisionMasks = new Map<string, string>();

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
        this._collisionMasks.forEach((value, key) => {
          this.group.forEach(key, ent => {
            this.group.forEach(value, ent2 => {
              if(Collider.collision(ent, ent2)){
                const dir = Collider.getCollisionDirection(ent, ent2);

                switch(dir){
                  case 'top':
                    ent.pos.y = ent2.collider.top() - ent.collider.height;
                    break;
                  case 'left':
                    ent.pos.x = ent2.collider.left() - ent.collider.width;
                    break;
                  case 'bottom':
                    ent.pos.y = ent2.collider.bottom();
                    break;
                  case 'right':
                    ent.pos.x = ent2.collider.right();
                    break;
                }
              }
            });
          });
        });
        this.lag -= this.MS_PER_FRAME;
      }
      if (this.active) requestAnimationFrame(this.update);
    };
  }

  setCollision(key: string , val: string ): void {
    this._collisionMasks.set(key, val);
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
