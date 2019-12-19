const fs = require("fs");
const { promisify } = require("util");

const writeFont = (font, type) => {
  return font.write({
    type,
    // Improved visibility at lower screen resolutions
    hinting: true
  });
};

const writeFileAsync = promisify(fs.writeFile);

module.exports = {
  writeFont,
  writeFileAsync
};
