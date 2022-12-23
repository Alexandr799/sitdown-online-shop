const path = require("path");

module.exports = {
  entry: {
    index: "./src/scripts/index.js",
    cart: "./src/scripts/cart.js",
    catalog:'./src/scripts/catalog.js',
    def:'./src/scripts/def.js'
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
  }
};
