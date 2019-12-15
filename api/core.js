const fs = require("fs");
const fontkit = require("fontkit");

// Console formatting
const console = require("prefix-logger")("fontx.core");
require("colors");

const { toHex, glyphToSVGFile } = require("./helpers");

// Initialisation function
module.exports = fontFileName => {
  console.log(("loading with file: " + fontFileName).yellow);

  // Variables
  if (!fs.existsSync(fontFileName)) {
    console.error("file does not exist!");
    process.exit(1);
  }
  const font = fontkit.openSync(fontFileName);
  const chars = font.characterSet;
  const data = [];

  // Loop through each glyph and add to data array.
  chars.forEach(decimalPoint => {
    const point = toHex(decimalPoint);
    if (!(["000D", "0020"].indexOf(point) > -1)) {
      let glyph = font.glyphForCodePoint(decimalPoint);

      data.push({
        point: point,
        file: glyphToSVGFile(glyph)
      });
    } else {
      console.log(`skipping default character ${point}`.grey);
    }
  });

  // Log some info
  console.log(`${font.numGlyphs} glyphs available.`.cyan);
  console.log(`Loaded ${data.length} glyphs.`.cyan);

  return {
    font,
    chars,
    data
  };
};
