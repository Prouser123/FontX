const { writeFont, writeFileAsync } = require("../helpers");

const { woff2 } = require("fonteditor-core");

module.exports = async (font, outName) => {
  // Init the woff2 library
  await woff2.init();

  console.log(outName);

  // Write the font data to a buffer
  const output = writeFont(font, "woff2");

  // Async/Await FS.WriteFile, see ./core.js
  await writeFileAsync(`${outName}.woff2`, output);
};
