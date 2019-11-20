import { imageFromPath, aCollideWithb } from "./utils";
import { GuaImage } from "./types";
import GuaGame from "./GuaGame";

const canvasWidth = 400;
const canvasHeight = 300;

class Paddle {
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;
  game: GuaGame;

  constructor(game: GuaGame) {
    this.x = 100;
    this.y = 200;
    this.speed = 15;
    this.image = game.imageByName("paddle");
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
