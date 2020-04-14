import path from "path";
const postcssNormalize = require("postcss-normalize");
const cssModuleRegex = /\.module\.css$/;
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    cssOptions.modules && require.resolve("../../src/loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009",
            },
            stage: 3,
          }),
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          postcssNormalize(),
        ],
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve("resolve-url-loader"),
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};

export default {
  mode: "development",
  context: __dirname,
  entry: path.resolve(__dirname, "./App.js"),
  output: {
    path: __dirname,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: __dirname,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              presets: [
                "@babel/preset-react",
                ["@babel/preset-env", { modules: false }],
              ],
              plugins: [require.resolve("../../src/index.js")],
            },
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve("babel-preset-react-app/dependencies"),
                  { helpers: true },
                ],
              ],
            },
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
        ],
      },
    ],
  },
};
