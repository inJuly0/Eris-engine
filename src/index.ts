import Eris from "./engine/eris.js";
import Entity from "./engine/entity/entity.js";
import Vector2 from "./engine/vector/vector.js";
import Collider from "./engine/physics/Collider.js";

const game = new Eris.Game();
const input = new Eris.Input();

const spriteSheet = document.getElementById("sprite") as HTMLImageElement;
const enemySprite = document.getElementById("enemy-sprite") as HTMLImageElement;
console.log(spriteSheet.height);

class TestScene extends Eris.Scene {
  player: Entity;
  moveDir: Vector2;
  moveSpeed: number;
  spriteDir: string;
  constructor(name: string) {
    super(name);
    this.moveSpeed = 2;
    this.moveDir = Vector2.zero();
    this.spriteDir = "down";
  }

  create() {
    this.player = new Eris.Entity(50, 50);
    this.player.initSprite(spriteSheet);
    this.initPlayerAnims();
    this.group.newGroup("enemies");
    this.group.newGroup("player");
    this.group.add('player', this.player);
    this.spawnEnemy();
    this.ctx.scale(3, 3);
    this.player.addCollider(16, 16);
    this.setCollision('player', 'enemies');
    console.log(this.group.get("enemies"));
  }

  loop() {
    this.clearScreen();
    this.movementLoop();
    this.animLoop();
    this.group.forEach("enemies", e => {
      e.update(this.ctx);
    });
    this.player.update(this.ctx);
  }

  movementLoop() {
    if (input.isKeyPressed("a")) this.moveDir.x = -1;
    else if (input.isKeyPressed("d")) this.moveDir.x = 1;
    else this.moveDir.x = 0;
    if (input.isKeyPressed("s")) this.moveDir.y = 1;
    else if (input.isKeyPressed("w")) this.moveDir.y = -1;
    else this.moveDir.y = 0;

    this.player.move(Vector2.mult(this.moveDir, this.moveSpeed));
  }

  initPlayerAnims() {
    this.player.anim.add("idledown", 0, 0, 16, 16, 1, false);
    this.player.anim.add("idleup", 32, 0, 16, 16, 1, false);
    this.player.anim.add("idleright", 64, 0, 16, 16, 1, false);
    this.player.anim.add("idleleft", 96, 0, 16, 16, 1, false);
    this.player.anim.add("walkdown", 0, 0, 16, 16, 2, true);
    this.player.anim.add("walkup", 32, 0, 16, 16, 2, true);
    this.player.anim.add("walkright", 64, 0, 16, 16, 2, true);
    this.player.anim.add("walkleft", 96, 0, 16, 16, 1, true);
    this.player.anim.play("idledown");
  }

  animLoop() {
    if (this.moveDir.equals(Vector2.left())) this.spriteDir = "left";
    if (this.moveDir.equals(Vector2.up())) this.spriteDir = "up";
    if (this.moveDir.equals(Vector2.right())) this.spriteDir = "right";
    if (this.moveDir.equals(Vector2.down())) this.spriteDir = "down";

    if (this.moveDir.equals(Vector2.zero())) {
      this.player.anim.play("idle" + this.spriteDir);
      return;
    }

    const anim = "walk" + this.spriteDir;
    this.player.anim.play(anim);
  }

  spawnEnemy() {
    const enemy = new Entity(70, 70);
    enemy.addCollider(16, 16);
    enemy.initSprite(enemySprite);
    enemy.anim.add("idle", 0, 0, 16, 16, 1, false);
    enemy.anim.play("idle");
    this.group.add("enemies", enemy);
  }
}

const scene1 = new TestScene("demo");
game.addScene("demo", scene1);
game.play("demo");
