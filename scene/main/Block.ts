import { imageFromPath, aCollideWithb } from '../../gua_game/utils';
import Ball from './Ball';
import GuaGame from '../../gua_game/GuaGame';

class Block {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;
  fired: boolean;
  alive: boolean;
  life: number;
  game: GuaGame;

  constructor(game: GuaGame, x = 100, y = 100, life = 1) {
    this.x = x;
    this.y = y;
    this.alive = true;
    this.life = life;
    this.game = game;

    const image = this.getImageBylife(life);
    this.image = image;
  }

  getImageBylife(life) {
    let image;
    if (life === 1) {
      image = this.game.imageByName("brokenBlock");
    }
    if (life === 2) {
      image = this.game.imageByName("block");
    }
    return image;
  }

  kill() {
    this.life--;
    this.image = this.getImageBylife(this.life);
    if (this.life <= 0) {
      this.alive = false;
    }
  }

  collide(ball: Ball) {
    return aCollideWithb(this, ball);
  }
}

export default Block;
