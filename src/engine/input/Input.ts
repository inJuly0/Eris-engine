export default class Input {
  keyDownMap: object;
  constructor() {
    this.keyDownMap = {};
    window.addEventListener("keydown", e => {
      this.keyDownMap[e.key] = true;
    });
    window.addEventListener("keyup", e => {
      this.keyDownMap[e.key] = false;
    });
  }

  isKeyPressed(key) {
    return this.keyDownMap[key];
  }

  onKeyPress(key: string, handler: CallableFunction) {
    window.addEventListener("keypress", e => {
      if (e.key === key) {
        handler();
      }
    });
  }
}
