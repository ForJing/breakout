import "./style.scss";
const paddleImage = require("./paddle.png");

const log = console.log.bind(this);

const imageFromPath = path => {
  const img = new Image();
  img.src = path;
  return img;
};

class Paddle {
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;

  constructor() {
    const image = imageFromPath(paddleImage);
    this.x = 100;
    this.y = 200;
    this.speed = 5;
    this.image = image;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }
}

function __main() {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const paddle = new Paddle();

  setInterval(function() {
    paddle.moveRight();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(paddle.image, paddle.x, paddle.y);
  }, 1000 / 30);
}

__main();
