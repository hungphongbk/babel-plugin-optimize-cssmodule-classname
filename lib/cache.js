"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _incstr = _interopRequireDefault(require("incstr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cacheObj = new Map(),
      generate = _incstr.default.idGenerator({
  // Removed "d" letter to avoid accidental "ad" construct.
  // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
  // NOTE: allow "d" letter due to combination of UPPERCASES-lowercases
  alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  prefix: "_"
});

const cache = {
  get(key) {
    if (key[0] === "_") return key;

    if (typeof cacheObj.get(key) === "undefined") {
      cacheObj.set(key, generate());
    }

    console.log(key, cacheObj.get(key));
    return cacheObj.get(key);
  }

};
var _default = cache;
exports.default = _default;