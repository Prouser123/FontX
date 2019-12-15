# FontX

[![npm](https://img.shields.io/npm/v/fontx)
![node](https://img.shields.io/node/v/fontx)](https://www.npmjs.com/package/fontx)

A npm package to make working with fonts easier.

## Installation

`npm i fontx --save`

You'll need Node.JS 6 or newer.

If you want to use the command-line interface you'll probably want to install it globally so that you can run `fontx` from anywhere.

`npm i -g fontx`

## CLI

```
fontx <command>

Commands:
  fontx export <font> <directory>  export all glyphs to a folder
  fontx web <font>                 start the webserver

Options:
  --help, -h     Show help                                             [boolean]
  --version, -v  Show version number                                   [boolean]
```

## API

From [example.js](example.js):

```node
const fontx = require("./api");

// Initialise the core (required)
const core = fontx.Core("font.ttf");

// Start the Express webserver
fontx.Express(core, 3000);

// Export all glyphs to a folder
fontx.Export(core, "out");
```

## Links

[Introducing Dynamic SVG (v1.2 or later)](./.md_resources/dyn_svg.png)
