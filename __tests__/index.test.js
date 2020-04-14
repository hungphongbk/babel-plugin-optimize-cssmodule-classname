import webpack from "webpack";
import MemoryFs from "memory-fs";
import config from "./fixtures/webpack.config";

function compile() {
  const compiler = webpack(config);

  compiler.outputFileSystem = new MemoryFs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(
        stats
          .toJson()
          .modules.filter(({ name }) => /(App|Button)\./.test(name))
          .map((m) => m.source)
      );
    });
  });
}

describe("webpack loader", () => {
  it("should convert file", async () => {
    const source = await compile();
    expect(source).toMatchSnapshot();
  }, 20000);
});
