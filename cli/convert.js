const fontx = require("../api");

exports.command = "convert <input> <output>";
exports.desc = "start the webserver";

exports.builder = yargs => {
  yargs.positional("input", {
    describe: "input font",
    type: "string"
  });

  yargs.positional("output", {
    // Dynamic output options based on provider exports
    //choices: Object.keys(require("../api/convert/providers")),
    describe: "output font",
    type: "string"
  });
};

exports.handler = argv => {
  fontx.Convert(argv.input, argv.output);
};
