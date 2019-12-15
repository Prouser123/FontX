const fontx = require("./api");

// Initialise the core (required)
const core = fontx.Core("font.ttf");

// Start the Express webserver (optional)
fontx.Express(core, 3000);

// Export all glyphs to a folder
fontx.Export(core, "out");
