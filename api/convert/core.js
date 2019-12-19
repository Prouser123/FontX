const fs = require("fs");

const { Font } = require("fonteditor-core");

const providers = require("./providers");

module.exports = (fontFileName, outFormat) => {
  const buffer = fs.readFileSync(fontFileName);

  const fileType = fontFileName.split(".").slice("-1")[0];

  console.log(fileType);

  let font = Font.create(buffer, {
    type: fileType
  });

  // Call the provider
  providers[outFormat](font);
};
