import GuaGame from "../../gua_game/GuaGame";

const canvasWidth = 400;
const canvasHeight = 300;

class Ball {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;
  fired: boolean;

  constructor(game: GuaGame) {
    this.x = 50;
    this.y = 100;
    this.speedX = 5;
    this.speedY = 5;
    this.image = game.imageByName("ball");
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

  containsPoint(x: number, y: number) {
    if (
      this.x <= x &&
      this.x + this.image.width >= x &&
      this.y < y &&
      this.y + this.image.height > y
    ) {
      return true;
    }
    return false;
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
