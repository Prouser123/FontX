const path = require("path");
const express = require("express");

// Console formatting
const console = require("prefix-logger")("fontx.express");
require("colors");

module.exports = (obj, port) => {
  const app = express();

  // Hotfix for when running through yargs CLI
  app.set("views", path.join(__dirname, "../views"));

  registerRoutes(app, obj);
  app.listen(port);
  console.log(`listening on port ${port}`.green);
  console.log(
    `WebView now available at: http://localhost:${port}/webview`.green
  );

  return app;
};

function registerRoutes(app, obj) {
  app.get("/webview", (req, res) => {
    res.render("index.ejs", {
      points: obj.data,
      fontFullName: obj.font.fullName
    });
  });

  app.get("/info", (req, res) => {
    res.json({
      postscriptName: obj.font.postscriptName,
      fullName: obj.font.fullName,
      familyName: obj.font.familyName,
      subFamilyName: obj.font.subFamilyName,
      copyright: obj.font.copyright,
      version: obj.font.version
    });
  });

  app.get("/points", (req, res) => {
    let out = [];
    obj.data.forEach(i => {
      out.push(i.point);
    });
    res.json(out);
  });

  app.get("/points/:p", (req, res) => {
    const found = obj.data.find(i => i.point == req.params.p);
    if (found != undefined) {
      res.set("X-Result-Found", "1");
      res.set("Cache-Control", "public, max-age=86400");
      res.type("image/svg+xml").send(found.file);
    } else {
      res.status(404).json({ error: "glyph not found" });
    }
  });
}
