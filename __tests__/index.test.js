import path from "path";
import webpack from "webpack";
import MemoryFs from "memory-fs";

function compile(rules) {
  const compiler = webpack({
    mode: "development",
    context: __dirname,
    entry: "./fixtures/App.js",
    output: {
      path: __dirname,
      filename: "bundle.js",
    },
    module: { rules },
  });

  compiler.outputFileSystem = new MemoryFs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);

      resolve(stats.toJson().modules.map((m) => m.source));
    });
  });
}
