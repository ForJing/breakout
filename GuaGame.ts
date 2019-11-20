import { Keydowns, GuaImage } from "./types";

class GuaGame {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  actions: any;
  keydowns: Keydowns;

  constructor() {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const context = canvas.getContext("2d");

    this.canvas = canvas;
    this.context = context;
    this.actions = {};
    this.keydowns = {};
    this.setTimer();
    this.setUpListeners();
  }

  setTimer() {
    setInterval(() => {
      // events
      const keys = Object.keys(this.actions);
      keys.forEach(key => {
        const action = this.actions[key];
        if (this.keydowns[key]) {
          action();
        }
      });

      // update
      this.update();

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // draw
      this.draw();
    }, 1000 / 30);
  }

  setUpListeners() {
    window.addEventListener("keydown", event => {
      this.keydowns[event.key] = true;
    });
    window.addEventListener("keyup", event => {
      this.keydowns[event.key] = false;
    });
  }

  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  draw() {}

  update() {}

  drawImage(guaImage: GuaImage) {
    this.context.drawImage(guaImage.image, guaImage.x, guaImage.y);
  }
}

export default GuaGame;
