import { imageFromPath } from "./utils";

const canvasWidth = 400;
const canvasHeight = 300;

const ballImage = require("./ball.png");

class Ball {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;
  fired: boolean;

  constructor() {
    const image = imageFromPath(ballImage);
    this.x = 50;
    this.y = 100;
    this.speedX = 5;
    this.speedY = 5;
    this.image = image;
  }

  ajustPos() {
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x + this.image.width >= canvasWidth) {
      this.x = canvasWidth - this.image.width;
    }
  }

  bounce() {
    this.speedY *= -1;
  }

  move() {
    if (this.fired) {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x + this.image.width > canvasWidth) {
        this.speedX *= -1;
      }
      if (this.y < 0 || this.y + this.image.height > canvasHeight) {
        this.bounce();
      }
      this.ajustPos();
    }
  }

  fire() {
    this.fired = true;
  }
}

export default Ball;
