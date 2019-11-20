import "./style.scss";
import GuaGame from "./GuaGame";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Block from "./Block";

const log = console.log.bind(this);

const canvasWidth = 400;
const canvasHeight = 300;

const blocksArr = [
  { x: 50, y: 150 },
  { x: 100, y: 50 }
];

function __main() {
  const game = new GuaGame(10);
  const paddle = new Paddle();
  const ball = new Ball();
  const block = new Block();

  const blocks = blocksArr.map(({ x, y }) => {
    return new Block(x, y);
  });

  game.registerAction("a", () => paddle.moveLeft());

  game.registerAction("d", () => paddle.moveRight());

  window.addEventListener("keydown", e => {
    if (e.key === "p") {
      game.pause();
    }
  });

  game.registerAction("f", () => {
    ball.fire();
  });

  game.update = function() {
    if (game.paused) {
      return;
    }
    ball.move();

    // 判断相撞
    if (paddle.collide(ball)) {
      ball.bounce();
    }
    blocks.forEach(block => {
      if (block.alive && block.collide(ball)) {
        block.alive = false;
        ball.bounce();
      }
    });
  };

  game.draw = function() {
    game.drawImage(paddle);
    game.drawImage(ball);

    blocks.forEach(block => {
      if (block.alive) {
        game.drawImage(block);
      }
    });
  };
}

__main();
