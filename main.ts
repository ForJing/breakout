import "./style.scss";
import GuaGame from "./GuaGame";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Block from "./Block";

const log = console.log.bind(this);

const canvasWidth = 400;
const canvasHeight = 300;

function __main() {
  const game = new GuaGame();
  const paddle = new Paddle();
  const ball = new Ball();
  const block = new Block();

  game.registerAction("a", () => paddle.moveLeft());

  game.registerAction("d", () => paddle.moveRight());

  game.registerAction("f", () => {
    ball.fire();
  });

  game.update = function() {
    ball.move();

    // 判断相撞
    if (paddle.collide(ball)) {
      ball.bounce();
    }
    if (block.collide(ball)) {
      block.alive = false;
      ball.bounce();
    }
  };

  game.draw = function() {
    game.drawImage(paddle);
    game.drawImage(ball);

    if (block.alive) {
      game.drawImage(block);
    }
  };
}

__main();
