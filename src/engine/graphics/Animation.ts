interface spriteData {
  image: HTMLImageElement;
  hFrames: number;
  vFrames: number;
}

interface animationData {
  start: number;
  end: number;
  count: number;
  loop?: boolean;
  delay?: number;
}

export default class Animation {
  spriteSheet: spriteData;
  animations: Map<string, animationData>;
  cycles: number;
  frameIndex: number;
  currentAnim: animationData;
  frameWidth: number;
  frameHeight: number;


  constructor(
    sheet: HTMLImageElement,
    hFrames: number = 1,
    vFrames: number = 1
  ) {
    this.spriteSheet = {} as spriteData;
    this.spriteSheet.image = sheet;
    this.spriteSheet.hFrames = hFrames;
    this.spriteSheet.vFrames = vFrames;
    this.animations = new Map<string, animationData>();
    this.cycles = 0;
    this.frameIndex = 0;
    this.currentAnim = null;
    this.frameWidth = sheet.width / vFrames;
    this.frameHeight = sheet.height / hFrames;
  }

  add(key: string, data: animationData): void {
    if (!data.delay) data.delay = 16;
    this.animations.set(key, data);
  }

  play(): void {}

  update() {
    if (!this.currentAnim) return;
    this.cycles++;
    if (this.cycles >= this.currentAnim.delay) {
      if (this.frameIndex > this.currentAnim.count) {
        if (this.currentAnim.loop) this.frameIndex = 0;
      }
      this.frameIndex++;
    }
  }

//   show(ctx: CanvasRenderingContext2D):void{
// 
//      ctx.drawImage(
//         this.spriteSheet.image,
//         this.frameIndex * this.frameWidth,
//         this.frameHeight,
//         this.currentAnim.width,
//         this.currentAnim.height,
//         this.currentAnim.pos.x,
//         this.currentAnim.pos.y,
//         this.currentAnim.width,
//         this.currentAnim.height
//       );
//   }

}
