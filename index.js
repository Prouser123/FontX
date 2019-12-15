const core = require("./core");
const express = require("./express");
const exp = require("./export");

// This is required
const Core = core("font.ttf");

// You may now use optional features

// Express webserver
// const Express = express(Core, 3000);

// Export all glyphs to a directory
// const Export = exp(Core, "out");
