import { GuaImage } from "./types";

export const imageFromPath = path => {
  const img = new Image();
  img.src = path;
  return img;
};

// export function collide(a: GuaImage, b: GuaImage) {
//   if (aCollideWithb(a, b) || aCollideWithb(b, a)) {
//     return true;
//   } else {
//     return false;
//   }
// }

export function aCollideWithb(a: GuaImage, b: GuaImage) {
  if (
    a.x + a.image.width > b.x &&
    a.x < b.image.width + b.x &&
    a.y + a.image.height > b.y &&
    a.y < b.y + b.image.height
  ) {
    return true;
  } else {
    return false;
  }
}
