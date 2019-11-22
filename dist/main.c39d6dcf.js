// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"GuaGame.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GuaGame =
/** @class */
function () {
  function GuaGame(fps, images) {
    if (fps === void 0) {
      fps = 30;
    }

    if (images === void 0) {
      images = {};
    }

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    this.canvas = canvas;
    this.context = context;
    this.actions = {};
    this.keydowns = {};
    this.fps = fps;
    this.paused = false;
    this.images = images;
  }

  GuaGame.prototype.pause = function () {
    this.paused = !this.paused;
  };

  GuaGame.prototype.imageByName = function (name) {
    return this.images[name];
  };

  GuaGame.prototype.setTimer = function () {
    var that = this;

    function loop() {
      setTimeout(function () {
        // events
        var keys = Object.keys(that.actions);
        keys.forEach(function (key) {
          var action = that.actions[key];

          if (that.keydowns[key]) {
            action();
          }
        }); // update

        that.update();
        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height); // draw

        that.draw();
        loop();
      }, 1000 / that.fps);
    }

    loop();
  };

  GuaGame.prototype.setUpListeners = function () {
    var _this = this;

    window.addEventListener("keydown", function (event) {
      _this.keydowns[event.key] = true;
    });
    window.addEventListener("keyup", function (event) {
      _this.keydowns[event.key] = false;
    });
  };

  GuaGame.prototype.registerAction = function (key, callback) {
    this.actions[key] = callback;
  };

  GuaGame.prototype.draw = function () {
    this.scene.draw();
  };

  GuaGame.prototype.update = function () {
    this.scene.update();
  };

  GuaGame.prototype.drawImage = function (guaImage) {
    this.context.drawImage(guaImage.image, guaImage.x, guaImage.y);
  };

  GuaGame.prototype.run = function () {
    this.setUpListeners();
    this.setTimer();
  };

  return GuaGame;
}();

exports.default = GuaGame;
},{}],"utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.imageFromPath = function (path) {
  var img = new Image();
  img.src = path;
  return img;
};

function aCollideWithb(a, b) {
  if (a.x + a.image.width > b.x && a.x < b.image.width + b.x && a.y + a.image.height > b.y && a.y < b.y + b.image.height) {
    return true;
  } else {
    return false;
  }
}

exports.aCollideWithb = aCollideWithb;

function loadImages(imagesMap) {
  return new Promise(function (resolve) {
    var promises = Object.keys(imagesMap).map(function (name) {
      var path = imagesMap[name];
      return loadImage(name, path);
    });
    Promise.all(promises).then(function (data) {
      var result = data.reduce(function (obj, _a) {
        var name = _a.name,
            img = _a.img;
        obj[name] = img;
        return obj;
      }, {});
      resolve(result);
    });
  });
}

exports.loadImages = loadImages;

function loadImage(name, path) {
  return new Promise(function (resolve) {
    try {
      var img_1 = document.createElement("img");

      img_1.onload = function () {
        resolve({
          name: name,
          img: img_1
        });
      };

      img_1.src = path;
    } catch (error) {
      console.log(error);
    }
  });
}
},{}],"Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var canvasWidth = 400;
var canvasHeight = 300;

var Paddle =
/** @class */
function () {
  function Paddle(game) {
    this.x = 100;
    this.y = 200;
    this.speed = 15;
    this.image = game.imageByName("paddle");
  }

  Paddle.prototype.ajustPos = function () {
    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x + this.image.width >= canvasWidth) {
      this.x = canvasWidth - this.image.width;
    }
  };

  Paddle.prototype.moveLeft = function () {
    this.x -= this.speed;
    this.ajustPos();
  };

  Paddle.prototype.moveRight = function () {
    this.x += this.speed;
    this.ajustPos();
  };

  Paddle.prototype.collide = function (ball) {
    return utils_1.aCollideWithb(this, ball);
  };

  return Paddle;
}();

exports.default = Paddle;
},{"./utils":"utils.ts"}],"Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvasWidth = 400;
var canvasHeight = 300;

var Ball =
/** @class */
function () {
  function Ball(game) {
    this.x = 50;
    this.y = 100;
    this.speedX = 5;
    this.speedY = 5;
    this.image = game.imageByName("ball");
  }

  Ball.prototype.ajustPos = function () {
    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x + this.image.width >= canvasWidth) {
      this.x = canvasWidth - this.image.width;
    }
  };

  Ball.prototype.bounce = function () {
    this.speedY *= -1;
  };

  Ball.prototype.containsPoint = function (x, y) {
    if (this.x <= x && this.x + this.image.width >= x && this.y < y && this.y + this.image.height > y) {
      return true;
    }

    return false;
  };

  Ball.prototype.move = function () {
    if (this.fired) {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x + this.image.width > canvasWidth) {
        this.speedX *= -1;
      }

      if (this.y < 0 || this.y + this.image.height > canvasHeight) {
        this.bounce();
      }

      this.ajustPos();
    }
  };

  Ball.prototype.fire = function () {
    this.fired = true;
  };

  return Ball;
}();

exports.default = Ball;
},{}],"Block.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var Block =
/** @class */
function () {
  function Block(game, x, y, life) {
    if (x === void 0) {
      x = 100;
    }

    if (y === void 0) {
      y = 100;
    }

    if (life === void 0) {
      life = 1;
    }

    this.x = x;
    this.y = y;
    this.alive = true;
    this.life = life;
    this.game = game;
    var image = this.getImageBylife(life);
    this.image = image;
  }

  Block.prototype.getImageBylife = function (life) {
    var image;

    if (life === 1) {
      image = this.game.imageByName("brokenBlock");
    }

    if (life === 2) {
      image = this.game.imageByName("block");
    }

    return image;
  };

  Block.prototype.kill = function () {
    this.life--;
    this.image = this.getImageBylife(this.life);

    if (this.life <= 0) {
      this.alive = false;
    }
  };

  Block.prototype.collide = function (ball) {
    return utils_1.aCollideWithb(this, ball);
  };

  return Block;
}();

