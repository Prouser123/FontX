const fs = require("fs");

const { Font } = require("fonteditor-core");

const providers = require("./providers");

const console = require("prefix-logger")("fontx.convert");

// TODO
// CHECK INPUT / OUTPUT files

// SVG OUT + IN

// OTF OUT

const getFormat = file => {
  return file.split(".").slice("-1")[0];
};

const getName = file => {
  return file.split("." + getFormat(file))[0];
};

const providerArray = () => {
  return Object.keys(providers);
};

const inputFileSupported = file => {
  const arr = providerArray();

  // Currently otf is supported as an input method but not as an output method
  arr.push("otf");

  return arr.includes(getFormat(file));
};

const outputFileSupported = file => {
  return providerArray().includes(getFormat(file));
};

module.exports = (inFile, outFile) => {
  // INPUT CHECK
  // [x] File exists
  // [ ] File is a font?? (maybe just do a try catch over the import)
  // OUTPUT CHECK
  // [x] file ext
  // [x] file DOES NOT EXIST

  if (!fs.existsSync(inFile)) {
    console.error(`input file '${inFile}' does not exist!`);
    process.exit(1);
  }

  if (!inputFileSupported(inFile)) {
    console.error(`input file '${inFile}' not supported!`);
    // sketch much
    console.error("supported input formats: " + providerArray() + ",otf");
    process.exit(2);
  }

  if (!outputFileSupported(outFile)) {
    console.error("unsupported output format!");
    console.error("supported output formats: " + providerArray());
    process.exit(4);
  }

  if (fs.existsSync(outFile)) {
    console.error("output file already exists!");
    process.exit(5);
  }

  console.log(inFile);
  const buffer = fs.readFileSync(inFile);

  const fileType = inFile.split(".").slice("-1")[0];

  console.log(fileType);

  let font = Font.create(buffer, {
    type: fileType
  });

  // Call the provider
  console.log(getFormat(outFile));
  console.log(getName(outFile));
  providers[getFormat(outFile)](font, getName(outFile));
};
