const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { resolve } = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8081,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    // plugins: [
    //   new CopyWebpackPlugin([
    //     {
    //       from: resolve(__dirname, "../public"), // 这个路径使用的是static目录相对于当前js文件的相对路径
    //       to: "public",
    //       ignore: [".*"], // 匹配所有，把static目录下文件一股脑全部作为静态资源打包，省的一些幺蛾子
    //     },
    //   ]),
    // ],
  },
});
