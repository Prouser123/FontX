const debugLogger = require("prefix-logger")(
  "[" + "DEBUG".red + "] fontx.helpers.glyphToSVGFile"
);

function toHex(value) {
  return ("0000" + value.toString(16).toUpperCase()).slice(-4);
}

function createSVGTags(path, bbox) {
  const x_width = bbox.maxX - bbox.minX;
  const y_height = bbox.maxY - bbox.minY;

  const translate_x = -bbox.minX;
  const translate_y = y_height - bbox.maxY;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="${y_height}" width="${x_width}"><path d="${path}" transform="rotate(180) scale(-1,1) translate(${translate_x} ${translate_y})" transform-origin="50% 50%"/></svg>`;
}

function glyphToSVGFile(glyph, debug = false) {
  let svgPath = glyph.path.toSVG();
  let svg = createSVGTags(svgPath, glyph.path.bbox);
  // Debug Logging
  if (debug)
    debugLogger.log(
      (glyph.codePoints + " " + JSON.stringify(glyph.path.bbox)).grey
    );
  // Return the output
  return svg;
}
module.exports = {
  toHex,
  createSVGTags,
  glyphToSVGFile
};
