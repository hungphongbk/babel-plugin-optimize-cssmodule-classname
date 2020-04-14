import cache from "./cache";
import * as babylon from "babylon";
import traverse from "babel-traverse";
import * as types from "babel-types";
import generate from "babel-generator";

function isExportLocalAssignment(node) {
  debugger;
  let rs = types.isMemberExpression(node.left);
  if (rs) rs &= types.isIdentifier(node.left.object, { name: "exports" });
  if (rs) rs &= types.isIdentifier(node.left.property, { name: "locals" });
  return rs;
}
const replaceTraverse = {
  ObjectProperty(path) {
    const property = path.node.key.value,
      newProperty = cache.get(property);
    path.node.key = types.stringLiteral(newProperty);
  },
};

export default function (source) {
  const ast = babylon.parse(source);
  traverse(ast, {
    AssignmentExpression(path) {
      if (isExportLocalAssignment(path.node)) {
        //do stuffs
        path.traverse(replaceTraverse);
      }
    },
  });
  const { code } = generate(ast, { sourceMaps: true }, source);
  // console.log(code);
  return code;
}
