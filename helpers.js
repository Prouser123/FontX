function toHex(value) {
  return ("0000" + value.toString(16).toUpperCase()).slice(-4);
}

function createSVGTags(path) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="2048" width="2048"><path d="${path}" transform="rotate(180) scale(-1,1)" transform-origin="50% 50%"/></svg>`;
}

function glyphToSVGFile(glyph) {
  let svgPath = glyph.path.toSVG();
  let svg = createSVGTags(svgPath);
  return svg;
}
module.exports = {
  toHex,
  createSVGTags,
  glyphToSVGFile
};
