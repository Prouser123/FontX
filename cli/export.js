const fontx = require("../api");

exports.command = "export <font> <directory>";
exports.desc = "export all glyphs to a folder";

exports.builder = yargs => {
  yargs.positional("font", {
    describe: "font to use",
    type: "string"
  });

  yargs.positional("directory", {
    describe: "directory to output to",
    type: "string"
  });
};

exports.handler = argv => {
  const core = fontx.Core(argv.font, argv.debug);
  fontx.Export(core, argv.directory);
};
