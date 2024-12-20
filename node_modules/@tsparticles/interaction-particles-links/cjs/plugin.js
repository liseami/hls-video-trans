"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLinksPlugin = loadLinksPlugin;
const LinksPlugin_js_1 = require("./LinksPlugin.js");
async function loadLinksPlugin(engine, refresh = true) {
    const plugin = new LinksPlugin_js_1.LinksPlugin(engine);
    await engine.addPlugin(plugin, refresh);
}
