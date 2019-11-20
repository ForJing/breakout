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

  constructor() {
    const image = imageFromPath(blockImage);
    this.x = 100;
    this.y = 100;
    this.image = image;
    this.alive = true;
  }

  collide(ball: Ball) {
    return aCollideWithb(this, ball);
  }
}

export default Block;
