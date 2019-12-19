const c = require("./common");

const woff2 = require("./woff2");

// TODO
const svg = {};

module.exports = {
  ttf: (font, outName) => c(font, outName, "ttf"),
  woff: (font, outName) => c(font, outName, "woff"),
  woff2,
  eot: (font, outName) => c(font, outName, "eot")
};
