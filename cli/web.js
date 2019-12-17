const fontx = require("../api");

exports.command = "web <font>";
exports.desc = "start the webserver";

exports.builder = yargs => {
  yargs.positional("font", {
    describe: "font to use",
    type: "string"
  });

  yargs.positional("port", {
    describe: "port to run the server with",
    type: "number",
    default: 3000
  });
};

exports.handler = argv => {
  const core = fontx.Core(argv.font, argv.debug);
  fontx.Express(core, argv.port);
};
