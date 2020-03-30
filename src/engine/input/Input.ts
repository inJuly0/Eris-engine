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

  isPressed(key) {
    return this.keyDownMap[key];
  }

  onPress(key, handler) {
    window.addEventListener("keypress", e => {
      if (e.key === key) {
        handler();
      }
    });
  }
}
