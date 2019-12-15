const empty = require("empty-dir");
const fs = require("fs");

// Console formatting
const console = require("prefix-logger")("fontx.export");
require("colors");

module.exports = (obj, outputFolderName) => {
  // Create the output folder if it does not already exist.
  try {
    if (!fs.existsSync(outputFolderName)) {
      fs.mkdirSync(outputFolderName);
      console.log(`created folder '${outputFolderName}'`.grey);
    }
  } catch (err) {
    console.error(`Error creating folder '${outputFolderName}': ${err}`);
    process.exit(2);
  }

  // Check if the directory is empty.
  if (!empty.sync(outputFolderName)) {
    console.error(`Folder '${outputFolderName}' not empty!`);
    process.exit(3);
  }

  console.log("saving glyphs...".grey);

  // Save the files.
  try {
    obj.data.forEach(i => {
      fs.writeFileSync(`${outputFolderName}/${i.point}.svg`, i.file);
    });
  } catch (err) {
    console.error(`Error saving files: ${err}`);
    process.exit(4);
  }

  console.log("done!".green);
};
