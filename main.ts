import "./style.scss";
import GuaGame from "./GuaGame";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Block from "./Block";
import { loadImages } from "./utils";

const log = console.log.bind(this);

const canvasWidth = 400;
const canvasHeight = 300;

const blocksArr = [
  { x: 50, y: 150, life: 2 },
  { x: 100, y: 50 }
];

async function __main() {
  const images = {
    ball: require("./ball.png"),
    paddle: require("./paddle.png"),
    block: require("./block.png"),

    brokenBlock: require("./broke_broken.png")
  };

  const imgs = await loadImages(images);

  const game = new GuaGame(30, imgs);
  const paddle = new Paddle(game);
  const ball = new Ball(game);

  let score = 0;

  let fps = 30;

  const speedControl = <HTMLInputElement>(
    document.getElementById("speed-control")
  );
  speedControl.oninput = function(e) {
    fps = Number((<HTMLInputElement>e.target).value);
    game.fps = fps;
  };

  const blocks = blocksArr.map(({ x, y, life }) => {
    return new Block(game, x, y, life);
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
        score += 100;
        block.kill();
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

    game.context.font = "16px Arial";
    game.context.fillText(`分数：${score}`, 0, 20);
  };
}

__main();
