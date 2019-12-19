const fontx = require("../api");

exports.command = "convert <input> <output>";
exports.desc = "convert a font file to another format";

exports.builder = yargs => {
  yargs.positional("input", {
    describe: "input font",
    type: "string"
  });

  yargs.positional("output", {
    describe: "output font",
    type: "string"
  });
};

exports.handler = argv => {
  fontx.Convert(argv.input, argv.output, argv.debug);
};
