import GuaGame from "../../gua_game/GuaGame";
import Scene from "../main/scene";

class SceneTitle {
  game: GuaGame;

  constructor(game: GuaGame) {
    this.game = game;

    game.registerAction("k", () => {
      game.scene = new Scene(game);
    });
  }

  draw() {
    const game = this.game;

    game.context.font = "16px Arial";
    game.context.fillText(`按 k 开始游戏`, 150, 150);
  }

  update() {}
}

export default SceneTitle;
