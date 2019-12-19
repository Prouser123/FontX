const { writeFont, writeFileAsync } = require("../helpers");

module.exports = async (font, filename, ext) => {
  // Write the font data to a buffer
  const output = writeFont(font, ext);

  // Async/Await FS.WriteFile, see ./core.js
  await writeFileAsync(`${filename}.${ext}`, output);
};
