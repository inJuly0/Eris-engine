import Eris from './engine/eris.js';
import Entity from './engine/entity/entity.js';
import Input from './engine/input/Input.js';
import Vector2 from './engine/vector/vector.js';

const game = new Eris.Game();
const input = new Input();

const spriteSheet = document.getElementById('sprite') as HTMLImageElement;

class TestScene extends Eris.Scene {
  player: Entity;
  constructor(name: string) {
    super(name);
  }
  create() {
    const ent = new Entity(50, 50);
    this.player = ent;
    ent.initSprite(spriteSheet);
    ent.anim.add('idle', 0, 0, 16, 16, 1, false);
    ent.anim.play('idle');
    this.group.add('player', ent);    
  }

  loop() {
    this.clearScreen();
    this.player.update(this.ctx);
  }
}

const scene1 = new TestScene('demo');
game.addScene('demo', scene1);
console.log(scene1);
game.currentScene = scene1;
game.play('demo');
