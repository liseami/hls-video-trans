(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LinksPlugin.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadLinksPlugin = loadLinksPlugin;
    const LinksPlugin_js_1 = require("./LinksPlugin.js");
    async function loadLinksPlugin(engine, refresh = true) {
        const plugin = new LinksPlugin_js_1.LinksPlugin(engine);
        await engine.addPlugin(plugin, refresh);
    }
});
