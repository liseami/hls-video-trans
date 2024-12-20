(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LinkInstance.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinksPlugin = void 0;
    const LinkInstance_js_1 = require("./LinkInstance.js");
    class LinksPlugin {
        constructor(engine) {
            this.id = "links";
            this._engine = engine;
        }
        getPlugin(container) {
            return Promise.resolve(new LinkInstance_js_1.LinkInstance(container, this._engine));
        }
        loadOptions() {
        }
        needsPlugin() {
            return true;
        }
    }
    exports.LinksPlugin = LinksPlugin;
});
