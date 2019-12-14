const core = require("./core");
const express = require("./express");

const Core = core("font.ttf");
const Express = express(Core, 3000);
