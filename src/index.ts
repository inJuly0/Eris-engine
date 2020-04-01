import Eris from "./engine/eris.js";
import Entity from "./engine/entity/entity.js";
import Input from "./engine/input/Input.js";

const game = new Eris.Game();
const input = new Input();

const spriteSheet = document.getElementById("sprite") as HTMLImageElement;

class TestScene extends Eris.Scene {
  constructor(name: string) {
    super(name);
  }

  init() {
    const ent = new Entity(50, 50);
    ent.initSprite(spriteSheet);
    ent.anim.add("idle", 0, 0, 16, 16, 1, false);
    ent.anim.play("idle");
    
  }

  loop() {}
}

const scene1 = new TestScene("demo");
game.addScene('demo', scene1);
console.log(scene1);
game.currentScene = scene1;
game.play('demo');
