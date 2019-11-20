import GuaGame from "./GuaGame";
import Scene from "./scene";
import "./style.scss";
import { loadImages } from "./utils";

const log = console.log.bind(this);

async function __main() {
  const images = {
    ball: require("./ball.png"),
    paddle: require("./paddle.png"),
    block: require("./block.png"),

    brokenBlock: require("./broke_broken.png")
  };

  const imgs = await loadImages(images);
  const game = new GuaGame(30, imgs);
  const scene = new Scene(game);
  game.scene = scene;

  // let score = 0;

  let fps = 30;

  const speedControl = <HTMLInputElement>(
    document.getElementById("speed-control")
  );
  speedControl.oninput = function(e) {
    fps = Number((<HTMLInputElement>e.target).value);
    game.fps = fps;
  };

  window.addEventListener("keydown", e => {
    if (e.key === "p") {
      game.pause();
    }
  });

  game.run();
}

__main();
