const fontkit = require("fontkit");
const express = require("express");
const fs = require("fs");

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

// FUN PART

const font = fontkit.openSync("font.ttf");
const chars = font.characterSet;

const data = [];

chars.forEach(decimalPoint => {
  const point = toHex(decimalPoint);
  if (!(["000D", "0020"].indexOf(point) > -1)) {
    let glyph = font.glyphForCodePoint(decimalPoint);

    data.push({
      point: point,
      file: glyphToSVGFile(glyph)
    });
  } else {
    console.log(`skipping default character ${point}`);
  }
});

console.log(`${font.numGlyphs} glyphs available.`);
console.log(`Loaded ${data.length} glyphs.`);

//data.forEach(i => {
//  fs.writeFileSync(`out/${i.point}.svg`, i.file);
//});

const app = express();

//app.use("/static", express.static("web"));
app.get("/webview", (req, res) => {
  res.render("index.ejs", {
    points: data,
    fontFullName: font.fullName
  });
});

app.get("/info", (req, res) => {
  res.json({
    postscriptName: font.postscriptName,
    fullName: font.fullName,
    familyName: font.familyName,
    subFamilyName: font.subFamilyName,
    copyright: font.copyright,
    version: font.version
  });
});

app.get("/points", (req, res) => {
  let out = [];
  data.forEach(i => {
    out.push(i.point);
  });
  res.json(out);
});

app.get("/points/:p", (req, res) => {
  const found = data.find(i => i.point == req.params.p);
  if (found != undefined) {
    res.set("X-Result-Found", "1");
    res.set("Cache-Control", "public, max-age=86400");
    res.type("image/svg+xml").send(found.file);
  } else {
    res.status(404).json({ error: "glyph not found" });
  }
});

app.listen(3000);

console.log("Ready!");
