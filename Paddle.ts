import { imageFromPath, aCollideWithb } from "./utils";
import { GuaImage } from "./types";

const canvasWidth = 400;
const canvasHeight = 300;
const paddleImage = require("./paddle.png");

class Paddle {
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;

  constructor() {
    const image = imageFromPath(paddleImage);
    this.x = 100;
    this.y = 200;
    this.speed = 15;
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

  moveLeft() {
    this.x -= this.speed;
    this.ajustPos();
  }

  moveRight() {
    this.x += this.speed;
    this.ajustPos();
  }

  collide(ball: GuaImage) {
    return aCollideWithb(this, ball);
  }
}

export default Paddle;
