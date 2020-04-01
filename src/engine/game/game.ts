import Scene from "../scene/scene.js";

interface gameConfig {
  width: number;
  height: number;
  scenes?: Map<string, Scene>;
}

export default class Game {
  config: gameConfig;
  parent: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  currentScene: Scene;
  scenes: Map<string, Scene>;
  constructor(
    config = { width: 480, height: 320, scenes: new Map<string, Scene>() },
    parent = document.body
  ) {
    this.config = config;
    this.scenes = new Map<string, Scene>();
    if (config.scenes) {
      for (let key in config.scenes) {
        this.addScene(key, config.scenes.get(key));
      }
    }

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", config.width.toString());
    this.canvas.setAttribute("height", config.height.toString());
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  addScene(key: string, scene: Scene): void {
    scene.setContext(this.ctx);
    scene.setParentGame(this);
    this.scenes.set(key, scene);
  }

  play(key: string) {
    let tempScene = this.scenes.get(key);
    if(!tempScene) return;
    this.currentScene = tempScene;
    tempScene.create();
    tempScene.update();      
  }
}
