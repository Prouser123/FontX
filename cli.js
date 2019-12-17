#!/usr/bin/env node

require("yargs")
  // Set the app name in responses
  .scriptName("fontx")
  // Use commands from the cli_cmds folder
  .commandDir("cli")
  // Show help if command not valid
  .demandCommand()
  // Enable --help and --version
  .help()
  .version()
  // Set aliases
  .alias("help", "h")
  .alias("version", "v")
  // Set --debug option
  .option("debug", {
    default: false,
    type: "boolean",
    description: "show debug information"
  }).argv;
