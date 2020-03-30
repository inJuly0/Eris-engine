export default class Game {
  config;
  parent;
  canvas;
  ctx;
  constructor(config = { width: 480, height: 320 }, parent = document.body) {
    this.config = config;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute('width', config.width);
    this.canvas.setAttribute('height', config.height);
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }
}
