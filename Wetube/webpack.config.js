const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  entry: "./src/client/js/main.js", // 우리가 변경하고자 하는 파일 (최신 자바스크립트 문법)
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  watch: true,
  mode: "development", // 개발모드 중임을 알리는 코드 (별도의 설정이 없으면 webpack은 mode를 default값으로 production으로 설정함. production의 경우 압축이 일어남)
  output: {
    // 처리된 결과물(모든 브라우저에서 사용가능한 문법)을 저장할 파일
    filename: "js/main.js", // 처리된 결과물이 path에 있는 값의 폴더에 filename의 값("main.js")으로 저장된다.
    path: path.resolve(__dirname, "assets"), // 처리된 결과물이 저장될 폴더
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
