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
          /([sS])tyles$/.test(path.node.object.name) &&
          types.isIdentifier(path.node.property)
        ) {
          const oldName = path.node.property.name,
            [newName, isNew] = this.cache.get(oldName, "babel");
          path.node.property = types.identifier(newName);
          path.skip();
        }
      },
    },
  };
}
