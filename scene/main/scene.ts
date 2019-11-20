import GuaGame from "../../gua_game/GuaGame";
import Paddle from "./Paddle";
import Ball from "./Ball";
import { loadLevel } from "./level";
import Block from "./Block";
import SceneEnd from "../end/scene_end";

class Scene {
  game: GuaGame;
  paddle: Paddle;
  ball: Ball;
  blocks: Block[];
  score: number;

  constructor(game: GuaGame) {
    // 初始化
    const paddle = new Paddle(game);
    const ball = new Ball(game);
    const blocks = loadLevel(game);

    this.paddle = paddle;
    this.score = 0;
    this.ball = ball;
    this.blocks = blocks;
    this.game = game;

    game.registerAction("a", () => paddle.moveLeft());

    game.registerAction("d", () => paddle.moveRight());

    game.registerAction("f", () => {
      ball.fire();
    });

    game.canvas.addEventListener("mousedown", function(e) {
      const { offsetX, offsetY } = e;
      if (ball.containsPoint(offsetX, offsetY)) {
        function moveHanlder(e) {
          const { offsetX: targetX, offsetY: targetY } = e;

          ball.x = targetX - ball.image.width / 2;
          ball.y = targetY - ball.image.height / 2;
        }

        game.canvas.addEventListener("mousemove", moveHanlder);

        game.canvas.addEventListener("mouseup", () => {
          game.canvas.removeEventListener("mousemove", moveHanlder);
        });
      }
    });
  }

  draw() {
    const game = this.game;

    game.drawImage(this.paddle);
    game.drawImage(this.ball);

    this.blocks.forEach(block => {
      if (block.alive) {
        game.drawImage(block);
      }
    });

    game.context.font = "16px Arial";
    game.context.fillText(`分数：${this.score}`, 0, 20);
  }

  update() {
    this.ball.move();

    if (this.ball.y > this.paddle.y) {
      const endScene = new SceneEnd(this.game);
      this.game.scene = endScene;
    }

    // 判断相撞
    if (this.paddle.collide(this.ball)) {
      this.ball.bounce();
    }
    this.blocks.forEach(block => {
      if (block.alive && block.collide(this.ball)) {
        this.score += 100;
        block.kill();
        this.ball.bounce();
      }
    });
  }
}

export default Scene;
