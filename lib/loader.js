"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _cache = _interopRequireDefault(require("./cache"));

var babylon = _interopRequireWildcard(require("babylon"));

var _babelTraverse = _interopRequireDefault(require("babel-traverse"));

var types = _interopRequireWildcard(require("babel-types"));

var _babelGenerator = _interopRequireDefault(require("babel-generator"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isExportLocalAssignment(node) {
  debugger;
  let rs = types.isMemberExpression(node.left);
  if (rs) rs &= types.isIdentifier(node.left.object, {
    name: "exports"
  });
  if (rs) rs &= types.isIdentifier(node.left.property, {
    name: "locals"
  });
  return rs;
}

const replaceTraverse = {
  ObjectProperty(path) {
    const property = path.node.key.value,
          newProperty = _cache.default.get(property);

    path.node.key = types.stringLiteral(newProperty);
  }

};

function _default(source) {
  const ast = babylon.parse(source);
  (0, _babelTraverse.default)(ast, {
    AssignmentExpression(path) {
      if (isExportLocalAssignment(path.node)) {
        //do stuffs
        path.traverse(replaceTraverse);
      }
    }

  });
  const {
    code
  } = (0, _babelGenerator.default)(ast, {
    sourceMaps: true
  }, source); // console.log(code);

  return code;
}