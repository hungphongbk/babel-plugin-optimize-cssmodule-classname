"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _cache = _interopRequireDefault(require("./cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  types,
  template
}) {
  return {
    name: "optimize-cssmodule-classname",

    pre() {
      this.cache = _cache.default;
    },

    visitor: {
      MemberExpression(path) {
        if (types.isIdentifier(path.node.object) && /([sS])tyles$/.test(path.node.object.name)) {
          const oldName = path.node.property.name;
          path.node.property = types.identifier(this.cache.get(oldName));
        }
      }

    }
  };
}