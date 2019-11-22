import { GuaImage } from "../types";

export const imageFromPath = path => {
  const img = new Image();
  img.src = path;
  return img;
};

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

export function loadImages(imagesMap) {
  return new Promise(resolve => {
    const promises = Object.keys(imagesMap).map(name => {
      const path = imagesMap[name];
      return loadImage(name, path);
    });

    Promise.all(promises).then(data => {
      const result = data.reduce((obj, { name, img }) => {
        obj[name] = img;
        return obj;
      }, {});
      resolve(result);
    });
  });
}

function loadImage(name, path) {
  return new Promise(resolve => {
    try {
      const img = document.createElement("img");
      img.onload = function() {
        resolve({ name, img });
      };
      img.src = path;
    } catch (error) {
      console.log(error);
    }
  });
}
