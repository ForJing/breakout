import { imageFromPath, aCollideWithb } from "./utils";
import { GuaImage } from "./types";
import Ball from "./Ball";

const blockImage = require("./block.png");

class Block {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;
  fired: boolean;
  alive: boolean;

  constructor(x = 100, y = 100) {
    const image = imageFromPath(blockImage);
    this.x = x;
    this.y = y;
    this.image = image;
    this.alive = true;
  }

  collide(ball: Ball) {
    return aCollideWithb(this, ball);
  }
}

export default Block;
