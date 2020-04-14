import cache from "./cache";

export default function ({ types, template }) {
  return {
    name: "optimize-cssmodule-classname",
    pre() {
      this.cache = cache;
    },
    visitor: {
      MemberExpression(path) {
        if (
          types.isIdentifier(path.node.object) &&
          /([sS])tyles$/.test(path.node.object.name)
        ) {
          const oldName = path.node.property.name;
          path.node.property = types.identifier(this.cache.get(oldName));
        }
      },
    },
  };
}