exports.default = Block;
},{"./utils":"utils.ts"}],"level.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Block_1 = __importDefault(require("./Block"));

var blocksArr = [{
  x: 50,
  y: 150,
  life: 2
}, {
  x: 100,
  y: 50
}];

function loadLevel(game) {
  var blocks = blocksArr.map(function (_a) {
    var x = _a.x,
        y = _a.y,
        life = _a.life;
    return new Block_1.default(game, x, y, life);
  });
  return blocks;
}

exports.loadLevel = loadLevel;
},{"./Block":"Block.ts"}],"scene_end.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SceneEnd =
/** @class */
function () {
  function SceneEnd(game) {
    this.game = game;
  }

  SceneEnd.prototype.draw = function () {
    var game = this.game;
    game.context.font = "16px Arial";
    game.context.fillText("\u6E38\u620F\u7ED3\u675F", 150, 150);
  };

  SceneEnd.prototype.update = function () {};

  return SceneEnd;
}();

exports.default = SceneEnd;
},{}],"scene.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Paddle_1 = __importDefault(require("./Paddle"));

var Ball_1 = __importDefault(require("./Ball"));

var level_1 = require("./level");

var scene_end_1 = __importDefault(require("./scene_end"));

var Scene =
/** @class */
function () {
  function Scene(game) {
    // 初始化
    var paddle = new Paddle_1.default(game);
    var ball = new Ball_1.default(game);
    var blocks = level_1.loadLevel(game);
    this.paddle = paddle;
    this.score = 0;
    this.ball = ball;
    this.blocks = blocks;
    this.game = game;
    game.registerAction("a", function () {
      return paddle.moveLeft();
    });
    game.registerAction("d", function () {
      return paddle.moveRight();
    });
    game.registerAction("f", function () {
      ball.fire();
    });
    game.canvas.addEventListener("mousedown", function (e) {
      var offsetX = e.offsetX,
          offsetY = e.offsetY;

      if (ball.containsPoint(offsetX, offsetY)) {
        function moveHanlder(e) {
          var targetX = e.offsetX,
              targetY = e.offsetY;
          ball.x = targetX - ball.image.width / 2;
          ball.y = targetY - ball.image.height / 2;
        }

        game.canvas.addEventListener("mousemove", moveHanlder);
        game.canvas.addEventListener("mouseup", function () {
          game.canvas.removeEventListener("mousemove", moveHanlder);
        });
      }
    });
  }

  Scene.prototype.draw = function () {
    var game = this.game;
    game.drawImage(this.paddle);
    game.drawImage(this.ball);
    this.blocks.forEach(function (block) {
      if (block.alive) {
        game.drawImage(block);
      }
    });
    game.context.font = "16px Arial";
    game.context.fillText("\u5206\u6570\uFF1A" + this.score, 0, 20);
  };

  Scene.prototype.update = function () {
    var _this = this;

    this.ball.move();

    if (this.ball.y > this.paddle.y) {
      var endScene = new scene_end_1.default(this.game);
      this.game.scene = endScene;
    } // 判断相撞


    if (this.paddle.collide(this.ball)) {
      this.ball.bounce();
    }

    this.blocks.forEach(function (block) {
      if (block.alive && block.collide(_this.ball)) {
        _this.score += 100;
        block.kill();

        _this.ball.bounce();
      }
    });
  };

  return Scene;
}();

exports.default = Scene;
},{"./Paddle":"Paddle.ts","./Ball":"Ball.ts","./level":"level.ts","./scene_end":"scene_end.ts"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"images/ball.png":[function(require,module,exports) {
module.exports = "ball.96931fde.png";
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "paddle.f48d929a.png";
},{}],"images/block.png":[function(require,module,exports) {
module.exports = "block.03745c6c.png";
},{}],"images/broke_broken.png":[function(require,module,exports) {
module.exports = "broke_broken.7ca61ecf.png";
},{}],"main.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GuaGame_1 = __importDefault(require("./GuaGame"));

var scene_1 = __importDefault(require("./scene"));

require("./style.scss");

var utils_1 = require("./utils");

var log = console.log.bind(this);

function __main() {
  return __awaiter(this, void 0, void 0, function () {
    var images, imgs, game, scene, fps, speedControl;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          images = {
            ball: require("./images/ball.png"),
            paddle: require("./images/paddle.png"),
            block: require("./images/block.png"),
            brokenBlock: require("./images/broke_broken.png")
          };
          return [4
          /*yield*/
          , utils_1.loadImages(images)];

        case 1:
          imgs = _a.sent();
          game = new GuaGame_1.default(30, imgs);
          scene = new scene_1.default(game);
          game.scene = scene;
          fps = 30;
          speedControl = document.getElementById("speed-control");

          speedControl.oninput = function (e) {
            fps = Number(e.target.value);
            game.fps = fps;
          };

          window.addEventListener("keydown", function (e) {
            if (e.key === "p") {
              game.pause();
            }
          });
          game.run();
          return [2
          /*return*/
          ];
      }
    });
  });
}

__main();
},{"./GuaGame":"GuaGame.ts","./scene":"scene.ts","./style.scss":"style.scss","./utils":"utils.ts","./images/ball.png":"images/ball.png","./images/paddle.png":"images/paddle.png","./images/block.png":"images/block.png","./images/broke_broken.png":"images/broke_broken.png"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59980" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=main.c39d6dcf.js.map