import { Keydowns, GuaImage } from "./types";

class GuaGame {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  actions: any;
  33333333333;
  keydowns: Keydowns;
  fps: number;
  paused: boolean;
  images: any;

  constructor(fps = 30, images = {}) {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const context = canvas.getContext("2d");

    this.canvas = canvas;
    this.context = context;
    this.actions = {};
    this.keydowns = {};
    this.fps = fps;
    this.setTimer();
    this.setUpListeners();
    this.paused = false;
    this.images = images;
  }

  pause() {
    this.paused = !this.paused;
  }

  imageByName(name) {
    return this.images[name];
  }

  setTimer() {
    const that = this;
    function loop() {
      setTimeout(() => {
        // events
        const keys = Object.keys(that.actions);
        keys.forEach(key => {
          const action = that.actions[key];
          if (that.keydowns[key]) {
            action();
          }
        });

        // update
        that.update();

        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        // draw
        that.draw();

        loop();
      }, 1000 / that.fps);
    }
    loop();
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
