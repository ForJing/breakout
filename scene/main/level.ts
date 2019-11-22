import Block from "./Block";
import GuaGame from "../../gua_game/GuaGame";

const blocksArr = [
  { x: 50, y: 150, life: 2 },
  { x: 100, y: 50 }
];

export function loadLevel(game: GuaGame): Array<Block> {
  const blocks = blocksArr.map(({ x, y, life }) => {
    return new Block(game, x, y, life);
  });
  return blocks;
}
