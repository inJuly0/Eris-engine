import Scene from "../scene/scene.js";

export default class Game {
  config: { width: number; height: number; scenes?: Scene[] };
  parent: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scenes: Scene[];
  currentScene: Scene;
  constructor(
    config = { width: 480, height: 320, scenes: [] },
    parent = document.body
  ) {
    this.config = config;
    if (config.scenes) {
      this.currentScene = config.scenes[0];
      for (let scene of config.scenes) scene.setContext(this.ctx);
    }
    this.scenes = config.scenes || [];
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", config.width.toString());
    this.canvas.setAttribute("height", config.height.toString());
    parent.appendChild(this.canvas); 
    this.ctx = this.canvas.getContext("2d");
  }

  addScene(scene: Scene): void {
    scene.setContext(this.ctx);
    this.scenes.push(scene);
  }

  run() {
    this.currentScene = this.scenes[0];
    if (this.currentScene) this.currentScene.update();
  }
}
