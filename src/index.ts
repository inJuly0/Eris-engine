import Eris from "./engine/eris.js";
import Entity from "./engine/entity/entity.js";
import Vector2 from "./engine/vector/vector.js";

const game = new Eris.Game();
const input = new Eris.Input();

const spriteSheet = document.getElementById("sprite") as HTMLImageElement;


class TestScene extends Eris.Scene {
  player: Entity;
  moveDir: Vector2;
  moveSpeed: number;
  constructor(name: string) {
    super(name);
    this.moveSpeed = 2;
  }

  create() {
    const ent = new Eris.Entity(50, 50);
    this.player = ent;
    ent.initSprite(spriteSheet);
    ent.anim.add("idle", 0, 0, 16, 16, 1, false);
    ent.anim.play("idle");
    this.group.add("player", ent);
    this.ctx.scale(2, 2);
  }

  loop() {
    this.clearScreen();
    this.movementLoop();
    this.player.update(this.ctx);
  }

  movementLoop() {
    const motion = Vector2.zero();
    if (input.isKeyPressed("a")) motion.x -= 1;
    if (input.isKeyPressed("d")) motion.x += 1;
    if (input.isKeyPressed("s")) motion.y += 1;
    if (input.isKeyPressed("w")) motion.y -= 1;
    this.player.move(Vector2.mult(motion, this.moveSpeed));
  }
}

const scene1 = new TestScene("demo");
game.addScene("demo", scene1);
game.play("demo");
