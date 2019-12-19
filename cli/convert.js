const fontx = require("../api");

exports.command = "convert <font> <out>";
exports.desc = "start the webserver";

exports.builder = yargs => {
  yargs.positional("font", {
    describe: "font to use",
    type: "string"
  });

  yargs.positional("out", {
    // Dynamic output options based on provider exports
    choices: Object.keys(require("../api/convert/providers")),
    describe: "output format",
    type: "string"
  });
};

exports.handler = argv => {
  fontx.Convert(argv.font, argv.out);
};
