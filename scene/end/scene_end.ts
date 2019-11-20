import GuaGame from "../../gua_game/GuaGame";
import SceneTitle from "../title/scene_title";

class SceneEnd {
  game: GuaGame;

  constructor(game: GuaGame) {
    this.game = game;

    game.registerAction("r", () => {
      game.scene = new SceneTitle(game);
    });
  }

  draw() {
    const game = this.game;

    game.context.font = "16px Arial";
    game.context.fillText(`游戏结束 按r返回标题界面`, 100, 150);
  }

  update() {}
}

export default SceneEnd;
