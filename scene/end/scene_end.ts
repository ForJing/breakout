import GuaGame from "../../gua_game/GuaGame";

class SceneEnd {
  game: GuaGame;

  constructor(game: GuaGame) {
    this.game = game;
  }

  draw() {
    const game = this.game;

    game.context.font = "16px Arial";
    game.context.fillText(`游戏结束`, 150, 150);
  }

  update() {}
}

export default SceneEnd;
