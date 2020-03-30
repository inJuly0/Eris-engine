export default class Game {
  config: { width: number; height: number; stages?: number[]};
  parent: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(config = { width: 480, height: 320 }, parent = document.body) {
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', config.width.toString());
    this.canvas.setAttribute('height', config.height.toString());
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }
}
