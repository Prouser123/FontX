const fontkit = require("fontkit");
const fs = require("fs");

function toHex(value) {
  return ("0000" + value.toString(16).toUpperCase()).slice(-4);
}

function createSVGTags(path) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="${path}" transform="rotate(180) scale(-1,1)" transform-origin="50% 50%"/></svg>`;
}

function glyphToSVGFile(glyph) {
  let svgPath = glyph.path.toSVG();
  let svg = createSVGTags(svgPath);
  return svg;
}

// FUN PART

const font = fontkit.openSync("font.ttf");
const chars = font.characterSet;

const data = [];

chars.forEach(point => {
  let glyph = font.glyphForCodePoint(point);

  data.push({
    point: toHex(point),
    file: glyphToSVGFile(glyph)
  });
});

console.log(`Loaded ${data.length} glyphs.`);

data.forEach(i => {
  fs.writeFileSync(`out/${i.point}.svg`, i.file);
});

console.log("Saved!");
