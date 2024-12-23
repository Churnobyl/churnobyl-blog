export { createPages } from "./src/createPages";
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name].[hash].[ext]",
              outputPath: "static/",
              publicPath: "/static/",
            },
          },
        },
      ],
    },
  });
};
